import React from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import { Search } from "../Search";

const { BsArrowLeft, BsArrowRight } = icons;
const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header_left")}>
        <div className={cx("header_icons")}>
          <span>
            <BsArrowLeft size={24} />
          </span>
          <span>
            <BsArrowRight size={24} />
          </span>
        </div>
        <div className={cx("search")}>
          <Search />
        </div>
      </div>
      {/* <div>dang nhap</div> */}
    </div>
  );
};

export default Header;
