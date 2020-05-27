import jaycue from "jaycue";
import Like from "./Like";
import { store } from "../store";

export default class Movie {
  constructor(data) {
    Object.assign(this, data);
  }

  hasRottenTomatoesRating() {
    return this.getRottenTomatoesRating() !== undefined;
  }

  getRottenTomatoesRating() {
    try {
      return jaycue(
        this.Ratings,
        '.[] | select(.Source == "Rotten Tomatoes") | .Value'
      );
    } catch (err) {
      console.log("error parsing ratings for ", this.Title);
      return -1;
    }
  }

  getReelGoodLink() {
    let year = this.Year;
    if (year.includes("–")) {
      year = year.split("–")[0];
    }

    let type = this.Type;
    if (type === "series") {
      type = "show";
    }

    let title = this.Title.replace(/ /g, "-").replace("'", "");
    return `https://reelgood.com/${type}/${title}-${year}`.toLowerCase();
  }

  static getHost() {
    return `${document.location.protocol}//${document.location.hostname}`;
  }

  static getHeaders() {
    return {
      googleToken: store.state.user.googleToken,
    };
  }

  static async search(val) {
    let results = await fetch(`${this.getHost()}:3000/movie/search/${val}`, {
      headers: this.getHeaders(),
    });
    return await results.json();
  }

  static async getById(id) {
    let results = await fetch(`${this.getHost()}:3000/movie/show/${id}`, {
      headers: this.getHeaders(),
    });
    let data = await results.json();
    let movie = new Movie(data);

    movie.likes = movie.likes.map((like) => {
      return new Like(like);
    });
    return movie;
  }

  static async getRecentlyViewed() {
    let results = await fetch(`${this.getHost()}:3000/movie/recent`, {
      headers: this.getHeaders(),
    });
    let data = await results.json();
    return data.map((movieData) => {
      return new Movie(movieData);
    });
  }

  static async like(data) {
    let results = await fetch(
      `${this.getHost()}:3000/movie/like/${data.imdbID}`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          rating: data.rating,
          comment: data.comment,
        }),
      }
    );
    return results.json();
  }
}
