interface ScrambleState {
    currentWord: string;
    errorCounter: number;
    guess: string;
    isGameOver: boolean;
    maxAllowErrors: number;
    maxSkips: number;
    points: number;
    scrambledWord: string;
    skipCounter: number;
    words: string[];
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
    const shuffledWords = shuffleArray([...GAME_WORDS]);
    return {
        currentWord: shuffledWords[0],
        errorCounter: 0,
        guess: '',
        isGameOver: false,
        maxAllowErrors: 3,
        maxSkips: 3,
        points: 0,
        scrambledWord: scrambleWord(shuffledWords[0]),
        skipCounter: 0,
        words: shuffledWords,
        totalWords: shuffledWords.length,
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
