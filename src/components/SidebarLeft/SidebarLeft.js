import React from "react";
import styles from "./SidebarLeft.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/logo.svg";
import path from "../../utils/path";
import { NavLink, useNavigate } from "react-router-dom";
import { sidebarMenu, sidebarMenuBottom } from "../../utils/menu";
import { toast } from "react-toastify";
import icons from "../../utils/icons";
const {
  BsPlayCircle,
  FaBroadcastTower,
  MdOutlineFeed,
  HiOutlineViewGridAdd,
  MdMusicVideo,
} = icons;
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
  const handleNotification = () => {
    toast.warn("Tính năng này chưa được phát triển vui lòng thử lại sau !");
  };

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
          <span className={cx("custom")} onClick={handleNotification}>
            <span>
              <BsPlayCircle size={17} />
            </span>
            <span className={cx("title")}>Cá Nhân</span>
          </span>
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
          <span className={cx("custom")} onClick={handleNotification}>
            <span>
              <FaBroadcastTower size={17} />
            </span>
            <span className={cx("title")}>Radio</span>
          </span>
          <span className={cx("custom")} onClick={handleNotification}>
            <span>
              <MdOutlineFeed size={17} />
            </span>
            <span className={cx("title")}>Theo dõi</span>
          </span>
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
          <span className={cx("custom")} onClick={handleNotification}>
            <span>
              <HiOutlineViewGridAdd size={17} />
            </span>
            <span className={cx("title")}>Thể loại</span>
          </span>
          <span className={cx("custom")} onClick={handleNotification}>
            <span>
              <MdMusicVideo size={17} />
            </span>
            <span className={cx("title")}>MV</span>
          </span>
          <div className={cx("vip_banner_sidebar")}>
            <div className={cx("text")}>
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </div>
            <span className={cx("upgrade_VIP")} onClick={handleNotification}>
              NÂNG CẤP VIP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
