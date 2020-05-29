import { store } from "../store";

export default class User {
  constructor(data) {
    Object.assign(this, data);
  }

  async populate() {
    let results = await fetch(`${this.getHost()}:3000/users/self`, {
      headers: {
        googleToken: this.googleToken,
      },
    });
    let user = await results.json();
    this.googleId = user.googleId;
    return this;
  }

  getHost() {
    return `${document.location.protocol}//${document.location.hostname}`;
  }
}
