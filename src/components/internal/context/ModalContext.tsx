import { createContext } from 'react';

type ModalContextType = {
  modalOpen: boolean;
  setModalOpen(value: boolean): void;
};

export default createContext<ModalContextType>(null);

export { ModalContextType };
