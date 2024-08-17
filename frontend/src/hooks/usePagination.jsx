import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const usePagination = ({ data = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const [curPage, setCurPage] = useState(queryParams.get("page") * 1 || 1);
  const [limit, setLimit] = useState(queryParams.get("limit") * 1 || 9);
  const newSearchParams = new URLSearchParams();

  const totalPages = Math.ceil(data?.length / limit);

  const start = (curPage - 1) * limit; // Start from 0
  const end = start + limit; // 1 + 8=9, which is the data
  const nextPage = () => {
    if (curPage < totalPages) {
      setCurPage(curPage + 1);
      queryParams.set("page", curPage + 1 * 1);
    }
  };
  const prevPage = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1);
      queryParams.set("page", curPage - 1 * 1);
    }
  };

  useEffect(() => {
    navigate(`?${queryParams}`);
  }, [limit, curPage, totalPages]);
  return {
    meals: data?.slice(start, end),
    totalPages,
    nextPage,
    prevPage,
    curPage,
  };
};

export default usePagination;
