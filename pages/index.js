import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>convert-datetime-to-cloudwatch-cron-expression</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
