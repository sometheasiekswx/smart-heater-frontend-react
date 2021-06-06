import axios from 'axios';

const sensorsApi = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/v1/`,
});

const heaterApi  = axios.create({
    baseURL: `https://maker.ifttt.com/trigger/`,
});

export const turnOffHeater = async () => {
    try {
        await heaterApi.get(`temperature_high/with/key/${process.env.REACT_APP_IFTTT_WEBHOOK_KEY}`);
    } catch (error) {
        console.log(error.message);
    }
}

export const turnOnHeater = async () => {
    try {
        await heaterApi.get(`temperature_low/with/key/${process.env.REACT_APP_IFTTT_WEBHOOK_KEY}`);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTemperature = async () => {
    try {
        const data = (await sensorsApi.get('temperature')).data;
        return parseFloat(data);
    } catch (error) {
        console.log(sensorsApi)
        console.log(error.message);
    }
}

export const getMotion = async () => {
    try {
        const data = (await sensorsApi.get('motion')).data;
        return data === 'true';
    } catch (error) {
        console.log(error.message);
    }
}
