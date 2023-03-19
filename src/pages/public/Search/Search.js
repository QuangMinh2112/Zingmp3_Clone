import React from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { NavLink, Outlet } from "react-router-dom";
import { searchMenu } from "../../../utils/menu";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);
const notActiveStyle = {
  cursor: "pointer",
};
const activeStyle = {
  cursor: "pointer",
  borderBottom: "2px solid #0f7070",
  height: "53px",
  display: "flex",
  alignItems: "center",
};
const Search = () => {
  const { keyword } = useSelector((state) => state.music);
  return (
    <div className={cx("container")}>
      <div className={cx("search_title")}>
        <span className={cx("search_result")}>Kết Quả Tìm Kiếm</span>
        <div className={cx("search_list")}>
          {searchMenu.map((item) => (
            <NavLink
              key={item.text}
              to={`${item.path}?q=${keyword}`}
              style={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.text}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Search;
