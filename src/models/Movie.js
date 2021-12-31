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
      return "??%";
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
      googleToken: store?.state?.user?.googleToken,
    };
  }

  static async search(val) {
    let results = await fetch(`${this.getHost()}:3000/movies/search/${val}`, {
      headers: this.getHeaders(),
    });
    return await results.json();
  }

  static async getById(id) {
    let results = await fetch(`${this.getHost()}:3000/movies/show/${id}`, {
      headers: this.getHeaders(),
    });
    let data = await results.json();
    let movie = new Movie(data);

    movie.likes = movie.likes.map((like) => {
      return new Like(like);
    });
    return movie;
  }

  static async getForCircle(
    limit = 8,
    offset = 0,
    sortBy = "date",
    circleId,
    filter
  ) {
    let results = await fetch(
      `${this.getHost()}:3000/movies/forCircle?limit=${limit}&offset=${offset}&sort=${sortBy}&circleId=${circleId}&filter=${filter}`,
      {
        headers: this.getHeaders(),
      }
    );
    let data = await results.json();
    let movies = data.movies.map((movieData) => {
      return new Movie(movieData);
    });

    return {
      totalCount: data.totalCount,
      movies,
    };
  }

  static async getRecentlyViewed(limit = 8, offset = 0, sortBy = "date") {
    let results = await fetch(
      `${this.getHost()}:3000/movies/recentlySearched?limit=${limit}&offset=${offset}&sort=${sortBy}`,
      {
        headers: this.getHeaders(),
      }
    );
    let data = await results.json();
    let movies = data.movies.map((movieData) => {
      return new Movie(movieData);
    });

    return {
      totalCount: data.totalCount,
      movies,
    };
  }

  static async getMyRated(limit = 8, offset = 0, sortBy = "date") {
    let results = await fetch(
      `${this.getHost()}:3000/movies/myRated?limit=${limit}&offset=${offset}&sort=${sortBy}`,
      {
        headers: this.getHeaders(),
      }
    );
    let data = await results.json();
    let movies = data.movies.map((movieData) => {
      return new Movie(movieData);
    });

    return {
      totalCount: data.totalCount,
      movies,
    };
  }

  static async getRecentlyRated(
    limit = 8,
    offset = 0,
    sortBy = "date",
    filter
  ) {
    let results = await fetch(
      `${this.getHost()}:3000/movies/recentlyRated?limit=${limit}&offset=${offset}&sort=${sortBy}&filter=${filter}`,
      {
        headers: this.getHeaders(),
      }
    );
    let data = await results.json();
    if (data && data.movies) {
      let movies = data.movies.map((movieData) => {
        return new Movie(movieData);
      });

      return {
        totalCount: data.totalCount,
        movies,
      };
    } else {
      return {
        totalCount: 0,
        movies: [],
      };
    }
  }

  static async like(data) {
    let results = await fetch(
      `${this.getHost()}:3000/movies/${data.imdbID}/like`,
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
