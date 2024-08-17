import React, { useEffect, useState, useCallback } from "react";
import Form from "./UI/Form/Form";
import Input from "./UI/Input/Input";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import SearchInput from "./UI/SearchInput";

const filterByPriceOpts = [
  { label: "+20$", value: "20" },
  { label: "+100$", value: "100" },
  { label: "+200$", value: "200" },
  { label: "+300$", value: "300" },
  { label: "+400$", value: "400" },
  { label: "+500$", value: "500" },
];

const SearchForm = ({ handler, searchHandler }) => {
  return (
    <Form className="search-form u-margin-bottom-medium">
      <div className="u-flex u-flex--center">
        <Input
          type="select"
          onChange={handler}
          selId="sortBy"
          name="date"
          options={[
            { label: "Newest", value: "-createdAt" },
            { label: "Oldest", value: "createdAt" },
          ]}
        />
        <Input
          type="select"
          onChange={handler}
          selId="sortByPrice"
          name="sort"
          options={[
            { label: "Sort by: Lowest price", value: "price" },
            { label: "Sort by: Highest price", value: "-price" },
            { label: "Sort by: Name", value: "name" },
          ]}
        />
        <Input
          type="select"
          name="price"
          onChange={handler}
          options={filterByPriceOpts}
        />
      </div>
      <SearchInput
        placeholder="Search..."
        className="search-page__input"
        name="name"
        onChange={searchHandler}
        type="search"
        id="searchByName"
        isRequired={false}
        disableVald
      />
    </Form>
  );
};

export default SearchForm;
