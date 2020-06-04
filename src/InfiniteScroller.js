class InfiniteScroller {
  constructor(data) {
    this.pageSize = data.pageSize || 10;
    this.totalCount = data.totalCount;
    this.offset = 0;
  }

  onScrollBottom(cb) {
    window.onscroll = async () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        if (this.offset + this.pageSize < this.totalCount) {
          this.offset += this.pageSize;
          await cb(this.pageSize, this.offset);
        }
      }
    };
  }
}

export default InfiniteScroller;
