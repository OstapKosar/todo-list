import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import { selectModal } from '@/store/slices/modal/selectors';
import type { ModalProps } from './types';

const Modal = ({ children, modalName }: ModalProps) => {
  const { isOpened, modalName: currentModalName } = useSelector(selectModal);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
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
