import { Suspense } from "react";
import ExpenseList from "@/components/expenseList";
import { ExpenseTableSkeleton } from "@/components/expenseTable";
import styles from "./page.module.css";

export default function ExpensePage() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Suspense fallback={<ExpenseTableSkeleton />}>
                    <ExpenseList />
                </Suspense>
            </main>
        </div>
    )
}