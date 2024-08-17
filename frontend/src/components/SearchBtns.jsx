import React from "react";
import Button from "./UI/Button/Button";
import { LiaChevronLeftSolid, LiaChevronRightSolid } from "react-icons/lia";

const SearchBtns = ({ onPrev, onNext, prevDisabled, nextDisabled }) => {
  return (
    <div className="pagination">
      <Button
        className="pagination__btn"
        text="Prev"
        onClick={onPrev}
        disabled={prevDisabled}
      >
        <LiaChevronLeftSolid className="pagination__btn__icon" />
      </Button>
      <Button
        className="pagination__btn"
        onClick={onNext}
        disabled={nextDisabled}
      >
        <LiaChevronRightSolid className="pagination__btn__icon" />
      </Button>
    </div>
  );
};

export default SearchBtns;
