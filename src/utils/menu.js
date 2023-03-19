import icons from "./icons";

const {
  BsPlayCircle,
  RxDisc,
  FaBroadcastTower,
  RiLineChartLine,
  MdOutlineFeed,
  BsMusicNoteBeamed,
  HiOutlineViewGridAdd,
  AiOutlineStar,
  MdMusicVideo,
} = icons;
export const sidebarMenu = [
  {
    path: "mymusic",
    title: "Cá nhân",
    icons: <BsPlayCircle size={17} />,
    component: false,
  },
  {
    path: "",
    title: "Khám phá",
    icons: <RxDisc size={20} />,
    component: true,
  },
  {
    path: "zing-chart",
    title: "#zingchart",
    icons: <RiLineChartLine size={17} />,
    component: true,
  },
  {
    path: "radio",
    title: "Radio",
    icons: <FaBroadcastTower size={17} />,
    component: false,
  },
  {
    path: "follow",
    title: "Theo dõi",
    icons: <MdOutlineFeed size={17} />,
    component: false,
  },
];
export const sidebarMenuBottom = [
  {
    path: "moi-phat-hanh",
    title: "Nhạc mới",
    icons: <BsMusicNoteBeamed size={17} />,
  },
  {
    path: "hub",
    title: "Thể loại",
    icons: <HiOutlineViewGridAdd size={17} />,
  },
  {
    path: "top100",
    title: "Top 100",
    icons: <AiOutlineStar size={17} />,
  },
  {
    path: "mv",
    title: "MV",
    icons: <MdMusicVideo size={17} />,
  },
];
export const searchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },
  {
    path: "bai-hat",
    text: "BÀI HÁT",
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
  },
  {
    path: "artist",
    text: "NGHỆ SĨ/OA",
  },
];
