import React from 'react';

import { ImageCalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ImageGalleryList>
      {images.map(({ webformatURL, id, tags, largeImageURL }) => (
        <ImageCalleryItem
          onClick={() => onOpenModal(largeImageURL, tags)}
          key={id}
          onOpenModal={onOpenModal}
          largeImageURL={largeImageURL}
          img={webformatURL}
          alt={tags}
        />
      ))}
    </ImageGalleryList>
  );
};
