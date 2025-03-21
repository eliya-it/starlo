import { Mongoose, Query } from "mongoose";

class APIFeatures {
  constructor(
    public query: Query<any, any>,
    private queryStr: Record<string, any>
  ) {
    this.query = query;
    this.queryStr = queryStr;
  }
  /**
   * Filters the query based on the given query string (queryStr).
   * Excludes pagination, sorting, and other non-filter parameters.
   */
  filter(
    excludedFields: string[] = ["page", "limit", "sort", "filter", "search"]
  ): this {
    const queryObject = { ...this.queryStr };
    excludedFields.forEach((field) => delete queryObject[field]);
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort(): this {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // To show the newset rooms
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields(): this {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  pagination(): this {
    const page = parseInt(this.queryStr.page ?? "1", 10);
    const limit = parseInt(this.queryStr.limit ?? "100", 10);

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search(): this {
    if (this.queryStr.search) {
      const regex = new RegExp(this.queryStr.search, "i");
      this.query = this.query.find({ name: { $regex: regex } });
    }
    return this;
  }
  searchByNumber(): this {
    if (this.queryStr.number) {
      this.query = this.query.find({
        number: { $regex: new RegExp(this.queryStr.number), $options: "i" },
      });
    }
    return this;
  }

  searchByRating(): this {
    if (this.queryStr.section) {
      this.query = this.query.find({
        section: { $eq: this.queryStr.section },
      });
    }
    return this;
  }
}

export default APIFeatures;
