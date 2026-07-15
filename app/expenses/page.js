import ExpenseList from "@/components/expenseList";
import AddExpenseButton from "@/components/addExpenseButton";
import styles from "./page.module.css";

export default function ExpensePage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <AddExpenseButton />
                <ExpenseList />
            </main>
        </div>
    )
}