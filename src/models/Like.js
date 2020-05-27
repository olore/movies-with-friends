import { format } from "date-fns";

export default class Like {
  constructor(movie) {
    Object.assign(this, movie);
  }

  smallDate() {
    if (this.updatedAt) {
      return format(new Date(this.updatedAt), "MMM d, yyyy"); //"Nov 20, 2008";
    } else {
      return "UNKNOWN";
    }
  }
}
