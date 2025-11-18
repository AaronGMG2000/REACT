import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ScrambleWords } from './05-useReducer/ScrambleWords';
// import { PokemonPage } from './03-examples/PokemonPage';
// import { FocusScreen } from './04-useRef/FocusScreen';
// import { TasksApp } from './05-useReducer/TasksApp';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ScrambleWords />
    </StrictMode>
);
