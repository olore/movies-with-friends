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
      new Person({ name: "Brian Olore" }),
      new Person({ name: "Dana Olore" }),
      new Person({ name: "Grace Olore" }),
      new Person({ name: "Joseph Olore" }),
      new Person({ name: "APrettyLong FirstAndLastName" }),
    ];
  }
}
