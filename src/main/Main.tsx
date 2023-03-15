import React, { useRef, useState, useEffect } from "react";
import "./main.css";

import Plx from "react-plx";

const Main: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null); // Ref 객체 생성

  // scroll 확인
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
    console.log(window.scrollY);
  }
  //scroll event
  const myDiv = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // mousemove event
  let x = 0;
  let y = 0;
  let mx = 0;
  let my = 0;

  const handleMouseMove = (e: MouseEvent) => {
    x = e.clientX - window.innerWidth / 2;
    y = e.clientY - window.innerHeight / 2;
  };

  const [pos, setPos] = useState({ x: 0, y: 0 }); // 이미지 위치
  const loop = () => {
    //const speed = 0.009;
    const speed = 0.02;

    mx += (x - mx) * speed;
    my += (y - my) * speed;

    window.requestAnimationFrame(loop);
    setPos({ x: mx, y: my });
  };

  useEffect(() => {
    function handleScroll() {
      if (myDiv.current !== null) {
        const top = myDiv.current.getBoundingClientRect().top;
        const bottom = myDiv.current.getBoundingClientRect().bottom;

        // 해당 요소가 뷰포트 안에 보이는지 확인
        if (top >= 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    }
    //mousemove event
    window.addEventListener("mousemove", handleMouseMove);
    loop();

    // scroll event
    window.addEventListener("scroll", onScroll);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", onScroll); //이거 나중에 지울거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  return (
    <>
      <div id="main">
        <Plx
          className="blackBg"
          parallaxData={[
            {
              start: 0,
              end: 650,
              properties: [
                {
                  startValue: 0,
                  endValue: 1,
                  property: "opacity",
                },
              ],
            },
          ]}
        />

        <div className="img_wrap">
          <img src="./img/main/wall.png" alt="" className="wall" />
          <img
            style={{
              transform: `translate(${pos.x / 10}px, ${pos.y / 30}px)`,
            }}
            src="./img/main/left_obj.png"
            alt=""
            className="leftObj"
          />
          <img
            src="./img/main/right_obj.png"
            alt=""
            className="rightObj"
            style={{
              transform: `translate(${pos.x / 30 + 10}px, ${
                pos.y / 30 + 10
              }px)`,
            }}
          />
          <img
            src="./img/main/floor.png"
            alt=""
            className="floor"
            style={{
              transform: `translate(${pos.x / 20 + 3}px, ${pos.y / 20 + 3}px)`,
            }}
          />
        </div>
        <div id="section01">
          <img src="./img/main/logo.png" alt="AlterLink" className="logo" />
        </div>
        <div id="section02">
          <p>
            “<span>Alter Link</span>” is a combination of “<span>Alter</span>”
            and “<span>Link</span>”, which means
            <br />
            connecting with another aspect of oneself (Alter) and is represented
            <br />
            by a symbol that is focused on one’s own voice, in order to not
            forget its essence.
          </p>
        </div>
      </div>
      <div id="section03">
        <div className="force atman">
          <div className="text_wrap">
            <div ref={myDiv} className={!isVisible ? "visible" : "hidden"}>
              <img src="./img/main/atman_text01.png" alt="" />
            </div>
          </div>
          <div className="peopleImg">
            <img src="./img/main/atman_people.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
