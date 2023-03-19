import React from "react";
import styles from "./MV.module.scss";
import bgweekchart from "../../../assets/bg-chart.jpg";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const MV = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper_chart")}>
        <img src={bgweekchart} alt="bg_chart" className={cx("bg_chart")} />
        <div className={cx("alpha")}></div>
        <div className={cx("alpha1")}></div>
        <div className={cx("chart_title")}>
          <div className={cx("title")}>
            <h2>Xin lỗi , trang MV không được hỗ trợ !</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MV;
