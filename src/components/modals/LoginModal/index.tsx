import React, { FC } from 'react';
import { TModalsContext } from 'types/modals.context';

interface LoginModalProps {
    modalContext: TModalsContext;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const { modalContext } = props;
    return (
        <div>
            <span>LOGIN MODAL</span>
            <button
                type='button'
                onClick={() => modalContext.closeModal()}
            >
                *CLOSE*
            </button>
        </div>
    );
};
