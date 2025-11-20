import React from 'react';

interface Props {
    subtitle: string;
    callMyAPI: () => void;
}

export const MySubTitle = React.memo(({ subtitle, callMyAPI }: Props) => {
    console.log('renderizandome subtitulo');

    return (
        <>
            <h6 className="text-xl font-thin text-white">{subtitle}</h6>
            <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={callMyAPI}
            >
                Llamar a función
            </button>
        </>
    );
});
