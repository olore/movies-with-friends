const fetch = require("node-fetch");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const api = {
  getById: async (id) => {
    const fromApi = await fetch(`${URL}&i=${id}`);
    return fromApi.json();
  },
  search: async (query) => {
    const fromApi = await fetch(`${URL}&s=${query}`);
    return fromApi.json();
  },
};
module.exports = api;
