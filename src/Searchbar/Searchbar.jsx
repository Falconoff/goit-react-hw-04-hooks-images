import { useState } from 'react';

import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onFormSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const onChange = evt => {
    setInputValue(evt.target.value.toLowerCase());
  };

  const onSubmit = evt => {
    evt.preventDefault();
    // for empty query
    if (inputValue.trim() === '') {
      toast.warn('Please, enter your query');
      return;
    }
    // submit form
    onFormSubmit(inputValue);
    // reset Form
    setInputValue('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormBtn type="submit">
          <BsSearch style={{ width: 24, height: 24, fill: 'blue' }} />
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          name="inputValue"
          value={inputValue}
          onChange={onChange}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
}
