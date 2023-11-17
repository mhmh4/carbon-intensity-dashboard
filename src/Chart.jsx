import { useEffect, useState } from "react";

export default function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    const BASE_URL = `https://api.carbonintensity.org.uk/intensity/date/${currentDate}/`;
    const urls = [];
    for (let i = 1; i <= 48; i++) {
      urls.push(BASE_URL + i);
    }

    (async () => {
      await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          const d = await response.json();
          console.log(d);
          setData((currData) => {
            return [...currData, d.data[0].intensity.forecast];
          });
        })
      );
    })();
  }, []);

  return (
    <>
      {data.map((value) => {
        return <div>{value}</div>;
      })}
    </>
  );
}
