import React, { useState } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import path from "../../utils/path";
import { useDispatch } from "react-redux";
import { search } from "../../store/actions/musicAction";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
const { TfiSearch, VscClose } = icons;
const cx = classNames.bind(styles);

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singer } = useParams();
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      dispatch(search(keyword));
      navigate({
        pathname: `${path.SEARCH}/${path.SEARCH_ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };
  return (
    <div className={cx("container")}>
      {keyword && (
        <span className={cx("clearSeach_value")} onClick={() => setKeyword("")}>
          <VscClose />
        </span>
      )}
      <span
        className={cx(
          "search_icons",
          `${singer ? "bg_input_search_artists" : "bg_input_search"}`
        )}
      >
        <TfiSearch size={20} />
      </span>
      <input
        type="text"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        onKeyUp={handleSearch}
        className={cx(
          `${singer ? "bg_input_search_artists" : "bg_input_search"}`
        )}
      />
    </div>
  );
};

export default Search;
