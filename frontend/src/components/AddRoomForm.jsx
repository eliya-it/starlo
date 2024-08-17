import React, { useState } from "react";
import Form from "./UI/Form/Form";
import Input from "./UI/Input/Input";
import InputImg from "./UI/Form/InputImg/InputImg";
import Grid from "./Containers/Layout/Grid";
import Button from "./UI/Button/Button";
import Textarea from "./UI/Textarea";

const statusOpts = [
  {
    label: "Empty",
    value: "empty",
  },
  {
    label: "Occupied",
    value: "occupied",
  },
];

const AddRoomForm = ({ onSubmit, isLoading, handleData }) => {
  const [roomPhotos, setRoomPhotos] = useState([]);
  const [singleRoomPhoto, setSingleRoomPhoto] = useState(null);
  const [photosError, setPhotosError] = useState("");

  const photosPreviewHandler = (e) => {
    const selectedPhotos = e.target.files;
    const photosArr = Array.from(selectedPhotos);

    if (photosArr.length > 3 || photosArr.length < 3) {
      setPhotosError("Room photos must be 3 only!");
      return;
    }

    const photos = photosArr.map((photo) => {
      return URL.createObjectURL(photo);
    });
    setRoomPhotos(photos);
    setPhotosError("");
  };

  const coverPreviewHandler = (e) => {
    const selectedPhoto = e.target.files[0];
    const photoUrl = URL.createObjectURL(selectedPhoto);
    setSingleRoomPhoto(photoUrl);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        label="Room name"
        name="name"
        onChange={handleData}
        min={8}
        placeholder="King Room"
      />
      <Input
        label="Room Price"
        name="price"
        min={2}
        max={4}
        placeholder="100"
        onChange={handleData}
      />
      <Input
        label="Categories"
        name="categories"
        onChange={handleData}
        placeholder="Separate by a space"
      />
      <Input
        label="Beds"
        name="bedsCount"
        placeholder="3"
        min={1}
        max={2}
        onChange={handleData}
      />
      <Input
        label="Extra Beds"
        name="extraBeds"
        placeholder="2"
        onChange={handleData}
        max={1}
      />
      <Input
        label="Meals "
        name="meals"
        onChange={handleData}
        max={1}
        placeholder="4"
      />
      <Input
        type="select"
        label="Status"
        name="roomStatus"
        options={statusOpts}
        onChange={handleData}
      />
      <Textarea
        placeholder="Summary...."
        onChange={handleData}
        name="summary"
        id="summary"
        label="Summary"
      />

      <InputImg
        id="roomCover"
        name="roomCover"
        text="Add Cover"
        onChange={coverPreviewHandler}
      />
      {singleRoomPhoto ? (
        <div className="img-box">
          <img
            src={singleRoomPhoto}
            className="img-box__img"
            height="200"
            alt="New cover on Starlo"
          />
        </div>
      ) : null}
      <InputImg
        id="roomPhotos"
        name="roomPhotos"
        text="Add Photos"
        onChange={photosPreviewHandler}
        isMulti
      />
      {photosError && <p style={{ color: "red" }}>{photosError}</p>}
      <Grid col="3">
        {roomPhotos?.map((photo) => (
          <div className="img-box" key={photo}>
            <img
              src={photo}
              alt="New photos on Starlo"
              className="img-box__img"
            />
          </div>
        ))}
      </Grid>
      <Button isInline isLoading={isLoading} disabled={photosError}>
        Add
      </Button>
    </Form>
  );
};

export default AddRoomForm;
