class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObject = { ...this.queryStr };
    const excludedFields = ["page", "limit", "sort", "filter", "search"];
    excludedFields.forEach((field) => delete queryObject[field]);
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // To show the newset rooms
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search() {
    if (this.queryStr.search) {
      this.query = this.query.find({
        name: { $regex: new RegExp(this.queryStr.search), $options: "i" },
      });
    }
    return this;
  }
  searchByNumber() {
    if (this.queryStr.number) {
      this.query = this.query.find({
        number: { $regex: new RegExp(this.queryStr.number), $options: "i" },
      });
    }
    return this;
  }

  searchByRating() {
    if (this.queryStr.section) {
      this.query = this.query.find({
        section: { $eq: this.queryStr.section },
      });
    }
    return this;
  }
}

module.exports = APIFeatures;
