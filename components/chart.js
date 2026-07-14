'use client'

import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, PieChart, Pie, Sector, Tooltip, Legend } from "recharts"
import styles from "./chart.module.css"

export default function MonthlyChart({ data, chartType }) {
    const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444"]

    if (chartType === 'pie') {
        return (
            <div className={styles.card}>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            dataKey="total"
                            nameKey="category"
                            label
                            shape={(props) => <Sector {...props} fill={COLORS[props.index % COLORS.length]} />}
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
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}