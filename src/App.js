import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Public,
  Login,
  Album,
  ZingChart,
  Search,
  SearchSong,
  SearchAllSong,
  SearchPlaylist,
  Singer,
  MyMusic,
  Top100,
  NewMusic,
  Follow,
  Radio,
  ArtistOA,
} from "./pages/public";
import { getHome, setCurrentWidth } from "./store/actions/homeAction";
import path from "./utils/path";
import { WeeRank } from "./components";
import { apiGetChartHome } from "./apis";
function App() {
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState(null);
  const [currentWidthScreen, setCurrentWidthScreen] = useState(
    window.innerWidth
  );
  useEffect(() => {
    dispatch(getHome());
    const fetchApiWeekChart = async () => {
      const res = await apiGetChartHome();

      if (res.data.err === 0) {
        setWeekChart(res.data.data.weekChart);
      }
    };
    fetchApiWeekChart();
  }, []);
  const setWidth = (e) => {
    setCurrentWidthScreen(e.target.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", setWidth);

    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  useEffect(() => {
    dispatch(setCurrentWidth(currentWidthScreen));
  }, [currentWidthScreen]);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.ALBUM_TITLE_ID} element={<Album />} />
          <Route path={path.PLAYLIST_TITLE_ID} element={<Album />} />
          <Route path={path.MY_MUSIC} element={<MyMusic />} />
          <Route path={path.TOP100} element={<Top100 />} />
          <Route path={path.NEW_MUSIC} element={<NewMusic />} />
          <Route path={path.RADIO} element={<Radio />} />
          <Route path={path.FOLLOW} element={<Follow />} />

          <Route
            path={path.WEE_RANK_TITLE_ID}
            element={
              <WeeRank weekChart={weekChart && Object.values(weekChart)} />
            }
          />
          <Route path={path.ZING_CHART} element={<ZingChart />} />
          <Route path={path.HOME_SINGER} element={<Singer />} />
          <Route path={path.SEARCH} element={<Search />}>
            <Route path={path.SEARCH_ALL} element={<SearchAllSong />} />
            <Route path={path.SEARCH_SONGS} element={<SearchSong />} />
            <Route path={path.SEARCH_PLAYLIST} element={<SearchPlaylist />} />
            <Route path={path.ARTISTS_OA} element={<ArtistOA />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
