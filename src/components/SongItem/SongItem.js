import React from "react";
import styles from "./SongItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import {
  play,
  setCurrentSongId,
  setRecentSong,
} from "../../store/actions/musicAction";
const cx = classNames.bind(styles);

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  id,
  order,
  percent,
  style,
  size,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={cx("container", `${style || "black_color"}`)}
      onClick={() => {
        dispatch(setCurrentSongId(id));
        dispatch(play(true));
        dispatch(
          setRecentSong({
            thumbnail,
            title,
            id,
            artists,
          })
        );
      }}
    >
      {order && (
        <span
          className={cx(
            "num_order",
            `${
              order === 1
                ? "blue_number"
                : order === 2
                ? "green_number"
                : order === 3
                ? "orange_number"
                : "default_color_number"
            }`
          )}
        >
          {order}
        </span>
      )}
      <img
        src={thumbnail}
        alt="logo"
        className={cx("thumbnail", `${size || "img_medium"}`)}
      />
      <div className={cx("description")}>
        <span style={{ fontSize: "14px", fontWeight: "700" }}>
          {title?.length > 20 ? `${title?.slice(0, 20)}...` : title}
        </span>
        <span className={cx("artists")}>
          {artists?.length > 20 ? `${artists?.slice(0, 20)}...` : artists}
        </span>
        {releaseDate && (
          <span
            style={{
              fontSize: "12px",
              opacity: "0.7",
            }}
          >
            {moment(releaseDate * 1000).fromNow()}
          </span>
        )}
      </div>
      {percent && <span style={{ fontWeight: "bold" }}>{`${percent}%`}</span>}
    </div>
  );
};

export default SongItem;
