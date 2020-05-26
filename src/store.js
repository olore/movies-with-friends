const store = {
  debug: true,
  state: {
    googleToken: null,
  },
  set(newValue) {
    if (this.debug) console.log("set triggered with", newValue);
    this.state.googleToken = newValue;
  },
  clear() {
    if (this.debug) console.log("clear triggered");
    this.state.googleToken = "";
  },
};
export { store };
