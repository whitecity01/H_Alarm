import AlarmPage, {
  action as alarmPageAction,
  loader as alarmPageLoader,
} from "pages/alram/AlarmPage";
import MyPage from "pages/mypage/MyPage";

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
  },
];

export default alarm;
