// endpoints for news stuff will go here

const express = require("express");
const router = express.Router();

var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://api.newscatcherapi.com/v2/latest_headlines",
  params: {
    lang: "en",
    countries: "US",
    topic: "tech",
    when: "14d",
    page_size: "100",
  },
  headers: {
    "x-api-key": "7PM1muSncLVX_lypeasOh0Nnf3aZD-dCq6mYkwOkW0M",
  },
};

router.get("/news", async (req, res, next) => {
  await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const articles = response.data;
      res.status(200).json({ articles });
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router