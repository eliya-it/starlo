import React from "react";
import Reveal from "../../Animations/Reveal";

import Section from "../Section/Section";
import GalleryPhoto from "../GalleryPhoto";
import Animate from "../UI/Animate";
const Gallery = () => {
  const galleryData = [
    {
      className: "gallery__item--1",
      path: "/img/rooms/gallery-1.jpg",
    },
    {
      className: "gallery__item--2",
      path: "/img/rooms/gallery-2.jpg",
    },
    {
      className: "gallery__item--3",
      path: "/img/rooms/gallery-3.jpg",
    },
    {
      className: "gallery__item--4",
      path: "/img/rooms/gallery-4.jpg",
    },
    {
      className: "gallery__item--5",
      path: "/img/rooms/gallery-5.jpg",
    },
    {
      className: "gallery__item--6",
      path: "/img/rooms/gallery-6.jpg",
    },
    {
      className: "gallery__item--7",
      path: "/img/rooms/gallery-7.jpg",
    },
    {
      className: "gallery__item--8",
      path: "/img/rooms/gallery-8.jpg",
    },
    {
      className: "gallery__item--9",
      path: "/img/rooms/gallery-9.jpg",
    },
    {
      className: "gallery__item--10",
      path: "/img/rooms/gallery-10.jpg",
    },
    {
      className: "gallery__item--11",
      path: "/img/rooms/gallery-11.jpg",
    },
    {
      className: "gallery__item--12",
      path: "'../../public/img/rooms/gallery-12.jpg",
    },
    {
      className: "gallery__item--13",
      path: "/img/rooms/gallery-13.jpg",
    },
    {
      className: "gallery__item--14",
      path: "/img/rooms/gallery-14.jpg",
    },
  ];
  return (
    <Animate
      hidden={{
        opacity: 0,
        translateY: "20rem",
      }}
      visible={{
        opacity: 1,
        translateY: "0",
      }}
    >
      {" "}
      <Section className="section--gallery">
        {galleryData.map((photo, index) => (
          <GalleryPhoto
            key={index}
            className={photo.className}
            path={photo.path}
          />
        ))}
      </Section>
    </Animate>
  );
};

export default Gallery;
