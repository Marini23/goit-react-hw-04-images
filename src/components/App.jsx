import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './api';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState(``);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    largeImageURL: null,
    tags: null,
  });

  useEffect(() => {
    if (query === ``) {
      return;
    }
    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const images = await fetchImages(query, page);
        const totalPages = Math.ceil(images.data.totalHits / 12);
        setImages(prevState => [...prevState, ...images.data.hits]);
        setShowBtnLoadMore(page < totalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = (largeImageURL, tags) => {
    setShowModal(true);
    setDataModal({ largeImageURL, tags });
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {error && !loading && <div>Oops... Something went wrong... </div>}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}
      {showBtnLoadMore && !loading && <LoadMore onClick={onLoadMore} />}
      {showModal && <Modal isClose={onCloseModal} dataModal={dataModal} />}
      <GlobalStyle />
      <Toaster position="top-right" />
    </div>
  );
};
