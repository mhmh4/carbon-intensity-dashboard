import { useEffect, useState } from "react";

export default function CurrentTime() {
  const options = {
    timeZone: "Europe/London",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const dateFormat = new Intl.DateTimeFormat(undefined, options);

  const [time, setTime] = useState(dateFormat.format(new Date()));

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(dateFormat.format(new Date()));
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [time]);

  return time;
}
