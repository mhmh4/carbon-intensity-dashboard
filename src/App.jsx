import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.carbonintensity.org.uk/intensity"
        );
        const intensity = await response.json();
        console.log(intensity.data[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}
