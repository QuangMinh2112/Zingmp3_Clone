import React, { useEffect, useState } from "react";
import styles from "./SidebarRight.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";
import SongItem from "../SongItem/SongItem";
import { apiGetDetailPlaylist } from "../../apis/music";
import { Scrollbars } from "react-custom-scrollbars-2";

const cx = classNames.bind(styles);
const { BsTrash } = icons;
const SidebarRight = () => {
  const [isActive, setIsActive] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const {
    currentSongData,
    currentSongId,
    currentAlbumId,
    isPlaying,
    recentSongs,
  } = useSelector((state) => state.music);

  const fetchDetailsPlaylist = async () => {
    const res = await apiGetDetailPlaylist(currentAlbumId);
    if (res?.data?.err === 0) {
      setPlaylist(res?.data?.data?.song?.items);
    }
  };
  useEffect(() => {
    currentAlbumId && fetchDetailsPlaylist();
  }, []);

  useEffect(() => {
    if (currentAlbumId && isPlaying) {
      fetchDetailsPlaylist();
    }
  }, [currentAlbumId, isPlaying]);
  useEffect(() => {
    isPlaying && setIsActive(false);
  }, [isPlaying, currentSongId]);
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("level_left")}>
          <span
            className={cx("list", `${!isActive && "active"}`)}
            onClick={() => setIsActive((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={cx("listent_near", `${isActive && "active"}`)}
            onClick={() => setIsActive((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span title="Xóa danh sách phát" className={cx("bin")}>
          <BsTrash size={16} />
        </span>
      </div>
      {isActive ? (
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          {currentSongData ? (
            <div className={cx("body")}>
              {recentSongs &&
                recentSongs.map((item, index) => (
                  <SongItem
                    key={index}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    artists={item.artists}
                    id={item.id}
                    size="img_small"
                  />
                ))}
              <div style={{ width: "100%", height: "90px" }}></div>
            </div>
          ) : (
            <span style={{ color: "red" }}>Danh sách nghe gần đây trống !</span>
          )}
        </Scrollbars>
      ) : (
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          {currentSongData ? (
            <div className={cx("body")}>
              <SongItem
                thumbnail={currentSongData?.thumbnail}
                title={currentSongData?.title}
                artists={currentSongData?.artistsNames}
                id={currentSongData?.encodeId}
                img_small
                style="bg_green"
                size="img_small"
              />
              <div className={cx("next_song")}>
                <span className={cx("title")}>Tiếp theo</span>
                <span className={cx("subtitle")}>
                  <span>Từ playlist</span>
                  <span style={{ fontWeight: "bold", color: "#0f7070" }}>
                    {" "}
                    {`${currentSongData?.album?.title}`}
                  </span>
                </span>
              </div>
              <div className={cx("list_songs")}>
                {playlist &&
                  playlist.map((item) => (
                    <SongItem
                      key={item.encodeId}
                      id={item.encodeId}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      artists={item.artistsNames}
                      size="img_small"
                    />
                  ))}
              </div>
            </div>
          ) : (
            <span style={{ color: "red" }}>Danh sách bài hát trống !</span>
          )}
        </Scrollbars>
      )}
    </div>
  );
};

export default SidebarRight;
