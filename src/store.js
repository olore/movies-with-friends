const store = {
  debug: false,
  state: {
    user: null,
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
