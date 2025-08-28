
import React from 'react';
import './Modal.css';
import Button from '../Button';
import { useModalAnimations } from '../../../hooks/useGSAPAnimations';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Crear tarea'
}) => {
  const { modalRef, overlayRef } = useModalAnimations(isOpen);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="modal-overlay" onClick={onClose}>
      <div ref={modalRef} className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-actions">
          <Button variant="primary" onClick={onSubmit}>
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
