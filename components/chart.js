'use client'

import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, PieChart, Pie, Sector, Tooltip, Legend } from "recharts"
import styles from "./chart.module.css"
import { useState } from "react"

export default function MonthlyChart({ data }) {
    const [chartType, setChartType] = useState('pie');

    const COLORS = [
        "#8b9cff", "#f59e0b", "#60a5fa", "#ef4444",
        "#3b82f6", "#a855f7", "#ec4899", "#14b8a6",
        "#94a3b8", "#f97316",
    ]

    if (!data.length) {
        return (
            <div className={styles.card}>
                <div className={styles.empty}>
                    <p className={styles.emptyTitle}>No expenses to show</p>
                    <p className={styles.emptyText}>Add an expense to see your spending breakdown here.</p>
                </div>
            </div>
        )
    }

    if (chartType === 'pie') {
        const pieData = data.map((entry, index) => ({
            ...entry,
            fill: COLORS[index % COLORS.length],
        }))

        return (
            <div className={styles.card}>
                <select
                    className={styles.select}
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                >
                    <option value="pie">Pie</option>
                    <option value="bar">Bar</option>
                </select>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            dataKey="total"
                            nameKey="category"
                            label
                            shape={(props) => <Sector {...props} />}
                        />
                        <Tooltip formatter={(total) => `$${total}`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }

    return (
        <div className={styles.card}>
            <select
                className={styles.select}
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
            >
                <option value="pie">Pie</option>
                <option value="bar">Bar</option>
            </select>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Bar dataKey="total" fill="#8b9cff" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}