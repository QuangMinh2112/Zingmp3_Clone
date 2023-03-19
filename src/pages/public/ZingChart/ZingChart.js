import React, { useEffect, useRef, useState } from "react";
import styles from "./ZingChart.module.scss";
import classNames from "classnames/bind";
import { apiGetChartHome } from "../../../apis";
import { Line } from "react-chartjs-2";
import _ from "lodash";
import bgzingchart from "../../../assets/bg_zingchart.jpg";
import icons from "../../../utils/icons";
import { RankList, SongItem } from "../../../components";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components/Library/Audio";
const cx = classNames.bind(styles);
const { BsFillPlayFill } = icons;
const ZingChart = () => {
  const [dataChart, setDataChart] = useState(null);
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const chartRef = useRef();
  const scrollTop = useRef();
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const params = useParams();
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false, //không cố định chiều dài hoặc chiều rộng
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(0,0,0,0.5)", drawTicks: false },
        min: dataChart?.RTChart?.chart?.minScore,
        max: dataChart?.RTChart?.chart?.maxScore,
        border: { dash: [3, 4] }, //3 là độ xài của nét đứt,4 là khoảng cách giữa các nét đứt
      },
      x: {
        ticks: { color: "gray" }, // màu số nằm ngang thanh dưới
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
              data: dataChart?.RTChart?.chart?.items[
                Object.keys(dataChart?.RTChart?.chart?.items)[i]
              ]
                ?.filter((item) => +item.hour % 2 === 0)
                .map((item) => item.counter),
              encodeId: Object.keys(dataChart?.RTChart?.chart?.items)[i],
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
    const fetchChartHome = async () => {
      const res = await apiGetChartHome();
      setDataChart(res?.data?.data);
    };
    fetchChartHome();
  }, []);
  useEffect(() => {
    const labels = dataChart?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (dataChart?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: dataChart?.RTChart?.chart?.items[
            Object.keys(dataChart?.RTChart?.chart?.items)[i]
          ]
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
  }, [dataChart]);
  // useEffect(() => {
  //   scrollTop?.current.scrollIntoView({
  //     behavior: "auto",
  //     block: "end",
  //     inline: "nearest",
  //   });
  // }, [params]);
  return (
    <>
      {dataChart ? (
        <div className={cx("container")}>
          <div className={cx("wrapper")} ref={scrollTop}>
            <div className={cx("wrapper_chart")}>
              <img
                src={bgzingchart}
                alt="bg_chart"
                className={cx("bg_chart")}
              />
              <div className={cx("alpha")}></div>
              <div className={cx("alpha1")}></div>
              <div className={cx("chart_title")}>
                <h2>#zingchart</h2>
                <span>
                  <BsFillPlayFill size={25} />
                </span>
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
                      dataChart?.RTChart?.items?.find(
                        (i) => i.encodeId === selected
                      )?.thumbnail
                    }
                    title={
                      dataChart?.RTChart?.items?.find(
                        (i) => i.encodeId === selected
                      )?.title
                    }
                    key={
                      dataChart?.RTChart?.items?.find(
                        (i) => i.encodeId === selected
                      )?.encodeId
                    }
                    artists={
                      dataChart?.RTChart?.items?.find(
                        (i) => i.encodeId === selected
                      )?.artistsNames
                    }
                    id={
                      dataChart?.RTChart?.items?.find(
                        (i) => i.encodeId === selected
                      )?.encodeId
                    }
                    style="bg-white"
                  />
                </div>
              </div>
            </div>
            <div className={cx("chart_songs")}>
              <RankList data={dataChart?.RTChart?.items} number={10} />
            </div>
          </div>

          <div className={cx("week_chart_container")}>
            <div className={cx("wrapper_chart")}>
              <img
                src={bgzingchart}
                alt="bg_chart"
                className={cx("bg_chart_week")}
              />
              <div className={cx("alpha")}></div>
              <div className={cx("alpha1")}></div>
              <div className={cx("chart_title_week")}>
                <h2>Bảng Xếp Hạng Tuần</h2>
                <div className={cx("week_chart_box")}>
                  {dataChart?.weekChart &&
                    Object.entries(dataChart?.weekChart)?.map((item, index) => (
                      <div className={cx("week_chart_item")} key={index}>
                        <div className={cx("box_header")}>
                          <a href="/#">
                            {item[0] === "vn"
                              ? "Việt Nam"
                              : item[0] === "us"
                              ? "US-UK"
                              : item[0] === "korea"
                              ? "K-Pop"
                              : ""}
                          </a>
                          <span>{<BsFillPlayFill size={20} />}</span>
                        </div>
                        <div className={cx("items")}>
                          <RankList
                            data={item[1]?.items}
                            number={5}
                            link={item[1].link}
                          />
                        </div>
                      </div>
                    ))}
                  <div style={{ height: "100px" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "90px" }}></div>
        </div>
      ) : (
        <div className={cx("loading")}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default ZingChart;
