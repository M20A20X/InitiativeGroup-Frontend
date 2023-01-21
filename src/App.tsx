import React from 'react';

import { AuthProvider } from 'components/providers/AuthProvider';
import { RouterProvider } from 'components/providers/RouterProvider';

const App = () => (
    <AuthProvider>
        <RouterProvider />
    </AuthProvider>
);
export default App;
