export default class Like {
  constructor(movie, person, other) {
    Object.assign(this, { movie, person, ...other });
  }

  smallDate() {
    if (this.date) {
      return "Nov 20, 2008";
    } else {
      return "Mar 18, 2020";
    }
  }
}
