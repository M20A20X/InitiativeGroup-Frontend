import { ReactNode } from 'react';

export type TOpenModal = (component: ReactNode) => void;
export type TCloseModal = () => void;

export type TModalsContext = {
    openModal: TOpenModal;
    closeModal: TCloseModal;
};
