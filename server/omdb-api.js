const fetch = require("node-fetch");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const api = {
  getById: async (id) => {
    return (await fetch(`${URL}&i=${id}`)).json();
  },
  search: async (query) => {
    return (await fetch(`${URL}&s=${query}`)).json();
  },
};
module.exports = api;
