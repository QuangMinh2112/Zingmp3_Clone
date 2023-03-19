import React from "react";
import styles from "./SidebarLeft.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/logo.svg";
import path from "../../utils/path";
import { NavLink, useNavigate } from "react-router-dom";
import { sidebarMenu, sidebarMenuBottom } from "../../utils/menu";

const cx = classNames.bind(styles);
const notActiveStyle = {
  display: "flex",
  color: "#32323D",
  fontWeight: 800,
  fontSize: "13px",
  gap: "12px",
  padding: "10px 25px",
  alignItems: "center",
};
const activeStyle = {
  display: "flex",
  color: "#438f8f",
  fontWeight: 800,
  fontSize: "13px",
  gap: "12px",
  padding: "10px 25px",
  alignItems: "center",
  background: "hsla(0,0%,100%,0.3)",
  borderLeft: "3px solid",
};

const SidebarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className={cx("container")}>
      <div className={cx("images")} onClick={() => navigate(path.HOME)}>
        <img src={logo} alt="logo" className={cx("logo")} />
        <img
          className={cx("logo_responsive")}
          src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.8/static/media/icon_zing_mp3_60.f6b51045.svg"
          alt="logo"
        />
      </div>
      <div className={cx("wrapper_nav_item")}>
        <div className={cx("sidebar_top")}>
          {sidebarMenu.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              style={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.icons}
              <span className={cx("title")}>{item.title}</span>
            </NavLink>
          ))}
        </div>
        <div className={cx("sidebar_divide")}></div>
        <div className={cx("sidebar_bottom")}>
          {sidebarMenuBottom.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              style={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.icons}
              <span className={cx("title")}>{item.title}</span>
            </NavLink>
          ))}
          <div className={cx("vip_banner_sidebar")}>
            <div className={cx("text")}>
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </div>
            <a href="/" className={cx("upgrade_VIP")}>
              Nâng cấp VIP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
