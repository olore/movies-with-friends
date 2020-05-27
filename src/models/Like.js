export default class Like {
  constructor(movie, user, other) {
    Object.assign(this, { movie, user, ...other });
  }

  smallDate() {
    if (this.date) {
      return "Nov 20, 2008";
    } else {
      return "Mar 18, 2020";
    }
  }
}
