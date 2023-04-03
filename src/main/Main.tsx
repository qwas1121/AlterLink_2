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
    const speed = 0.009;

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
          <img
            src={process.env.PUBLIC_URL + "/img/main/atman_people.png"}
            alt="example"
          />

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
        <div className="force atman">
          <div className="text_wrap">
            <p>
              <span>link</span> <span>the</span> <span>styles</span>
              <br />
              <span>link</span> <span>the</span> <span>styles</span>
              <br />
              <span>link</span> <span>the</span> <span>styles</span>
            </p>
            <div ref={myDiv} className={!isVisible ? "visible" : "hidden"}>
              <img src="./img/main/atman_text01.png" alt="" />
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
      </div>
      {/* section03 */}
      <div id="section04" className="height100">
        <div className="sec_inner">
          <img
            src={process.env.PUBLIC_URL + "/img/main/sec04_top_line.png"}
            alt=""
          />
          <div className="text_wrap">
            <h2 className="num">10,000</h2>
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
      <div id="section06" className="height100">
        <div className="sec_inner">
          <img
            src={process.env.PUBLIC_URL + "/img/main/sec06_top_line.png"}
            alt=""
          />
          <img
            src={process.env.PUBLIC_URL + "/img/main/sec06_pattern.png"}
            alt=""
          />
        </div>
      </div>
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
