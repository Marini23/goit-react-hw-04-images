import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './api';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: ``,
    images: [],
    page: 1,
    loading: false,
    error: false,
    showBtnLoadMore: false,
    showModal: false,
    dataModal: { largeImageURL: null, tags: null },
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true, error: false });
        const images = await fetchImages(query, page);
        const totalPages = Math.ceil(images.data.totalHits / 12);
        this.setState(prevState => ({
          images: [...prevState.images, ...images.data.hits],
          showBtnLoadMore: this.state.page < totalPages,
        }));
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onOpenModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, dataModal: { largeImageURL, tags } });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { loading, error, images, showBtnLoadMore, showModal, dataModal } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {error && !loading && <div>Oops... Something went wrong... </div>}
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {showBtnLoadMore && !loading && <LoadMore onClick={this.onLoadMore} />}
        {showModal && (
          <Modal isClose={this.onCloseModal} dataModal={dataModal} />
        )}
        <GlobalStyle />
        <Toaster position="top-right" />
      </div>
    );
  }
}
