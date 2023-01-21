import { createContext } from 'react';
import { TModalsContext } from 'types/modals.context';

export const ModalContext = createContext<TModalsContext | null>(null);
