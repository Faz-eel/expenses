import styles from "./page.module.css";
import Summary from "@/components/summary";
import AddExpenseButton from "@/components/addExpenseButton";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Summary />
        <Dashboard />
      </main>
    </div>
  );
}
