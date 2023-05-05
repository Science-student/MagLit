import React, { useEffect } from "react";
import Head from "next/head";

const CounterAnalytics = ({ id, utcoffset, server }) => {
  useEffect(() => {
    const id = process.env.MAGLIT_COUNTER_ID;
    const utcoffset = process.env.MAGLIT_COUNTER_UTCOFFSET || "6";
    const server = process.env.MAGLIT_COUNTER_SERVER || "https://t.counter.dev";

    if (!id || sessionStorage.getItem("doNotTrack") || localStorage.getItem("doNotTrack")) {
      return;
    }

    if (
      !sessionStorage.getItem("_swa") &&
      !document.referrer.startsWith(location.protocol + "//" + location.host)
    ) {
      fetch(
        server +
          "/track?" +
          new URLSearchParams({
            referrer: document.referrer,
            screen: screen.width + "x" + screen.height,
            id: id,
            utcoffset: utcoffset,
          })
      );
    }

    sessionStorage.setItem("_swa", "1");
  }, []);

  return (
    <div>
      <Head></Head>
    </div>
  );
};

export default CounterAnalytics;
