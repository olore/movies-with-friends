import jaycue from "jaycue";
import Like from "./Like";
import { store } from "../store";

export default class Circle {
  constructor(data) {
    Object.assign(this, data);
  }

  static getHeaders() {
    return {
      googleToken: store.state.user.googleToken,
    };
  }

  static getHost() {
    return `${document.location.protocol}//${document.location.hostname}`;
  }

  static async remove(id) {
    let results = await fetch(`${this.getHost()}:3000/circles/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return await results.json();
  }

  static async all() {
    let results = await fetch(`${this.getHost()}:3000/circles`, {
      headers: this.getHeaders(),
    });
    return await results.json();
  }

  static async save(data) {
    let results = await fetch(`${this.getHost()}:3000/circles/${data._id}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: data.name,
        invitees: data.invitees,
      }),
    });
    return results.json();
  }
}
