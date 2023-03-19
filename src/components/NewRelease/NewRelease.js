import React, { useEffect, useState } from "react";
import styles from "./NewRelease.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";
import SongItem from "../SongItem/SongItem";
const cx = classNames.bind(styles);
const { BsChevronCompactRight } = icons;
const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActive, setIsActive] = useState(0);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (isActive === 0) {
      setSongs(newRelease?.items?.all);
    } else if (isActive === 1) {
      setSongs(newRelease?.items.others);
    } else {
      setSongs(newRelease?.items?.vPop);
    }
  }, [isActive, newRelease]);
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h3>{newRelease?.title}</h3>
        <span>
          TẤT CẢ <BsChevronCompactRight />
        </span>
      </div>
      <div className={cx("genre_song")}>
        <button
          onClick={() => setIsActive(0)}
          className={cx("btn", `${isActive === 0 && "active"}`)}
        >
          TẤT CẢ
        </button>
        <button
          onClick={() => setIsActive(1)}
          className={cx("btn", `${isActive === 1 && "active"}`)}
        >
          QUỐC TẾ
        </button>
        <button
          onClick={() => setIsActive(2)}
          className={cx("btn", `${isActive === 2 && "active"}`)}
        >
          VIỆT NAM
        </button>
      </div>
      <div className={cx("box_items")}>
        {songs?.map((item) => (
          <div key={item.encodeId} className={cx("song_item")}>
            <SongItem
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artistsNames}
              releaseDate={item.releaseDate}
              id={item.encodeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
