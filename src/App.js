import './App.css';

import BodyContainer from "./components/BodyContainer";
import Devices from "./components/Devices";

function App() {
    return (
        <BodyContainer>
            <h1 className="text-2xl font-semibold mt-4 mb-8">Smart Heater
                <button
                    className="rounded-lg px-2 bg-green-200 ml-2"
                    onClick={() => {
                    }}
                >
                    On
                </button>
                <button
                    className="rounded-lg px-2 bg-gray-200 ml-2"
                    onClick={() => {
                    }}
                >
                    Off
                </button>
            </h1>
            <Devices/>
        </BodyContainer>
    );
}

export default App;
