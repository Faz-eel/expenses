'use client'

import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, PieChart, Pie, Sector, Tooltip, Legend } from "recharts"
import styles from "./chart.module.css"
import { useState } from "react"

export default function MonthlyChart({ data }) {
    const [chartType, setChartType] = useState('pie');

    const COLORS = [
        "#6366f1", "#f59e0b", "#10b981", "#ef4444",
        "#3b82f6", "#a855f7", "#ec4899", "#14b8a6",
        "#84cc16", "#f97316",
    ]

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
                    <Bar dataKey="total" fill="#124a2c" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}