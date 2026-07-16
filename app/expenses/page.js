import { Suspense } from "react";
import ExpenseList from "@/components/expenseList";
import ExpenseFilters from "@/components/expenseFilters";
import { ExpenseTableSkeleton } from "@/components/expenseTable";
import { getPeriodRange } from "@/lib/period";
import styles from "./page.module.css";

export default async function ExpensePage({ searchParams }) {
    const params = await searchParams;

    const year = params.year ? Number(params.year) : undefined;
    const month = params.month ? Number(params.month) : undefined;
    const day = params.day ? Number(params.day) : undefined;
    const categories = params.categories ? params.categories.split(',').filter(Boolean) : undefined;

    const period = getPeriodRange({ year, month, day });

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Suspense fallback={<div className={styles.filtersSkeleton} />}>
                    <ExpenseFilters />
                </Suspense>
                <Suspense fallback={<ExpenseTableSkeleton />}>
                    <ExpenseList period={period} categories={categories} />
                </Suspense>
            </main>
        </div>
    )
}