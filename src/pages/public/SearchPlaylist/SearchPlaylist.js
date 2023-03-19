import React, { useEffect, useState } from "react";
import styles from "./SearchPlaylist.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { apiGetListArtist } from "../../../apis";
import { SectionItem } from "../../../components";
const cx = classNames.bind(styles);

const SearchPlayList = () => {
  const { searchData } = useSelector((state) => state.music);
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetListArtist(searchData?.top.alias);
      if (res.data.err === 0) {
        setPlaylist(res.data.data.sections[1]);
      }
    };
    fetch();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("list_item")}>
        {playlist &&
          playlist?.items?.length > 0 &&
          playlist.items?.map((item, index) => (
            <SectionItem
              key={item.encodeId}
              title={item.title}
              link={item.link}
              sortDescription={item.sortDescription}
              thumbnailM={item.thumbnailM}
              artistsNames={item.artistsNames}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPlayList;
