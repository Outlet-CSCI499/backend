// endpoints for news stuff will go here

const express = require("express")
const router = express.Router()

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://api.newscatcherapi.com/v2/search',
  params: {lang: 'en', topic: 'tech', sort_by: 'date', page: '1'},
  headers: {
    'x-api-key': '7PM1muSncLVX_lypeasOh0Nnf3aZD-dCq6mYkwOkW0M'
  }
};


router.get("/news", async (req, res, next) => {
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    const articles = response.data;
    res.status(200).json({ articles });
  }).catch(function (error) {
    console.error(error);
  });
})