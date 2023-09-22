import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalImg, Overlay } from './Modal.styled';

const modalRoot = document.querySelector(`#modal-root`);

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.isCloseEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.isCloseEscape);
  }
  isCloseEscape = e => {
    if (e.code === `Escape`) {
      this.props.isClose();
    }
  };
  onBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      this.props.isClose();
    }
  };

  render() {
    const { dataModal } = this.props;
    return createPortal(
      <Overlay onClick={this.onBackdropeClick}>
        <ModalImg>
          <img src={dataModal.largeImageURL} alt={dataModal.alt} />
        </ModalImg>
      </Overlay>,
      modalRoot
    );
  }
}
