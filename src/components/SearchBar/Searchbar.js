import { Component } from 'react';
import toast from 'react-hot-toast';
import {
  Header,
  SearchForm,
  BtnSubmit,
  BtnLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: ``,
  };

  handleChangeValue = e => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue.trim() === '') {
      toast('Please enter key words for search');
      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <Header className="searchbar">
        <SearchForm onSubmit={this.handleSubmit}>
          <BtnSubmit type="submit">
            <BtnLabel>Search</BtnLabel>
          </BtnSubmit>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChangeValue}
          />
        </SearchForm>
      </Header>
    );
  }
}
