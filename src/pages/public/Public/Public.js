import React, { useState } from "react";
import styles from "./Public.module.scss";
import classNames from "classnames/bind";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Loading } from "../../../components/Library/Audio";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  PlaySong,
  SidebarLeft,
  SidebarRight,
} from "../../../components";
import { scrollTopHeader } from "../../../store/actions/homeAction";
const cx = classNames.bind(styles);
const Public = () => {
  const [isShowSidebarRight, setIsShowSidebarRight] = useState(false);

  const location = useLocation();
  const params = useParams();
  //declare redux
  const dispatch = useDispatch();
  const { isLoading, scrollTop } = useSelector((state) => state.app);
  const { currentSongId } = useSelector((state) => state.music);
  //handle functional
  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      dispatch(scrollTopHeader(false));
    } else if (e.target.scrollTop >= 200) {
      dispatch(scrollTopHeader(true));
    } else {
      dispatch(scrollTopHeader(false));
    }
  };
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("sidebarLeft")}>
          <SidebarLeft />
        </div>
        <div className={cx("content")}>
          {/* neu loading true thi moi hien loading */}
          {isLoading && (
            <div className={cx("loading")}>
              <Loading />
            </div>
          )}
          <div
            className={cx(
              `${
                location?.pathname === "/" ||
                location.pathname.split("/")[1] === "album" ||
                location.pathname.split("/")[1] === "playlist" ||
                location.pathname === "/tim-kiem/tat-ca" ||
                location.pathname === "/tim-kiem/bai-hat" ||
                location.pathname === "/tim-kiem/playlist" ||
                location.pathname === "/tim-kiem/artist" ||
                location.pathname === "/mymusic" ||
                location.pathname === "/follow" ||
                location.pathname === "/radio"
                  ? "header"
                  : "header_artists"
              }`,
              `${scrollTop ? "slide-bottom" : ""}`
            )}
          >
            <Header />
          </div>
          {/* <div style={{ height: "90px", width: "100%" }}></div> */}
          <div className={cx("outlet")}>
            <Scrollbars
              onScroll={handleScroll}
              autoHide
              style={{ width: "100%", height: "100%" }}
            >
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowSidebarRight && (
          <div className={cx("sidebarRight", "slide-left")}>
            <SidebarRight />
          </div>
        )}
      </div>
      <div className={cx("play_song")}>
        {currentSongId && (
          <PlaySong
            setIsShowSidebarRight={setIsShowSidebarRight}
            isShowSidebarRight={isShowSidebarRight}
          />
        )}
      </div>
    </div>
  );
};

export default Public;
