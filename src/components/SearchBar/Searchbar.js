import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Header,
  SearchForm,
  BtnSubmit,
  BtnLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState(``);

  const handleChangeValue = e => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      toast('Please enter key words for search');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Header className="searchbar">
      <SearchForm onSubmit={handleSubmit}>
        <BtnSubmit type="submit">
          <BtnLabel>Search</BtnLabel>
        </BtnSubmit>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChangeValue}
        />
      </SearchForm>
    </Header>
  );
};
