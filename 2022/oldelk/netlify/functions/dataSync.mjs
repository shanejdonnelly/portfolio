import fetch from 'node-fetch';
const { schedule } = require('@netlify/functions')
const API_ENDPOINT = 'https://oldelk.glitch.me/sync';

const handler = async (event, context) => {
    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify({ data }) };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data' }),
        };
    }
};

exports.handler = schedule("@daily", handler);