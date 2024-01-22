import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AlarmListForm from "./form/AlarmListForm";
import AddAlarmForm from "./form/AddAlarmForm";
import HeaderForm from "./form/HeaderForm";
import { getEmptyAlarmData, unBoxingAlarmData } from "utils/alarm";
import { useAlarmList } from "store/alarm";
import "styles/alarm/alarmLayout.scss";

const form = unBoxingAlarmData(getEmptyAlarmData());

/**
 * Alarm 컴포넌트. 페이지를 구성하는 컴포넌트. AlarmData를 관리함
 *
 * @returns {JSX.Element} Alarm 컴포넌트를 렌더링
 */
const AlarmLayout = () => {
  const [isAddAlarm, setIsAddAlarm] = useState(false);
  const [alarmSelected, setAlarmSelected] = useState(null);
  const loaderData = useLoaderData();
  const alarmList = useAlarmList((state)=>state.alarmList);

  console.log(alarmList);
  useEffect(() => {
    if (alarmList.length === 0) {
      setIsAddAlarm(true);
    } else {
      setIsAddAlarm(false);
      setAlarmSelected(alarmList[0].id);
    }
  }, [alarmList]);

  const data = isAddAlarm
    ? form
    : alarmSelected
    ? alarmList.filter((v) => v.id === alarmSelected)[0]
    : form;


  return (
    <div className="wrap">
      <div className="container">
        <HeaderForm isAddAlarm={isAddAlarm} setIsAddAlarm={setIsAddAlarm} />
        <div className="body">
          <AddAlarmForm data={data} />
          <AlarmListForm
            alarms={alarmList}
            isLoadable={loaderData.isLoadable}
            alarmSelected={alarmSelected}
            setAlarmSelected={setAlarmSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default AlarmLayout;
