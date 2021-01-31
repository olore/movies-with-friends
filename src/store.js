const store = {
  debug: false,
  state: {
    user:
      process.env["VUE_APP_NO_GOOGLE"] === undefined
        ? null
        : {
            email: "brian@olore.net",
            givenName: "Brian",
            googleId: "115421541579403932091",
            googleToken: "",
            image:
              "https://lh3.googleusercontent.com/a-/AOh14Ggo6byH6db24lzXv5lb3ZRPkJi2mSFv7gW6_8WK=s96-c",
            name: "Brian Olore",
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
