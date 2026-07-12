import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";
import SummaryCard from "./summaryCard";
import styles from "./summary.module.css";

export default async function Summary() {
    const user = await getOrCreateUser();

    const total = await prisma.expense.aggregate({
        where: { userId: user.id },
        _sum: { amount: true },
    })

    const grouped = await prisma.expense.groupBy({
        by: ['category'],
        where: { userId: user.id},
        _sum: { amount: true },
        orderBy: { _sum: { amount: 'desc' } },
        take: 1,
    })

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);


    const monthly = await prisma.expense.aggregate({
        where: {
            userId: user.id,
            date: {
                gte: startOfMonth,
                lt: startOfNextMonth,
            },
        },
        _sum: { amount: true },
    })

    const totalAmount = total._sum.amount?.toNumber() ?? 0;
    const monthlyAmount = monthly._sum.amount?.toNumber() ?? 0;
    const topCategory = grouped[0]?.category ?? "None";

    return (
        <div className={styles.summary}>
            <SummaryCard header="Total Spent" stat={`$${totalAmount.toFixed(2)}`} />
            <SummaryCard header="This Month" stat={`$${monthlyAmount.toFixed(2)}`} />
            <SummaryCard header="Top Category" stat={topCategory} />
        </div>
    )
}