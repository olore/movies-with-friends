export default class User {
  constructor(data) {
    Object.assign(this, data);
  }

  static get(name) {
    return this.all().find((user) => {
      return user.name === name;
    });
  }

  static all() {
    return [
      new User({ name: "Brian Olore" }),
      new User({ name: "Dana Olore" }),
      new User({ name: "Grace Olore" }),
      new User({ name: "Joseph Olore" }),
      new User({ name: "APrettyLong FirstAndLastName" }),
    ];
  }
}
