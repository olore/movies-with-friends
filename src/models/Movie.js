import jaycue from "jaycue";
import kebabCase from "lodash.kebabcase";
import Like from "./Like";
import Person from "./Person";

export default class Movie {
  constructor(data) {
    Object.assign(this, data);
  }

  hasRottenTomatoesRating() {
    return this.getRottenTomatoesRating() !== undefined;
  }

  getRottenTomatoesRating() {
    return jaycue(
      this.Ratings,
      '.[] | select(.Source == "Rotten Tomatoes") | .Value'
    );
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

  static all() {
    return [
      new Movie({
        Title: "Ender's Game",
        Year: "2013",
        Rated: "PG-13",
        Released: "01 Nov 2013",
        Runtime: "114 min",
        Genre: "Action, Adventure, Family, Fantasy, Sci-Fi",
        Director: "Gavin Hood",
        Writer:
          "Gavin Hood (screenplay by), Orson Scott Card (based on the book Ender's Game by)",
        Actors:
          "Asa Butterfield, Harrison Ford, Hailee Steinfeld, Abigail Breslin",
        Plot:
          "Young Ender Wiggin is recruited by the International Military to lead the fight against the Formics, an insectoid alien race who had previously tried to invade Earth and had inflicted heavy losses on humankind.",
        Language: "English",
        Country: "USA",
        Awards: "1 win & 6 nominations.",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMjAzMzI5OTgzMl5BMl5BanBnXkFtZTgwMTU5MTAwMDE@._V1_SX300.jpg",
        Ratings: [
          {
            Source: "Internet Movie Database",
            Value: "6.6/10",
          },
          {
            Source: "Rotten Tomatoes",
            Value: "62%",
          },
          {
            Source: "Metacritic",
            Value: "51/100",
          },
        ],
        Metascore: "51",
        imdbRating: "6.6",
        imdbVotes: "217,740",
        imdbID: "tt1731141",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "N/A",
        Production: "N/A",
        Website: "N/A",
        Response: "True",
      }),
      new Movie({
        Title: "Criminal Minds",
        Year: "2005–2020",
        Rated: "TV-14",
        Released: "22 Sep 2005",
        Runtime: "42 min",
        Genre: "Crime, Drama, Mystery, Thriller",
        Director: "N/A",
        Writer: "Jeff Davis",
        Actors:
          "Matthew Gray Gubler, Kirsten Vangsness, A.J. Cook, Joe Mantegna",
        Plot:
          "The cases of the F.B.I. Behavioral Analysis Unit (B.A.U.), an elite group of profilers who analyze the nation's most dangerous serial killers and individual heinous crimes in an effort to anticipate their next moves before they strike again.",
        Language: "English",
        Country: "USA, Canada",
        Awards:
          "Nominated for 3 Primetime Emmys. Another 23 wins & 32 nominations.",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BNGE2ZmFkZTYtNjRiOS00ZjE3LThjOWMtZTViZjRmNDFjNTQwXkEyXkFqcGdeQXVyNjg4NzAyOTA@._V1_SX300.jpg",
        Ratings: [
          {
            Source: "Internet Movie Database",
            Value: "8.1/10",
          },
        ],
        Metascore: "N/A",
        imdbRating: "8.1",
        imdbVotes: "148,659",
        imdbID: "tt0452046",
        Type: "series",
        totalSeasons: "15",
        Response: "True",
      }),
      new Movie({
        Title: "Grace and Frankie",
        Year: "2015–",
        Rated: "TV-MA",
        Released: "08 May 2015",
        Runtime: "30 min",
        Genre: "Comedy",
        Director: "N/A",
        Writer: "Marta Kauffman, Howard J. Morris",
        Actors: "Lily Tomlin, Jane Fonda, Sam Waterston, Martin Sheen",
        Plot:
          "Finding out that their husbands are not just work partners, but have also been romantically involved for the last twenty years, two women with an already strained relationship try to cope with the circumstances together.",
        Language: "English",
        Country: "USA",
        Awards:
          "Nominated for 1 Golden Globe. Another 2 wins & 49 nominations.",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BZDg1YmI4ZmUtMjNhYS00YWY5LTk0MGQtODI5MGMzNTI4MzYxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
        Ratings: [
          {
            Source: "Internet Movie Database",
            Value: "8.3/10",
          },
        ],
        Metascore: "N/A",
        imdbRating: "8.3",
        imdbVotes: "35,494",
        imdbID: "tt3609352",
        Type: "series",
        totalSeasons: "7",
        Response: "True",
      }),
    ];
  }

  getKebab() {
    return kebabCase(this.Title);
  }

  static getByTitle(titleKebab) {
    return this.addLikes(
      this.all().find((movie) => {
        return kebabCase(movie.Title) === titleKebab;
      })
    );
  }

  static addLikes(movie) {
    movie.likes = [
      new Like(movie, Person.get("Brian O")),
      new Like(movie, Person.get("Joseph O")),
    ];
    return movie;
  }
}
