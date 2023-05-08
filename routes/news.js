// endpoints for news stuff will go here

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://api.newscatcherapi.com/v2/search',
  params: {q: 'Bitcoin', lang: 'en', topic: 'tech', sort_by: 'relevancy', page: '1'},
  headers: {
    'x-api-key': '7PM1muSncLVX_lypeasOh0Nnf3aZD-dCq6mYkwOkW0M'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});