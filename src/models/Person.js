export default class Person {
  constructor(data) {
    Object.assign(this, data);
  }

  static get(name) {
    return this.all().find((person) => {
      return person.name === name;
    });
  }

  static all() {
    return [
      new Person({ name: "Brian O" }),
      new Person({ name: "Dana O" }),
      new Person({ name: "Grace O" }),
      new Person({ name: "Joseph O" }),
    ];
  }
}
