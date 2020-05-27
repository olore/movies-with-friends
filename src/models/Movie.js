import jaycue from "jaycue";
import Like from "./Like";
import User from "./User";
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
    return this.addLikes(movie);
  }

  static async getRecentlyViewed() {
    let results = await fetch(`${this.getHost()}:3000/movie/recent`, {
      headers: this.getHeaders(),
    });
    let data = await results.json();
    return data.map((movieData) => {
      let movie = new Movie(movieData);
      this.addLikes(movie);
      return movie;
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

  static addLikes(movie) {
    movie.likes = [
      new Like(movie, User.get("APrettyLong FirstAndLastName"), {
        rating: 5,
        comment: "I'd see it again. Wish I cuold have seen it in a theater.",
      }),
      new Like(movie, User.get("Brian Olore"), {
        rating: 4,
        comment:
          "Pretty funny. I think you'll want to watch it without the kids, there are some sketchy scenes",
      }),
      new Like(movie, User.get("Joseph Olore"), {
        rating: 2,
        comment: "just ok, not my fave",
      }),
      new Like(movie, User.get("Dana Olore"), {
        rating: 1,
        comment: "Too scary",
      }),
      new Like(movie, User.get("Grace Olore"), {
        rating: 5,
      }),
    ];
    return movie;
  }
}
