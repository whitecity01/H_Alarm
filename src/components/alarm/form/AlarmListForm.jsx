import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlarmItemForm from "./AlarmItemForm";
import { LOAD_VALUE } from "constants/alarm";
import "styles/alarm/alarmListForm.scss";

const AlarmListForm = ({
  alarms,
  alarmSelected,
  setAlarmSelected,
  isLoadable,
}) => {
  const [observer, setObserver] = useState(null);
  const navigater = useNavigate();
  const target = useRef();
  const observeTargetId =
    alarms.length < LOAD_VALUE
      ? alarms.length === 0
        ? -1
        : alarms[alarms.length - 1].id
      : alarms[alarms.length - LOAD_VALUE].id;

  useEffect(() => {
    setObserver(
      new IntersectionObserver(
        ([entry], observer) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            navigater(`/alarm`);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0,
        }
      )
    );
    return () => setObserver((observer) => observer.disconnect());
  }, [navigater]);

  useEffect(() => {
    if (target.current && observer && isLoadable) {
      observer.observe(target.current);
    }
  }, [alarms, isLoadable, observer]);

  const List = () =>
    alarms.map((alarm) => (
      <AlarmItemForm
        ref={alarm.id === observeTargetId ? target : null}
        key={alarm.id}
        setAlarmSelected={setAlarmSelected}
        data={alarm}
        isEdit={alarm.id === alarmSelected}
      />
    ));

  return (
    <div id="list" className="alarmList-list">
      <List />
    </div>
  );
};

export default AlarmListForm;
