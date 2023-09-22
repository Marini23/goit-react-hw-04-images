import React, {  useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalImg, Overlay } from './Modal.styled';

const modalRoot = document.querySelector(`#modal-root`);

export const Modal = ({ isClose, dataModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', isCloseEscape);
  });

  const isCloseEscape = e => {
    if (e.code === `Escape`) {
      isClose();
    }
  };
  const onBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      isClose();
    }
  };
  return createPortal(
    <Overlay onClick={onBackdropeClick}>
      <ModalImg>
        <img src={dataModal.largeImageURL} alt={dataModal.alt} />
      </ModalImg>
    </Overlay>,
    modalRoot
  );
};

