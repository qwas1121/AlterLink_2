import React, { useEffect, useRef } from "react";

const MyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY || window.pageYOffset;
        const documentHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrollPercentage = scrollY / documentHeight;

        const r = Math.floor(255 * scrollPercentage);
        const g = Math.floor(255 - 255 * scrollPercentage);
        const b = 0;

        ref.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="section03"
      style={{
        height: "100vh",
        position: "relative",
        backgroundImage: `url(${
          process.env.PUBLIC_URL + "/img/main/forceBg.png"
        })`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      ref={ref}
    >
      <div
        className="forceWrap"
        style={{ position: "sticky", height: "100vh" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
          alt=""
          className="force_bg"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
          alt=""
          className="force_bg"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
          alt=""
          className="force_bg"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
          alt=""
          className="force_bg"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
          alt=""
          className="force_bg"
        />
      </div>
    </div>
  );
};

export default MyComponent;
