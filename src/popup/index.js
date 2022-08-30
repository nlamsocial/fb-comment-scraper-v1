import React from 'react';
import { createRoot } from 'react-dom/client';

import { StoreProvider } from '../store';
import App from './App';

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

const root = createRoot(appContainer);
root.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
);
