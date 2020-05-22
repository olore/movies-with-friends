export default class Like {
  constructor(movie, person, other) {
    Object.assign(this, { movie, person, ...other });
  }
  // maybe add a rating?
}
