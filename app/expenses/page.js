import ExpenseList from "@/components/expenseList";
import styles from "./page.module.css";

export default function ExpensePage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <ExpenseList />
            </main>
        </div>
    )
}