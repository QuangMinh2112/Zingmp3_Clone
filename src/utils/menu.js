import icons from "./icons";

const { RxDisc, RiLineChartLine, BsMusicNoteBeamed, AiOutlineStar } = icons;
export const sidebarMenu = [
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
];
export const sidebarMenuBottom = [
  {
    path: "moi-phat-hanh",
    title: "Nhạc mới",
    icons: <BsMusicNoteBeamed size={17} />,
  },

  {
    path: "top100",
    title: "Top 100",
    icons: <AiOutlineStar size={17} />,
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
