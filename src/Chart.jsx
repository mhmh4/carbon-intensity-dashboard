import { useEffect, useState } from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart({ date }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);

    const BASE_URL = `https://api.carbonintensity.org.uk/intensity/date/${date}/`;
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
      <LineChart
        width={1000}
        height={250}
        data={data.map((value, index) => {
          return { name: String(index), expected: value };
        })}
      >
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line isAnimationActive={false} dataKey="expected" />
      </LineChart>
    </>
  );
}
