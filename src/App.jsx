import { useEffect, useState } from "react";

import Chart from "./Chart";
import CurrentTime from "./CurrentTime";

export default function App() {
  const [intensity, setIntensity] = useState({});

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.carbonintensity.org.uk/intensity"
        );
        const intensity = await response.json();
        console.log(intensity.data[0]);
        setIntensity(intensity.data[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <CurrentTime />
      <hr />
      <h4>Current Carbon Intensity</h4>
      <div>Actual: {intensity?.intensity?.actual}</div>
      <div>Expected: {intensity?.intensity?.forecast}</div>
      <hr />
      <Chart date={currentDate} />
    </>
  );
}
