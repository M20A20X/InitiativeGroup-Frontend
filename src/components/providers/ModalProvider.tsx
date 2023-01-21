import React, { FC, ReactNode, useMemo, useState } from 'react';

import { ModalContext } from 'context/Modal.context';
import { TCloseModal, TModalsContext, TOpenModal } from 'types/modals.context';

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = (props) => {
    const { children } = props;
    const [modalNode, setModalNode] = useState<ReactNode>(null);

    const openModal: TOpenModal = (component) => {
        setModalNode(component);
    };

    const closeModal: TCloseModal = () => {
        setModalNode(null);
    };

    return (
        <ModalContext.Provider value={useMemo<TModalsContext>(() => ({ openModal, closeModal }), [])}>
            {modalNode}
            {children}
        </ModalContext.Provider>
    );
};
