import { useTraffictLight } from '../hooks/useTraffictLight';

export const TrafficLightWithHook = () => {
    const {
        countdown,
        handleColorChange,
        percentage,
        greenLight,
        yellowLight,
        redLight,
    } = useTraffictLight();

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
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div className={`w-32 h-32 ${redLight} rounded-full`}></div>
                <div className={`w-32 h-32 ${yellowLight} rounded-full`}></div>
                <div className={`w-32 h-32 ${greenLight} rounded-full`}></div>

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
