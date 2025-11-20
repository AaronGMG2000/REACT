import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import './index.css';
// import { ScrambleWords } from './05-useReducer/ScrambleWords';
// import { MemoHook } from './06-memos/MemoHook';
// import { MemoCounter } from './06-memos/MemoCounter';
// import { InstagromApp } from './07-useOptimistic/InstagromApp';
import { ClientInformation } from './08-use-suspense/ClientInformation';
import { getUser } from './08-use-suspense/api/get-user.action';
// import { PokemonPage } from './03-examples/PokemonPage';
// import { FocusScreen } from './04-useRef/FocusScreen';
// import { TasksApp } from './05-useReducer/TasksApp';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Toaster />
        <Suspense
            fallback={
                <div className="bg-gradient flex flex-col gap-4">
                    <h2 className="text-4xl font-thin">Client Information</h2>
                    <p className="text-2xl">Loading...</p>
                </div>
            }
        >
            <ClientInformation getUser={getUser(100)} />
        </Suspense>
    </StrictMode>
);
