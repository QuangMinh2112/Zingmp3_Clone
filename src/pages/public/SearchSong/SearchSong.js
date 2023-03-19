import React, { useEffect } from "react";
import styles from "./SearchSong.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { getSearchSongs } from "../../../store/actions/musicAction";

import { ListSong } from "../../../components/ListSong";
const cx = classNames.bind(styles);

const SearchSong = () => {
  const { searchData } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchSongs(searchData?.top?.id));
  }, [searchData]);
  return (
    <div className={cx("container")}>
      <ListSong isHideTime isHideAlbum />
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default SearchSong;
