import React, { useRef, useEffect, useState } from "react";

function LazyLoadImage({ src, alt, lazySrc, className }) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(imgRef.current);
        }
      },
      {
        rootMargin: "0px 0px 100px 0px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <>
      {isVisible && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%" }}
          className={className ? className : ""}
        />
      )}
      {!isVisible && (
        <img
          src={lazySrc}
          ref={imgRef}
          className={className ? className : ""}
          style={{
            width: "100%",
            height: "100%",

            filter: "blur(10px)",
          }}
        />
      )}
    </>
  );
}

export default LazyLoadImage;
