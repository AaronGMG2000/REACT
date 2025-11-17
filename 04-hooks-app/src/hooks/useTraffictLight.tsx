import { useEffect, useState } from 'react';

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
};

type TrafficLightColor = keyof typeof colors;

export const useTraffictLight = () => {
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

    return {
        light,
        countdown,
        handleColorChange,
        colors,

        percentage: (countdown / 5) * 100,
        redLight: light === 'red' ? colors.red : 'bg-gray-500',
        greenLight: light === 'green' ? colors.green : 'bg-gray-500',
        yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
    };
};
