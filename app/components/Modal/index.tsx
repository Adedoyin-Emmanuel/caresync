import React, { forwardRef, useImperativeHandle, useState } from "react";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
}

export interface ModalRef {
  showModal: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(
  ({ className, children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
      setIsOpen(true);
    };

    useImperativeHandle(ref, () => ({
      showModal,
    }));

    const closeModal = () => {
      setIsOpen(false);
    };

    return (
      <dialog id="profile_modal" className={`modal ${className}`} open={isOpen}>
        <div className="modal-box">
          <form method="dialog" className="modal-backdrop">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle shadow-none border-none outline-none bg-gray-100 hover:bg-red-400 hover:text-white duration-100 transition-colors ease-linear absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          {children}
        </div>
      </dialog>
    );
  }
);

export default Modal;
