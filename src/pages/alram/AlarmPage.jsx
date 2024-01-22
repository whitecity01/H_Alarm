import { redirect } from "react-router-dom";
import { boxingAlarmData, unBoxingAlarmData } from "utils/alarm";
import {
  deleteAlarm,
  updateAlarm,
  createAlarm,
  readAlarm,
} from "services/alarm/alarm";
import { useAlarmList } from "store/alarm";
import {
  ALL_LOAD,
  CREATE_ALARM,
  LOAD_MULTIPLE,
  LOAD_SINGLE,
  REMOVE_ALARM,
  UPDATE_ALARM,
  EMPTY_ALARM_LIST,
  LOAD_VALUE,
} from "constants/alarm";
import AlarmLayout from "components/alarm/AlarmLayout";

const AlarmPage = () => {
  return <AlarmLayout />;
};

export default AlarmPage;

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const curList = useAlarmList.getState().alarmList;
  const id = url.searchParams.has("id")
    ? Number(url.searchParams.get("id"))
    : null;
  const type = url.searchParams.has("type")
    ? Number(url.searchParams.get("type"))
    : null;
  const requestType = ((id, curList, type) => {
    if (curList.length === 0) return ALL_LOAD;
    if (id === null) return LOAD_MULTIPLE;
    switch (type) {
      case CREATE_ALARM:
      case REMOVE_ALARM:
      case UPDATE_ALARM:
        return LOAD_SINGLE;
      default:
        return LOAD_MULTIPLE;
    }
  })(id, curList, type);

  const requestId =
    requestType === ALL_LOAD ? EMPTY_ALARM_LIST :
    requestType === LOAD_MULTIPLE ? curList[curList.length - 1].id
    : id;

  try {
    console.log("id: "+String(requestId)+"   type: "+String(requestType));
    const data = (await readAlarm(requestId, requestType)).map((dt) =>
      unBoxingAlarmData(dt)
    );
    console.log(data);
    useAlarmList.getState().setAlarmList((() => {
      switch (requestType) {
        case LOAD_SINGLE:
          if (data.length === 0) return curList.filter((data) => data.id === requestId)
          const index = curList.findIndex((data) => data.id === requestId);
          const temp = data[0];
          if (index === -1){
            const newList = curList.filter((a) => a.order < temp.order || (a.order === temp.order && a.id < temp.id));
            return [...newList, temp]
          };
          curList[index] = temp;
          return curList;
        case LOAD_MULTIPLE:
          return [...curList, ...data.slice(1)];
        case ALL_LOAD:
          return data;
        default:
          return curList;
      }
    })());
    console.log(useAlarmList.getState().alarmList);

    return {
      curAlarmId: requestId,
      isLoadable:
        requestType !== LOAD_SINGLE && data.length < LOAD_VALUE ? false : true,
    };
  } catch (err) {
    alert(err);
    return {
      curAlarmId: null,
      isLoadable: true,
    };
  }
};

export const action = async ({ request }) => {
  const url = new URL(request.url);
  const data = await request.formData();
  const type = Number(data.get("type"));
  const days = data.get("days");
  const day = days.trim().length !== 0 ? days.split(",") : [];
  const form = boxingAlarmData({
    id: data.get("id"),
    date: {
      year: data.get("year"),
      month: data.get("month"),
      day: data.get("day"),
    },
    time: {
      hour: data.get("hour"),
      minute: data.get("minute"),
      isAm: data.get("am"),
    },
    isRepeat: data.get("isRepeat"),
    name: data.get("name"),
    message: data.get("message"),
    method: data.get("method"),
    isActive: data.get("isActive"),
    day,
  });

  try {
    switch(type){
      case CREATE_ALARM:  
        form.id = (await createAlarm(form)).id;
        console.log(form.id);
        break;
      case UPDATE_ALARM:
        await updateAlarm(form);
        break;
      case REMOVE_ALARM:
        await deleteAlarm(form.id);
        break;
      default:
        throw new Error("잘못된 요청");
    }
    url.searchParams.append("id", form.id);
    url.searchParams.append("type", type);
  } catch (err) {
    alert(err);
  }

  return redirect(url);
};
