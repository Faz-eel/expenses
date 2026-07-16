import { Suspense } from "react";
import styles from "./page.module.css";
import Summary from "@/components/summary";
import AddExpenseButton from "@/components/addExpenseButton";
import Dashboard from "@/components/dashboard";
import { currentUser } from "@clerk/nextjs/server";

async function Greeting() {
  const user = await currentUser();
  const username = user?.username ?? user?.firstName;

  return (
    <span className={styles.greeting}>
      <span>Hello, {username}</span>
      <span>Track your expenses this month</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Suspense
            fallback={
              <span className={styles.greeting}>
                <span className={styles.skeletonLineLg} />
                <span className={styles.skeletonLineSm} />
              </span>
            }
          >
            <Greeting />
          </Suspense>
          <AddExpenseButton />
        </div>
        <Summary />
        <Suspense fallback={<div className={styles.chartSkeleton} />}>
          <Dashboard />
        </Suspense>
      </main>
    </div>
  );
}
