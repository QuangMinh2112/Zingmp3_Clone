import React, { useEffect, useState } from "react";
import styles from "./NewMusic.module.scss";
import classNames from "classnames/bind";
import icons from "../../../utils/icons";
import bgNewMusic from "../../../assets/new-release-bg.73d8f976.jpg";
import { getNewMusic } from "../../../apis";
import { RankList } from "../../../components";
const cx = classNames.bind(styles);
const { BsFillPlayFill } = icons;
const NewMusic = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchDataNewMusic = async () => {
      const res = await getNewMusic();
      if (res.data.err === 0) {
        setData(res.data.data.items);
      }
    };
    fetchDataNewMusic();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper_chart")}>
        <img src={bgNewMusic} alt="bg_chart" className={cx("bg_chart")} />
        <div className={cx("alpha")}></div>
        <div className={cx("alpha1")}></div>
        <div className={cx("chart_title")}>
          <div className={cx("title")}>
            <h2>Bảng Xếp Hạng Tuần</h2>
            <span className={cx("play")}>
              <BsFillPlayFill size={25} />
            </span>
          </div>
          <RankList data={data} number={100} isHideAlbum={false} isHideBtn />
        </div>
      </div>
    </div>
  );
};

export default NewMusic;
