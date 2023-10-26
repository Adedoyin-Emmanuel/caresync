import React, { RefObject } from "react";

interface ModalProps {
  className?: string;
  ref: RefObject<HTMLDialogElement>;
  children: React.ReactNode;
}

const Modal = ({ className, ref, children }: ModalProps) => {
  return (
    <dialog id="profile_modal" className={`modal ${className}`} ref={ref}>
      <div className="modal-box">
        <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle shadow-none border-none outline-none bg-gray-100 hover:bg-red-400 hover:text-white duration-100 transition-colors ease-linear absolute right-2 top-2">
            ✕
          </button>
        </form>

        {children}
      </div>
    </dialog>
  );
};

export default Modal;
