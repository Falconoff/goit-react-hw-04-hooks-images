import { useEffect } from 'react';

import { Overlay, ModalContainer } from './Modal.styled';

export default function Modal({ onClose, srcLI }) {
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  // add/remove EventListener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const overlayClickHandler = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={overlayClickHandler}>
      <ModalContainer>
        <img src={srcLI} alt="" />
      </ModalContainer>
    </Overlay>
  );
}
