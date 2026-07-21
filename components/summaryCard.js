import { Suspense } from "react";
import styles from "./summaryCard.module.css";

async function TotalAmount({ totalPromise }) {
    const total = await totalPromise;
    return <h3 className={styles.total}>${total}</h3>;
}

async function BudgetLabel({ budgetPromise }) {
    const budget = await budgetPromise;
    return <span className={styles.stat}>Budget: ${budget}</span>;
}

async function RemainingLabel({ totalPromise, budgetPromise }) {
    const [total, budget] = await Promise.all([totalPromise, budgetPromise]);
    const remainingAmount = Math.max(budget - total, 0);
    return <span className={styles.stat}>Remaining: ${remainingAmount}</span>;
}

async function UsageBar({ totalPromise, budgetPromise }) {
    const [total, budget] = await Promise.all([totalPromise, budgetPromise]);
    const used = budget > 0 ? Math.min((total / budget) * 100, 100) : 0;
    const remainingPercent = Math.max(100 - used, 0);
    return <progress className={styles.progress} value={remainingPercent} max={100}></progress>;
}

async function UsedPercent({ totalPromise, budgetPromise }) {
    const [total, budget] = await Promise.all([totalPromise, budgetPromise]);
    const used = budget > 0 ? Math.min((total / budget) * 100, 100) : 0;
    return <span className={styles.stat}>{used.toFixed(2)}% Used</span>;
}

export default function SummaryCard({ totalPromise, budgetPromise, daysLeft }) {
    return (
        <div className={styles.card}>
            <div className={styles.heading}>
                <p className={styles.stat}>Total Spent This Month</p>
                <Suspense fallback={<span className={styles.skeletonTotal} />}>
                    <TotalAmount totalPromise={totalPromise} />
                </Suspense>
            </div>
            <div className={styles.footing}>
                <div className={styles.meta}>
                    <Suspense fallback={<span className={styles.skeletonText} />}>
                        <BudgetLabel budgetPromise={budgetPromise} />
                    </Suspense>
                    <Suspense fallback={<span className={styles.skeletonText} />}>
                        <RemainingLabel totalPromise={totalPromise} budgetPromise={budgetPromise} />
                    </Suspense>
                </div>

                <Suspense fallback={<span className={styles.skeletonBar} />}>
                    <UsageBar totalPromise={totalPromise} budgetPromise={budgetPromise} />
                </Suspense>

                <div className={styles.meta}>
                    <Suspense fallback={<span className={styles.skeletonText} />}>
                        <UsedPercent totalPromise={totalPromise} budgetPromise={budgetPromise} />
                    </Suspense>
                    <span className={styles.stat}>{daysLeft} Days left</span>
                </div>
            </div>
        </div>
    )
}
