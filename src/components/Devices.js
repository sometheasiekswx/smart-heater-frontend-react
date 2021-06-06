import {useEffect, useState} from "react";
import {getMotion, getTemperature, turnOffHeater, turnOnHeater} from "../utils/api";
import {CronJob} from "cron";

function Devices() {
    const [currentTemperature, setCurrentTemperature] = useState(0);
    const [targetTemperature, setTargetTemperature] = useState(25);
    const [targetTemperatureMargin] = useState(2);
    const [heaterOn, setHeaterOn] = useState(false);
    const handleTemperature = async () => {
        const temperature = await getTemperature();
        setCurrentTemperature(temperature);
        console.log(currentTemperature, targetTemperature);
        if (currentTemperature >= targetTemperature + targetTemperatureMargin && heaterOn) {
            await turnOffHeater();
            setHeaterOn(false);
        } else if (currentTemperature <= targetTemperature - targetTemperatureMargin && !heaterOn) {
            await turnOnHeater();
            setHeaterOn(true);
        }
    }
    const [jobTemperature] = useState(new CronJob("* * * * * *", handleTemperature()));

    const [motion, setMotion] = useState(true);
    const [noMotion, setNoMotion] = useState(0);
    const handleMotion = async () => {
        const newMotion = await getMotion();
        if (newMotion === false) {
            setNoMotion(noMotion + 1)
        } else {
            setNoMotion(0)
            setMotion(true);
        }

        if (noMotion > 50) {
            setMotion(false);
        }
    }
    const [jobMotion] = useState(new CronJob("* * * * * *", handleMotion()));

    useEffect(() => {
        jobTemperature.start();
        jobMotion.start();
    }, []);

    process.on('SIGINT', function () {
        console.log("Caught interrupt signal");
        jobTemperature.stop();
        jobMotion.stop();
        process.exit();
    });

    return (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center p-4 bg-blue-100 rounded-lg shadow-xs">
                <div className="p-3 mr-4 bg-blue-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                    </svg>
                </div>
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                        Temperature Sensor
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Current: {currentTemperature}°C
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Target: <button
                        className="rounded-lg px-2 bg-blue-200"
                        onClick={() => setTargetTemperature(targetTemperature - 1)}>-</button> {targetTemperature}°C <button
                        className="rounded-lg px-2 bg-blue-200"
                        onClick={() => setTargetTemperature(targetTemperature + 1)}>+</button>
                    </p>
                </div>
            </div>
            <div className="flex items-center p-4 bg-yellow-100 rounded-lg shadow-xs">
                <div className="p-3 mr-4 bg-yellow-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                    </svg>
                </div>
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                        Motion Sensor
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Detected: {(motion === true ? "True" : "False")} ({noMotion})
                    </p>
                </div>
            </div>
            <div className="flex items-center p-4 bg-pink-100 rounded-lg shadow-xs">
                <div className="p-3 mr-4 bg-pink-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
                    </svg>
                </div>
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                        Heater
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Status: {(heaterOn === true ? "On" : "Off")}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        Manual Control: <button
                        className="rounded-lg px-2 bg-gray-200 pointer-events-none"
                        onClick={() => {
                        }}>On</button>
                        <button
                            className="rounded-lg px-2 bg-gray-200 pointer-events-none"
                            onClick={() => {
                            }}>Off
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Devices;