// endpoints for news stuff will go here

const express = require("express")
const router = express.Router()

const request = require('request');
const options = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/sources',
    qs: {topic: 'tech', lang: 'en', country: 'USA'},
    headers: {
        'x-rapidapi-key': '7PM1muSncLVX_lypeasOh0Nnf3aZD-dCq6mYkwOkW0M',
        'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
        useQueryString: true
    }
};
request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});