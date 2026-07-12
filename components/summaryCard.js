import styles from "./summaryCard.module.css";

export default function SummaryCard({ header, stat }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.header}>{header}</h3>
            <p className={styles.stat}>{stat}</p>
        </div>
    )
}