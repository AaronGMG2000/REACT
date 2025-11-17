import { useEffect, useState } from 'react';

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
};

type TrafficLightColor = keyof typeof colors;

export const TrafficLightWithEffect = () => {
    const [light, setLight] = useState<TrafficLightColor>('red');
    const [countdown, setCountdown] = useState(5);

    const handleColorChange = (color: TrafficLightColor) => {
        setLight(color);
    };

    useEffect(() => {
        if (countdown === 0) return;

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [countdown]);

    if (countdown === 0) {
        setCountdown(5);
        if (light === 'red') {
            setLight('green');
        } else if (light === 'green') {
            setLight('yellow');
        } else if (light === 'yellow') {
            setLight('red');
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
            <div className="flex flex-col items-center space-y-8">
                <h1 className="text-white text-3xl font-thin">
                    Semáforo con useEffect
                </h1>
                <h2 className="text-white text-xl">{countdown}</h2>
                <div className="w-64 bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(countdown / 5) * 100}%` }}
                    ></div>
                </div>
                <div
                    className={`w-32 h-32 ${
                        light === 'red' ? colors.red : 'bg-gray-500'
                    } rounded-full`}
                ></div>
                <div
                    className={`w-32 h-32 ${
                        light === 'yellow' ? colors.yellow : 'bg-gray-500'
                    } rounded-full`}
                ></div>
                <div
                    className={`w-32 h-32 ${
                        light === 'green' ? colors.green : 'bg-gray-500'
                    } rounded-full`}
                ></div>

                <div className="flex gap-2">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={() => handleColorChange('red')}
                    >
                        Rojo
                    </button>
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={() => handleColorChange('yellow')}
                    >
                        Amarillo
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={() => handleColorChange('green')}
                    >
                        Verde
                    </button>
                </div>
            </div>
        </div>
    );
};
