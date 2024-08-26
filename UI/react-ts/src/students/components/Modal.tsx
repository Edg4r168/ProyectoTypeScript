import { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <article className="modal">
      <div className="modal-content">
        <button className="closeModal" onClick={onClose}>
          🅧
        </button>
        {children}
      </div>
    </article>
  );
};
