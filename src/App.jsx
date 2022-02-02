import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import Gallery from './ImageGallery';
import Message from './Message';
import imagesAPI from './service/apiService';
import ShowLoader from './Loader';
import ShowMoreBtn from './Button';
import Modal from './Modal';

import './App.css';

function App() {
  // states
  const [searchQuery, setSearchQuery] = useState('');
  const [imgArr, setImgArr] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImgSrc, setLargeImgSrc] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const perPage = 12;

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');
    fetchImages(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const formSubmitHandler = searchQuery => {
    setImgArr([]);
    setCurrentPage(1);
    setSearchQuery(searchQuery);
  };

  const loadMoreHandler = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const fetchImages = (query, page) => {
    // This setTimeout is for to see the Loader:
    // setTimeout(() => {
    imagesAPI
      .fetchImgs(query, page, perPage)
      .then(response => {
        setImgArr(prevState => [...prevState, ...response.hits]);
        setStatus('resolved');
        setTotalPages(Math.ceil(response.total / perPage));
      })

      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    // }, 2000);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleImageClick = imgSrs => {
    setLargeImgSrc(imgSrs);
    toggleModal();
  };

  // -----------------------------------------------------------------
  // 	Паттерн "state machine" - машина состояний. 4 состояния (status):
  //  'idle' - простой, бездействие
  //  'pending' - ожидается выполнение
  //  'resolved' - выполнилось с результатом
  //  'rejected' - отклонено

  const imgArrLength = imgArr.length;

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Searchbar onFormSubmit={formSubmitHandler} />

      {status === 'idle' && (
        <Message text={'Please, enter what you want to see'} />
      )}

      {imgArrLength > 0 && (
        <Gallery imgArr={imgArr} onImgClick={handleImageClick} />
      )}

      {status === 'resolved' &&
        imgArrLength > 0 &&
        totalPages !== currentPage && (
          <ShowMoreBtn onClickHandler={loadMoreHandler} />
        )}

      {status === 'pending' && <ShowLoader />}

      {status === 'resolved' && imgArrLength === 0 && (
        <Message text={`No matches found for "${searchQuery}"`} />
      )}

      {status === 'rejected' && <Message text={error.message} />}

      {showModal && <Modal onClose={toggleModal} srcLI={largeImgSrc} />}
    </>
  );
}

export default App;
