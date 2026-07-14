import Image from "next/image";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import styles from "./page.module.css";
import Summary from "@/components/summary";
import AddExpenseButton from "@/components/addExpenseButton";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <main className={styles.main}>
        <Summary />
        <Dashboard />
        <AddExpenseButton />
      </main>
    </div>
  );
}
