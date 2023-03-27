import React, { memo, useEffect } from "react";
import styles from "./WeeRank.module.scss";
import classNames from "classnames/bind";
import bgweekchart from "../../assets/week-chart-bg.jpg";
import icons from "../../utils/icons";
import { NavLink, useParams } from "react-router-dom";
import RankList from "../RankList/RankList";

const cx = classNames.bind(styles);
const { BsFillPlayFill } = icons;

const notActiveStyle = {
  display: "block",
  padding: "15px 0",
};
const activeStyle = {
  display: "block",
  padding: "15px 0",
  color: "#0e8080",
  borderBottom: "3px solid #0e8080",
};
const WeeRank = ({ weekChart }) => {
  const { id } = useParams();
  useEffect(() => {}, [id]);
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper_chart")}>
        <img src={bgweekchart} alt="bg_chart" className={cx("bg_chart")} />
        <div className={cx("alpha")}></div>
        <div className={cx("alpha1")}></div>
        <div className={cx("chart_title")}>
          <div className={cx("title")}>
            <h2>Bảng Xếp Hạng Tuần</h2>
            <span className={cx("play")}>
              <BsFillPlayFill size={25} />
            </span>
          </div>
          <div className={cx("navbar_menu")}>
            {weekChart?.map((item) => (
              <NavLink
                key={item.playlistId}
                to={item?.link.split(".")[0]}
                style={({ isActive }) =>
                  isActive ? activeStyle : notActiveStyle
                }
              >
                {item.country === "vn"
                  ? "VIỆT NAM"
                  : item.country === "us"
                  ? "US-UK"
                  : item.country === "korea"
                  ? "K-POP"
                  : ""}
              </NavLink>
            ))}
          </div>

          <RankList
            data={weekChart?.find((item) => item?.link?.includes(id))?.items}
            number={100}
            isHideAlbum={false}
            isHideBtn
          />
        </div>
      </div>
    </div>
  );
};

export default memo(WeeRank);
