import AlarmPage, {
  action as alarmPageAction,
  loader as alarmPageLoader,
} from "pages/alram/AlarmPage";
import MyPage, { action as mypageAction } from "pages/mypage/MyPage";

const alarm = [
  {
    path: "alarm",
    element: <AlarmPage />,
    action: alarmPageAction,
    loader: alarmPageLoader,
  },
  {
    path: "mypage",
    element: <MyPage />,
    action: mypageAction,
  },
];

export default alarm;
