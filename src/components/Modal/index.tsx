import { ReactNode, useEffect, useState } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function Modal(props: ModalProps) {
  const { children, isOpen, onRequestClose } = props;
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={modalStatus}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <i className="fas fa-times"></i>
      </button>
      {children}
    </ReactModal>
  );
}
