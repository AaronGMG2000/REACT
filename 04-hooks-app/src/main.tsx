import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import { PokemonPage } from './03-examples/PokemonPage';
import { FocusScreen } from './04-useRef/FocusScreen';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FocusScreen />
    </StrictMode>
);
