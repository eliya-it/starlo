import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useHttp from "../hooks/http";
import Message from "../components/UI/Message/Message";
import Section from "../components/Section/Section";
import Container from "../components/Containers/Container";
import Loader from "../components/UI/Loader/Loader";
import RoomsSearch from "../components/RoomsSearch/RoomsSearch";
import SearchForm from "../components/SearchForm";
import SearchBtns from "../components/SearchBtns";
import Heading from "../components/Typography/Heading";

const Rooms = () => {
  const { sendRequest, data, error, isLoading } = useHttp();
  const [search, setSearch] = useState("");
  const limit = 9;
  const [params, setParams] = useSearchParams();
  const [searchObj, setSearchObj] = useState({
    sort: "-createdAt",
    price: 20,
    name: "",
  });
  // Handlers
  const onSearchChange = (e) => {
    const val = e.target.value;

    setSearch(val);
  };
  const handleSearchData = (e) => {
    const { name, value } = e.target;
    setSearchObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextPage = () => {
    setParams((prevParams) => ({
      ...Object.fromEntries(prevParams),
      page: (parseInt(prevParams.get("page")) || 1) + 1,
    }));
  };

  const prevPage = () => {
    setParams((prevParams) => ({
      ...Object.fromEntries(prevParams),
      page: (parseInt(prevParams.get("page")) || 1) - 1,
    }));
  };
  useEffect(() => {
    const curPage = params.get("page");
    if (!curPage) {
      setParams({ page: 1 });
    }
  }, [params, setParams]);
  useEffect(() => {
    const sort = searchObj.sort;
    const page = parseInt(params.get("page")) || 1;
    const filterByPriceParam = `&price[gt]=${searchObj.price}`;

    const searchParam = search !== "" ? `&search=${search}` : "";
    const sortParam = sort ? `&sort=${sort}` : "";
    const url = `/rooms?page=${page}&limit=${limit}${filterByPriceParam}${searchParam}${sortParam}`;
    const timer = setTimeout(() => {
      sendRequest(url, "GET", true);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, params, searchObj]);

  return (
    <Section className="section--rooms">
      {error && <Message text={error?.data.message} status="fail" />}
      <Container>
        <div className="rooms">
          <SearchForm
            handler={handleSearchData}
            searchHandler={onSearchChange}
          />
          <SearchBtns
            onNext={nextPage}
            onPrev={prevPage}
            prevDisabled={parseInt(params.get("page")) === 1}
            nextDisabled={data?.data.docs.length < limit}
          />
          <div className="u-center-text">{isLoading && <Loader isFetch />}</div>
          {!isLoading && data?.data.docs.length === 0 && !error && (
            <Heading isTertiary className="u-center-text">
              There are no rooms 🥲
            </Heading>
          )}
          <p className="rooms__result u-center-text u-margin-bottom-medium">
            {isLoading ? "Loading..." : ""}
          </p>
          <RoomsSearch rooms={data?.data.docs} />
        </div>
      </Container>
    </Section>
  );
};

export default Rooms;
