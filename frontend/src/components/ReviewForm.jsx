import React from "react";
import Form from "../components/UI/Form/Form";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import { useSelector } from "react-redux";

const ReviewForm = ({ handler, disabled, onSubmit, isLoading }) => {
  const { user } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    handler({ review: e.target.value });
  };

  return (
    <Form className="add-review__form" onSubmit={onSubmit}>
      <Input
        className="add-review__form__input"
        placeholder="I have had the best room experience in Starlo"
        onChange={handleChange}
      />
      {user?.role === "user" ? (
        <Button disabled={disabled} isLoading={isLoading}>
          Add
        </Button>
      ) : (
        <Button disabled={true} isLoading={isLoading}>
          Admin Can't Leave a review!
        </Button>
      )}
    </Form>
  );
};

export default ReviewForm;
