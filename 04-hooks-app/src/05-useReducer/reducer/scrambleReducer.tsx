interface ScrambleState {
    words: string[];
    currentWord: string;
    scrambledWord: string;
    guess: string;
    points: number;
    errorCounter: number;
    maxAllowErrors: number;
    skipCounter: number;
    maxSkips: number;
    isGameOver: boolean;
    totalWords: number;
}

const GAME_WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'HTML',
    'ANGULAR',
    'SOLID',
    'NODE',
    'VUEJS',
    'SVELTE',
    'EXPRESS',
    'MONGODB',
    'POSTGRES',
    'DOCKER',
    'KUBERNETES',
    'WEBPACK',
    'VITE',
    'TAILWIND',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
    return word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};

export type ScrambleAction =
    | { type: 'SET_GUESS'; payload: string }
    | { type: 'SUBMIT_GUESS' }
    | { type: 'SKIP_WORD' }
    | { type: 'PLAY_AGAIN'; payload: ScrambleState };

export const getScrambleInitialState = (): ScrambleState => {
    const shuffledWords = shuffleArray(GAME_WORDS);
    return {
        words: shuffledWords,
        currentWord: shuffledWords[0],
        scrambledWord: scrambleWord(shuffledWords[0]),
        guess: '',
        points: 0,
        errorCounter: 0,
        maxAllowErrors: 3,
        skipCounter: 0,
        maxSkips: 3,
        isGameOver: false,
        totalWords: GAME_WORDS.length,
    };
};

export const scrambleReducer = (
    state: ScrambleState,
    action: ScrambleAction
): ScrambleState => {
    switch (action.type) {
        case 'SET_GUESS':
            return { ...state, guess: action.payload };
        case 'SUBMIT_GUESS': {
            if (state.guess.trim() === '') return state;
            if (state.guess.toUpperCase() === state.currentWord.toUpperCase()) {
                const remainingWords = state.words.slice(1);
                return {
                    ...state,
                    points: state.points + 1,
                    words: remainingWords,
                    currentWord: remainingWords[0],
                    scrambledWord: scrambleWord(remainingWords[0]),
                    guess: '',
                };
            }
            const newCounter = state.errorCounter + 1;
            return {
                ...state,
                errorCounter: newCounter,
                guess: '',
                isGameOver: newCounter >= state.maxAllowErrors,
            };
        }
        case 'SKIP_WORD': {
            if (state.skipCounter >= state.maxSkips) return state;
            const remainingWords = state.words.slice(1);
            return {
                ...state,
                skipCounter: state.skipCounter + 1,
                words: remainingWords,
                currentWord: remainingWords[0],
                scrambledWord: scrambleWord(remainingWords[0]),
            };
        }
        case 'PLAY_AGAIN': {
            return { ...action.payload };
        }
        default:
            return state;
    }
};
