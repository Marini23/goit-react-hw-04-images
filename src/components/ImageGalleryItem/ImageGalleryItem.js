import React from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageCalleryItem = ({ img, alt, largeImageURL, onOpenModal }) => {
  return (
    <GalleryItem onClick={() => onOpenModal(largeImageURL, alt)}>
      <GalleryImage src={img} href={largeImageURL} alt={alt} />
    </GalleryItem>
  );
};
