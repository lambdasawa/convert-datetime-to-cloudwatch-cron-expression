import Head from "next/head";
import { useState } from "react";
import { DateTime } from "luxon";
import styles from "../styles/Home.module.css";

function convertToCron(dateObject) {
  try {
    return DateTime.fromObject({
      year: parseInt(dateObject.year, 10),
      month: parseInt(dateObject.month, 10),
      day: parseInt(dateObject.day, 10),
      hour: parseInt(dateObject.hour, 10),
      minute: parseInt(dateObject.minute, 10),
      zone: dateObject.zone,
    })
      .setZone("UTC")
      .toFormat(`'cron('m H d M ? yyyy')'`);
  } catch (_e) {
    console.error(_e);
    return "Syntax error";
  }
}

const initialDateObject = { ...DateTime.now().toObject(), zone: "Asia/Tokyo" };

function onChange(e, dateObject, key, setDateObject, setResult) {
  const v = { ...dateObject, [key]: e.target.value };
  setDateObject(v);
  setResult(convertToCron(v));
}

export default function Home() {
  const [dateObject, setDateObject] = useState(initialDateObject);
  const [result, setResult] = useState(convertToCron(dateObject));

  return (
    <div className={styles.container}>
      <Head>
        <title>convert-datetime-to-cloudwatch-cron-expression</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          size={4}
          value={dateObject.year}
          onChange={(e) =>
            onChange(e, dateObject, "year", setDateObject, setResult)
          }
        ></input>
        <span>/</span>
        <input
          size={2}
          value={dateObject.month}
          onChange={(e) =>
            onChange(e, dateObject, "month", setDateObject, setResult)
          }
        ></input>
        <span>/</span>
        <input
          size={2}
          value={dateObject.day}
          onChange={(e) =>
            onChange(e, dateObject, "day", setDateObject, setResult)
          }
        ></input>
        <span> </span>
        <input
          size={2}
          value={dateObject.hour}
          onChange={(e) =>
            onChange(e, dateObject, "hour", setDateObject, setResult)
          }
        ></input>
        <span>:</span>
        <input
          size={2}
          value={dateObject.minute}
          onChange={(e) =>
            onChange(e, dateObject, "minute", setDateObject, setResult)
          }
        ></input>
        <span> </span>
        <input
          size={10}
          value={dateObject.zone}
          onChange={(e) =>
            onChange(e, dateObject, "zone", setDateObject, setResult)
          }
        ></input>
      </div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
