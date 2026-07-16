import styles from "./expenseTable.module.css";

const SKELETON_ROWS = 5;

export function ExpenseTableSkeleton() {
    return (
        <>
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                        <tr key={index}>
                            <td><span className={styles.skeletonBar} /></td>
                            <td><span className={styles.skeletonBar} /></td>
                            <td><span className={styles.skeletonBar} /></td>
                            <td><span className={styles.skeletonBar} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.cards}>
            {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                <div className={styles.card} key={index}>
                    <div className={styles.cardTop}>
                        <span className={styles.skeletonBar} />
                        <span className={styles.skeletonBar} />
                    </div>
                    <div className={styles.cardMeta}>
                        <span className={styles.skeletonBar} />
                        <span className={styles.skeletonBar} />
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default function ExpenseTable({ data = [] }) {
    return (
        <>
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>${item.amount}</td>
                            <td>{item.category}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.cards}>
            {data.map((item, index) => (
                <div className={styles.card} key={index}>
                    <div className={styles.cardTop}>
                        <span className={styles.cardDescription}>{item.description}</span>
                        <span className={styles.cardAmount}>${item.amount}</span>
                    </div>
                    <div className={styles.cardMeta}>
                        <span>{item.category}</span>
                        <span>{item.date}</span>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}