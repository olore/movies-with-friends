const store = {
  debug: false,
  state: {
    user:
      process.env["VUE_APP_NO_GOOGLE"] === undefined
        ? undefined
        : {
            email: "brian@olore.net",
            givenName: "Cinco",
            googleId: "100000000000000000005",
            googleToken: "ABC5",
            image:
              "https://www.inliterature.net/wp-content/uploads/2013/11/mickey_silhouette.jpg",
            name: "Cinco Olore",
          },
  },
  set(key, newValue) {
    if (this.debug) console.log("set triggered with ", key, newValue);
    this.state[key] = newValue;
  },
  clear(key) {
    if (this.debug) console.log("clear triggered for ", key);
    this.state[key] = "";
  },
};
export { store };
