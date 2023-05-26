import React, { useState, useEffect, useRef } from "react";

const CircleProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight - 100;
      const containerTop = containerRef.current.offsetTop;
      const containerBottom = containerTop + containerHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = Math.max(
        window.scrollY - containerTop + windowHeight,
        0
      );

      const percentage = Math.round(
        ((scrollTop - windowHeight) /
          (containerBottom - containerTop - windowHeight)) *
          100
      );

      setProgress(Math.max(Math.min(percentage, 100), 0));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const radius = 45;
  const strokeWidth = 1;
  const dpr = window.devicePixelRatio || 1;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference * dpr;

  const strokeDashoffset = Math.max(
    circumference - (progress / 100) * circumference,
    0
  );
  // const renderText = (value: number, nextValue: number) => {
  //   return progress >= value && progress < nextValue ? (
  //     <p>{`${value}%`}</p>
  //   ) : null;
  // };

  const renderText = (value: number, nextValue: number) => {
    // let text: string | null = null;
    let text = "";
    if (progress >= value && progress < nextValue) {
      if (value === 10) {
        text = "Alter Link의 본사 설립";
      } else if (value === 15) {
        text =
          'Alter Link의 첫 프로젝트  “Pan-gaea”의 시작을 알립니다.<br />"PV - Pan-gaea” 는 Alter Link NFT 소유자는 물론 모두를 연결할수 있는 하나는 프로젝트입니다.<br />또한 모든 NFT소유자들이 같이 만들어 나갈수 있는 프로젝트이기도합니다.<br />자세한 프로젝트의 기획 및 진행상황들은 보유 디스코드에서  NFT소유자들은 확인 할수 있습니다.';
      } else if (value === 20) {
        text = "우리의 진심이 통하는 사람들과";
      } else if (value === 30) {
        text = "100% 민팅 완료시, 추가";
      } else if (value === 35) {
        text = "의 마케팅 및 개발 하는데 도움을 줄";
      } else if (value === 40) {
        text = "Alter Link NFT의 전략적 게임월드을 위해, ";
      } else if (value === 45) {
        text = "Alter Link NFT 보유자의 활";
      } else if (value === 50) {
        text = "나의 보유  Alter Link NFT를 꾸며 줄수";
      } else if (value === 55) {
        text = "Alter Link NFT 보유자들의 1대1 대전 ";
      } else if (value === 60) {
        text = " 전략적 카드 게임의 최대 승";
      } else if (value === 65) {
        text = "Alter Link NFT의 추가 속성을 에";
      } else if (value === 70) {
        text = "의 베타버전을 NFT보유자들에게 먼";
      } else if (value === 75) {
        text = "NFT의 파트너사를  모";
      } else if (value === 80) {
        text = " 배포를 통하여, 모든 협력업체들과";
      } else if (value === 90) {
        text = " 성공적 배포를 축하하기위하여,";
      }
    } else if (progress >= 100 && value === 90) {
      text = "굴하여, 날개를 달아줍니다.";
    }
    return text ? <p dangerouslySetInnerHTML={{ __html: text }}></p> : null;
  };
  return (
    <>
      <div id="section06">
        <div id="roadmap" ref={containerRef}>
          <div className="road_wrap">
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
            <div className="circle_wrap">
              <div className="text-container">
                <h2> {`${Math.round(progress)}%`}</h2>
                {renderText(10, 15)}
                {renderText(15, 20)}
                {renderText(20, 30)}
                {renderText(30, 35)}
                {renderText(35, 40)}
                {renderText(40, 45)}
                {renderText(45, 50)}
                {renderText(50, 55)}
                {renderText(55, 60)}
                {renderText(60, 65)}
                {renderText(65, 70)}
                {renderText(70, 75)}
                {renderText(75, 80)}
                {renderText(80, 90)}
                {renderText(90, 100)}
              </div>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  stroke="#fff"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 50 50)"
                />
                {/* <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="20px"
                  fill="#78e58f"
                >
                  {`${Math.round(progress)}%`}
                </text> */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircleProgressBar;
