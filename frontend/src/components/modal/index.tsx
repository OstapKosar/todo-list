import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { selectModal } from '@/store/slices/modal/selectors';

type ModalProps = {
  children: React.ReactNode;
  modalName: string;
};

const Modal: React.FC<ModalProps> = ({ children, modalName }) => {
  const { isOpened, modalName: currentModalName } = useSelector(selectModal);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpened]);

  if (!isOpened || (modalName && modalName !== currentModalName)) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="relative w-full h-full flex items-center justify-center p-4">{children}</div>
    </div>,
    document.querySelector('#modal-root')!,
  );
};

export default Modal;
