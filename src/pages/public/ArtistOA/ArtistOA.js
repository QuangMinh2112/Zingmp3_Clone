import React, { useEffect, useState } from "react";
import styles from "./ArtistOA.modoule.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Artists, SectionItem } from "../../../components";
import { apiGetListArtist } from "../../../apis";
const cx = classNames.bind(styles);

const ArtistOA = () => {
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
        {searchData &&
          searchData?.artists?.length > 0 &&
          searchData.artists
            .filter((item, index) => index <= 4)
            ?.map((item, index) => (
              <Artists
                key={item.id}
                thumbnail={item.thumbnail}
                name={item.name}
                totalFollow={item.totalFollow}
                link={item.link}
              />
            ))}
      </div>
    </div>
  );
};

export default ArtistOA;
