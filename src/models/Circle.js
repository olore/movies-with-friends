import Like from "./Like";
import { store } from "../store";

export default class Circle {
  constructor(data) {
    Object.assign(this, data);
  }

  static getHeaders() {
    return {
      googleToken: store?.state?.user?.googleToken,
    };
  }

  static getHost() {
    return `${document.location.protocol}//${document.location.hostname}`;
  }

  static async getById(id) {
    let results = await fetch(`${this.getHost()}:3000/circles/show/${id}`, {
      headers: this.getHeaders(),
    });
    return await results.json();
  }

  static async removeMe(id) {
    let results = await fetch(`${this.getHost()}:3000/circles/${id}/me`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return await results.json();
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

  static async create(name) {
    let results = await fetch(`${this.getHost()}:3000/circles`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
      }),
    });
    return results.json();
  }

  static async save(data) {
    let results = await fetch(`${this.getHost()}:3000/circles/${data._id}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: data.name,
        members: data.members,
      }),
    });
    return results.json();
  }

  static async join(id) {
    let results = await fetch(`${this.getHost()}:3000/circles/${id}/join`, {
      method: "POST",
      headers: this.getHeaders(),
    });
    return results.json();
  }
}
