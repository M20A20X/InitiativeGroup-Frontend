import React from 'react';

import { AuthProvider } from 'components/providers/AuthProvider';
import { ModalProvider } from 'components/providers/ModalProvider';
import { RouterProvider } from 'components/providers/RouterProvider';

const App = () => (
    <AuthProvider>
        <ModalProvider>
            <RouterProvider />
        </ModalProvider>
    </AuthProvider>
);
export default App;
