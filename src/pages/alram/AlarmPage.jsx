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
    //console.log("id: "+String(requestId)+"   type: "+String(requestType));
    const data = (await readAlarm(requestId, requestType)).map((dt) =>
      unBoxingAlarmData(dt)
    );
    //console.log(curList);
    //console.log(data)
    useAlarmList.getState().setAlarmList((() => {
      switch (requestType) {
        case LOAD_SINGLE:
          if (data.length === 0) return curList.filter((a) => a.id !== requestId)
          const temp = data[0];
          const newList = curList.filter((a) => a.id !== temp.id && (a.order < temp.order || (a.order === temp.order && a.id < temp.id)));
          return [...newList, temp]
        case LOAD_MULTIPLE:
          return [...curList, ...data.slice(1)];
        case ALL_LOAD:
          return data;
        default:
          return curList;
      }
    })());

    return {
      curAlarmId: type === REMOVE_ALARM ? null : requestId,
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
  url.search="";
  const data = await request.formData();
  const type = Number(data.get("type"));
  const days = data.get("days");
  const day = days.trim().length !== 0 ? days.split(",") : [];
  //console.log("year: "+ data.get("year") + " month:"+ data.get("month") +" day: "+ data.get("day")+" hour:"+ data.get("hour")+" min:"+ data.get("minute")+" am:"+data.get("isAm"));
  const form = boxingAlarmData({
    id: Number(data.get("id")),
    date: {
      year: Number(data.get("year")),
      month: Number(data.get("month")),
      day: Number(data.get("day")),
    },
    time: {
      hour: Number(data.get("hour")),
      minute: Number(data.get("minute")),
      isAm: data.get("isAm") === "true",
    },
    isRepeat: data.get("isRepeat") === "true",
    name: data.get("name"),
    message: data.get("message"),
    method: data.get("method"),
    isActive: data.get("isActive") === "true",
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
