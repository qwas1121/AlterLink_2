import React, { useRef, useState, useEffect } from "react";
import "./main.css";
import Plx from "react-plx";
import { ReactComponent as SVG } from "./svg.svg";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import CountUp from "react-countup";

import RoadMap from "./Roadmap";
const Main: React.FC = () => {
  // scroll 확인
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
    console.log(window.scrollY);
  }
  //scroll event (force)
  const forceRef = useRef<HTMLDivElement>(null); // Ref 객체 생성
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollClass, setScrollClass] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);

  //숫자 증가
  const numRef = useRef<HTMLDivElement>(null); // Ref 객체 생성
  const [num, setNum] = useState(false);

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
    const speed = 0.009;

    mx += (x - mx) * speed;
    my += (y - my) * speed;

    window.requestAnimationFrame(loop);
    setPos({ x: mx, y: my });
  };
  useEffect(() => {
    function handleScroll() {
      if (!forceRef.current) return;

      // const sectionHeight = forceRef.current.offsetHeight;
      // const scrollPosition = window.pageYOffset - forceRef.current.offsetTop;
      // const scrollPercent = (scrollPosition / sectionHeight) * 100;

      // setScrollPercent(scrollPercent);

      const sectionTop = forceRef.current.getBoundingClientRect().top;
      const sectionHeight = forceRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // 이제 sectionTop은 0 (상단에 도착)부터 -sectionHeight (하단에 도착)까지의 범위를 가집니다.
      // 이 값을 양수로 변환하고, sectionHeight에 대한 비율을 계산하여 스크롤 퍼센트를 얻습니다.
      const scrollPosition = -sectionTop;
      const scrollPercent =
        (scrollPosition / (sectionHeight - viewportHeight)) * 100;

      setScrollPercent(scrollPercent);

      // if (scrollPercent < 11) {
      //   setScrollClass("scroll01");
      // } else if (scrollPercent < 22) {
      //   setScrollClass("scroll02");
      // } else if (scrollPercent < 33) {
      //   setScrollClass("scroll03");
      // } else if (scrollPercent < 44) {
      //   setScrollClass("scroll04");
      // } else if (scrollPercent < 55) {
      //   setScrollClass("scroll05");
      // } else if (scrollPercent < 66) {
      //   setScrollClass("scroll06");
      // } else if (scrollPercent < 77) {
      //   setScrollClass("scroll07");
      // } else if (scrollPercent < 88) {
      //   setScrollClass("scroll08");
      // } else {
      //   setScrollClass("scroll09");
      // }

      //숫자
      if (
        numRef.current !== null &&
        numRef.current.getBoundingClientRect().top < window.innerHeight
      ) {
        setNum(true);
      } else {
        setNum(false);
      }
    }
    //mousemove event
    window.addEventListener("mousemove", handleMouseMove);

    //★ 메인에서 벗어나면 중단되게 해야함
    loop();

    // scroll event
    window.addEventListener("scroll", onScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", onScroll); //이거 나중에 지울거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id="main">
        <h1>Are you ready to link?</h1>
        <div className="blackBg2"></div>
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
          <img
            src={process.env.PUBLIC_URL + "/img/main/wall.png"}
            alt=""
            className="wall"
          />
          <img
            style={{
              transform: `translate(${pos.x / 10}px, ${pos.y / 10}px)`,
            }}
            src={process.env.PUBLIC_URL + "/img/main/move_img.png"}
            alt=""
            className="move_img"
          />
        </div>
        <div id="section01">
          <div className="phone">
            <img
              src={process.env.PUBLIC_URL + "/img/main/logo.png"}
              alt="AlterLink"
              className="logoImg"
            />
            <img
              src={process.env.PUBLIC_URL + "/img/main/phone.png"}
              alt=""
              className="phoneImg"
            />
          </div>
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
      <div
        id="section03"
        ref={forceRef}
        className={`forceWrap ${scrollClass}
        ${scrollPercent <= 33 && scrollPercent > 0 ? "atman" : ""}
        ${scrollPercent > 33 ? "looper" : ""}
        ${scrollPercent > 66 ? "hide" : ""}
      `}
      >
        {/* 아트만 루퍼 하이드*/}
        <div className="forceWrap">
          <img
            src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
            alt=""
            className="force_bg"
          />
          <div className="text_wrap">
            <SVG />
          </div>

          {/* atman */}
          <div className="force atman height100">
            <div
              className={`peopleImg ${scrollPercent > 5 ? "active" : ""}
             ${scrollPercent > 33 ? "remove" : ""}`}
            >
              <img
                src={process.env.PUBLIC_URL + "/img/main/atman_people.png"}
                alt=""
                className="people"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/img/main/atman_people_shadow.png"
                }
                alt=""
                className="shadow"
              />
            </div>
            <div
              className={`storyWrap ${scrollPercent > 5 ? "active" : ""}
            ${scrollPercent > 33 ? "remove" : ""}
            `}
            >
              <div className="circle"></div>
              <div className="lineWrap">
                <div className="line"></div>
              </div>
              <div className="line2">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/story_line.png"}
                  alt=""
                />
              </div>
              <div className="box cf">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/storyBox_line.png"}
                  alt=""
                  className="storyLine right"
                />
                <h3>
                  <img
                    src={process.env.PUBLIC_URL + "/img/main/atman_logo.png"}
                    alt="ATMAN"
                  />
                </h3>
                <div className="txt">
                  <h4>
                    <span>Alter</span>
                  </h4>
                  <p>
                    <span>
                      A force that adapts to rapidly changing environments.
                      <br />
                      They live hiding what they <br />
                      really like and want to do, conscious of society’s gaze
                    </span>
                  </p>
                </div>
                <div className="txt">
                  <h4>
                    <span>Story</span>
                  </h4>
                  <p>
                    <span>
                      Belong to the government and dream of a stable and high
                      position,
                      <br />
                      There are also Atmans who go over to the power of loopers
                      for
                      <br />
                      their own freedom and dreams.
                    </span>
                  </p>
                </div>
                <img
                  src={process.env.PUBLIC_URL + "/img/main/storyBox_line.png"}
                  alt=""
                  className="storyLine"
                />
              </div>
            </div>
          </div>
          {/* atman */}

          {/* looper */}
          <div className="force looper height100">
            <div
              className={`peopleImg ${scrollPercent > 33 ? "peopleOn" : ""}
              ${scrollPercent > 33 ? "active" : ""}
             ${scrollPercent > 66 ? "remove" : ""}`}
            >
              <img
                src={process.env.PUBLIC_URL + "/img/main/looper_people.png"}
                alt=""
                className="people"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/img/main/atman_people_shadow.png"
                }
                alt=""
                className="shadow"
              />
            </div>
            <div
              className={`storyWrap ${scrollPercent > 33 ? "active" : ""}
            ${scrollPercent > 66 ? "remove" : ""}
            `}
            >
              <div className="circle"></div>
              <div className="lineWrap">
                <div className="line"></div>
              </div>
              <div className="line2">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/story_line.png"}
                  alt=""
                />
              </div>
              <div className="box cf">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/storyBox_line.png"}
                  alt=""
                  className="storyLine right"
                />
                <h3>
                  <img
                    src={process.env.PUBLIC_URL + "/img/main/looper_logo.png"}
                    alt="LOOPER"
                  />
                </h3>
                <div className="txt">
                  <h4>
                    <span>Alter</span>
                  </h4>
                  <p>
                    <span>
                      A force that values their own freedom and instincts.
                      <br />
                      They may be self-centered, but they have a personality
                      <br />
                      that is not resistant to doing things that they believe
                      <br />
                      are valuable and enjoyable.
                    </span>
                  </p>
                </div>
                <div className="txt">
                  <h4>
                    <span>Story</span>
                  </h4>
                  <p>
                    <span>내용수정</span>
                  </p>
                </div>
                <img
                  src={process.env.PUBLIC_URL + "/img/main/storyBox_line.png"}
                  alt=""
                  className="storyLine"
                />
              </div>
            </div>
          </div>
          {/* looper */}
          {/* hide */}
          <div className="force hide height100">
            <div
              className={`peopleImg ${scrollPercent > 66 ? "peopleOn" : ""}
              ${scrollPercent > 66 ? "active" : ""}`}
            >
              <img
                src={process.env.PUBLIC_URL + "/img/main/hide_people.png"}
                alt=""
                className="people"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/img/main/atman_people_shadow.png"
                }
                alt=""
                className="shadow"
              />
            </div>
            <div className={`storyWrap ${scrollPercent > 66 ? "active" : ""}`}>
              <div className="circle"></div>
              <div className="lineWrap">
                <div className="line"></div>
              </div>
              <div className="line2">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/story_line.png"}
                  alt=""
                />
              </div>
              <div className="box cf">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/storyBox_line.png"}
                  alt=""
                  className="storyLine right"
                />
                <h3>
                  <img
                    src={process.env.PUBLIC_URL + "/img/main/hide_logo.png"}
                    alt="HIDE"
                  />
                </h3>
                <div className="txt">
                  <h4>
                    <span>Alter</span>
                  </h4>
                  <p>
                    <span>
                      A machine-wrapped force.
                      <br />
                      Develop your weaknesses more strongly.
                      <br />
                      He is law-abiding, tough, and cold-hearted.
                    </span>
                  </p>
                </div>
                <div className="txt">
                  <h4>
                    <span>Story</span>
                  </h4>
                  <p>
                    <span>
                      They dream of their own paradise, free from government
                      control.
                      <br />
                      Self-centered, but living together with like-minded
                      people,
                      <br />
                      It is a rebel force of the government,
                      <br />
                      and also a force of opposition to Hide.
                    </span>
                  </p>
                </div>
                <img
                  src={process.env.PUBLIC_URL + "/img/main/storyBox_line.png"}
                  alt=""
                  className="storyLine"
                />
              </div>
            </div>
          </div>
          {/* looper */}
        </div>
      </div>
      {/* section03 */}

      <div id="section04">
        <div className="blackBg"></div>
        <div className="blackBg2"></div>
        <div className="sec_inner">
          <img
            src={process.env.PUBLIC_URL + "/img/main/sec04_top_line.png"}
            alt=""
          />
          <div className="sec04_inner">
            <div ref={numRef} className="text_wrap">
              <h2 className="num">
                {num && <CountUp start={0} end={9000} duration={1} />}
              </h2>
              <h3>
                <span>
                  A collection of 9,000. Link to the faction that suits
                  <br />
                  you among the three factions.
                </span>
              </h3>
              <p>
                <span className="forceName">“Hide”</span>
                <span className="txt"> wants to be proud of his strength</span>
                <br />
                <span className="forceName">“looper”</span>
                <span className="txt">
                  who yearns for freedom and wants a life of
                </span>
                freedom
                <br />
                <span className="forceName">“Atman”</span>
                <span className="txt"> who is worried about not being</span>
                <br />
                <span className="txt">
                  able to decide what he wants Link with the faction that suits
                </span>
                you.
              </p>
            </div>
            <div className="img_wrap">
              <div className="imgBox imgOne">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/sec04_img01.png"}
                  alt=""
                  className="img01"
                />
                <img
                  src={process.env.PUBLIC_URL + "/img/main/sec04_img04.png"}
                  alt=""
                  className="img04"
                />
              </div>
              <div className="imgBox imgTwo">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/sec04_img02.png"}
                  alt=""
                  className="img03"
                />
                <img
                  src={process.env.PUBLIC_URL + "/img/main/sec04_img05.png"}
                  alt=""
                  className="img05"
                />
              </div>
              <div className="imgBox imgThree">
                <img
                  src={process.env.PUBLIC_URL + "/img/main/sec04_img03.png"}
                  alt=""
                  className="img03"
                />
                <img
                  src={process.env.PUBLIC_URL + "/img/main/sec04_img06.png"}
                  alt=""
                  className="img06"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section04 */}
    </>
  );
};

export default Main;
