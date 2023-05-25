import React, { useRef, useState, useEffect } from "react";
import "./main_back.css";
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
  //scroll event (styles 텍스트)
  const textRef = useRef<HTMLDivElement>(null); // Ref 객체 생성
  const textRef2 = useRef<HTMLDivElement>(null); // Ref 객체 생성
  const textRef3 = useRef<HTMLDivElement>(null); // Ref 객체 생성
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPosition2, setScrollPosition2] = useState(0);
  const [scrollPosition3, setScrollPosition3] = useState(0);

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
      const currentPosition = window.pageYOffset;
      if (textRef.current !== null) {
        const wrapTop = textRef.current.offsetTop;
        setScrollPosition(currentPosition - wrapTop + 700);
        //setScrollPosition(wrapTop);
      }

      if (textRef2.current !== null) {
        const wrapTop2 = textRef2.current.offsetTop;
        setScrollPosition2(currentPosition - wrapTop2 + 700);
        //setScrollPosition2(wrapTop2);
      }
      if (textRef3.current !== null) {
        const wrapTop3 = textRef3.current.offsetTop;
        setScrollPosition3(currentPosition - wrapTop3 + 700);
      }

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
          <img
            src={process.env.PUBLIC_URL + "/img/main/logo.png"}
            alt="AlterLink"
            className="logo"
          />
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
        {/* atman */}
        <div ref={textRef} className="force atman height100">
          <img
            src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
            alt=""
            className="force_bg"
          />
          <div
            className={`wrap ${
              scrollPosition >= 0 && scrollPosition < 350 ? "scroll01" : ""
            } ${
              scrollPosition >= 350 && scrollPosition < 700 ? "scroll02" : ""
            } ${scrollPosition >= 700 ? "scroll03" : ""}`}
          >
            <div className="text_wrap">
              <SVG />
            </div>
          </div>
          <div className="peopleImg">
            <img
              src={process.env.PUBLIC_URL + "/img/main/atman_people.png"}
              alt=""
            />
          </div>
        </div>

        <div className="peopleStory atman">
          <h2>
            <img
              src={process.env.PUBLIC_URL + "/img/main/atman_logo.png"}
              alt=""
            />
            <img
              src={process.env.PUBLIC_URL + "/img/main/atman_logo_line.png"}
              alt=""
              className="line"
            />
          </h2>
          <ul className="cf">
            <li>
              <h3>Alter</h3>
              <p>
                A force that adapts to rapidly changing environments.
                <br />
                They live hiding what they <br />
                really like and want to do, conscious of society’s gaze
              </p>
            </li>
            <li>
              <h3>Story</h3>
              <p>
                Belong to the government and dream of a stable and high
                position,
                <br />
                There are also Atmans who go over to the power of loopers for
                <br />
                their own freedom and dreams.
              </p>
            </li>
          </ul>
        </div>
        {/* atman */}
        {/* looper */}
        <div ref={textRef2} className="force looper height100">
          <img
            src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
            alt=""
            className="force_bg"
          />
          <div
            className={`wrap ${
              scrollPosition2 >= 0 && scrollPosition2 < 350 ? "scroll01" : ""
            } ${
              scrollPosition2 >= 350 && scrollPosition2 < 700 ? "scroll02" : ""
            } ${scrollPosition2 >= 700 ? "scroll03" : ""}`}
          >
            <div className="text_wrap">
              <SVG />
            </div>
          </div>
          <div className="peopleImg">
            <img
              src={process.env.PUBLIC_URL + "/img/main/looper_people.png"}
              alt=""
            />
          </div>
        </div>
        <div className="peopleStory looper">
          <h2>
            <img
              src={process.env.PUBLIC_URL + "/img/main/looper_logo.png"}
              alt=""
            />
            <img
              src={process.env.PUBLIC_URL + "/img/main/looper_logo_line.png"}
              alt=""
              className="line"
            />
          </h2>
          <ul className="cf">
            <li>
              <h3>Alter</h3>
              <p>
                A force that values their own freedom and instincts.
                <br />
                They may be self-centered, but they have a personality that is
                not resistant
                <br />
                to doing things that they believe are valuable and enjoyable.
              </p>
            </li>
            <li>
              <h3>Story</h3>
              <p>
                They dream of their own paradise, free from government control.
                <br />
                Self-centered, but living together with like-minded people,
                <br />
                It is a rebel force of the government, and also a force of
                opposition to Hide.
              </p>
            </li>
          </ul>
        </div>
        {/* looper */}
        {/* hide */}
        <div ref={textRef3} className="force hide height100">
          <img
            src={process.env.PUBLIC_URL + "/img/main/forceBg.png"}
            alt=""
            className="force_bg"
          />
          <div
            className={`wrap ${
              scrollPosition3 >= 0 && scrollPosition3 < 350 ? "scroll01" : ""
            } ${
              scrollPosition3 >= 350 && scrollPosition3 < 700 ? "scroll02" : ""
            } ${scrollPosition3 >= 700 ? "scroll03" : ""}`}
          >
            <div className="text_wrap">
              <SVG />
            </div>
          </div>
          <div className="peopleImg">
            <img
              src={process.env.PUBLIC_URL + "/img/main/hide_people.png"}
              alt=""
            />
          </div>
        </div>
        <div className="peopleStory hide">
          <h2>
            <img
              src={process.env.PUBLIC_URL + "/img/main/hide_logo.png"}
              alt=""
            />
            <img
              src={process.env.PUBLIC_URL + "/img/main/hide_logo_line.png"}
              alt=""
              className="line"
            />
          </h2>
          <ul className="cf">
            <li>
              <h3>Alter</h3>
              <p>
                A machine-wrapped force.
                <br />
                Develop your weaknesses more strongly.
                <br />
                He is law-abiding, tough, and cold-hearted.
              </p>
            </li>
            <li>
              <h3>Story</h3>
              <p>
                If you enlist in the government’s army, You can make yourself
                stronger
                <br />
                with a better machine, and you can achieve a rise in status.
                <br />
                Its main task is to wipe out criminals who do not comply with
                control.
              </p>
            </li>
          </ul>
        </div>
        {/* hide */}
      </div>
      {/* section03 */}

      <div id="section04" className="height100">
        <div className="sec_inner">
          <img
            src={process.env.PUBLIC_URL + "/img/main/sec04_top_line.png"}
            alt=""
          />
          <div ref={numRef} className="text_wrap">
            <h2 className="num">
              {num && <CountUp start={0} end={10000} duration={1} />}
            </h2>
            <h3>
              A collection of 10,000.
              <br />
              Link to the faction that suits you among the three factions.
            </h3>
            <p>
              <span>“Hide”</span> wants to be proud of his strength
              <br />
              <span>“looper”</span> who yearns for freedom and wants a life of
              freedom
              <br />
              <span>“Atman”</span> who is worried about not being able to decide
              what he wants
              <br />
              Link with the faction that suits you.
            </p>
          </div>
        </div>
      </div>
      {/* section04 */}
      <div id="section05" className="height100">
        <div className="sec_inner">
          <ul className="cf">
            <li>
              <img
                src={process.env.PUBLIC_URL + "/img/main/nft_img01.png"}
                alt=""
              />
            </li>
            <li>
              <img
                src={process.env.PUBLIC_URL + "/img/main/nft_img02.png"}
                alt=""
              />
            </li>
            <li>
              <img
                src={process.env.PUBLIC_URL + "/img/main/nft_img03.png"}
                alt=""
              />
            </li>
            <li>
              <img
                src={process.env.PUBLIC_URL + "/img/main/nft_img04.png"}
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
      {/* section05 */}
      <RoadMap />

      {/* section06 */}
      <div id="section07">
        <div className="sec_inner">
          <div className="faq">
            <h2>
              FAQ <span></span>
            </h2>
            <div className="text_wrap">
              <p>AlterLink는 무엇입니까?</p>
              <p>
                Lockeys는 3,500 NFT(대체 불가능한 토큰) 모음으로 소유자를
                <br />
                Unlocked 커뮤니티의 구성원으로 인정하고, 정말 멋진 프로필 사진을
                찍고,
                <br />
                여러 유틸리티 및 혜택에 액세스하고, NFT x DeFi의 일부가 될 수
                있습니다.
                <br />
                생태계 유산.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
