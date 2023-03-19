import React, { memo, useRef, useState } from "react";
import styles from "./ChartSection.module.scss";
import classNames from "classnames/bind";
import bgchart from "../../assets/bg-chart.jpg";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SongItem from "../SongItem/SongItem";
import _ from "lodash";
import path from "../../utils/path";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";
const cx = classNames.bind(styles);
const { BsFillPlayFill } = icons;
const ChartSection = () => {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const chartRef = useRef();
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false, //không cố định chiều dài hoặc chiều rộng
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "gray", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] }, //3 là độ xài của nét đứt,4 là khoảng cách giữa các nét đứt
      },
      x: {
        ticks: { color: "white" }, // màu số nằm ngang thanh dưới
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,

        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 === 0)
                .map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }

          const result = counters?.find((i) =>
            i.data.some(
              (number) =>
                number === +tooltip?.body[0]?.lines[0].replace(".", "")
            )
          );
          setSelected(result.encodeId);

          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };
  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            .map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.3,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          animation: false,
          pointHoverBorderWidth: 5,
        });
      }
      setData({ labels, datasets });
    }
  }, [chart]);
  return (
    <div className={cx("container")}>
      <img src={bgchart} alt="bg_chart" className={cx("bg_chart")} />
      <div className={cx("bg_alpha")}></div>
      <div className={cx("content")}>
        <Link to={path.ZING_CHART} className={cx("box_title")}>
          <h1 className={cx("title")}>#Zing chart</h1>
          <span className={cx("play")}>
            <BsFillPlayFill size={20} />
          </span>
        </Link>
        <div className={cx("wrapper_chart")}>
          <div className={cx("rank")}>
            {rank
              ?.filter((item, index) => index < 3)
              ?.map((item, index) => (
                <SongItem
                  thumbnail={item.thumbnail}
                  title={item.title}
                  key={item.encodeId}
                  artists={item.artistsNames}
                  id={item.encodeId}
                  order={index + 1}
                  percent={Math.round((+item.score * 100) / +chart?.totalScore)}
                  style="white_color"
                />
              ))}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <Link to={path.ZING_CHART} className={cx("see_more")}>
                Xem thêm
              </Link>
            </div>
          </div>
          <div className={cx("chart")}>
            {data && <Line ref={chartRef} data={data} options={options} />}
            <div
              className={cx("tooltip")}
              style={{
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
                position: "absolute",
              }}
            >
              <SongItem
                thumbnail={
                  rank?.find((i) => i.encodeId === selected)?.thumbnail
                }
                title={rank?.find((i) => i.encodeId === selected)?.title}
                key={rank?.find((i) => i.encodeId === selected)?.encodeId}
                artists={
                  rank?.find((i) => i.encodeId === selected)?.artistsNames
                }
                id={rank?.find((i) => i.encodeId === selected)?.encodeId}
                style="bg-white"
                // percent={rank.find((i) =>
                //   Math.round((+i.score * 100) / +chart?.totalScore)
                // )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
