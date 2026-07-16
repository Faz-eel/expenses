import MonthlyChart from "./chart";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";

export default async function Dashboard() {
    const user = await getOrCreateUser();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);


    const monthly = await prisma.expense.groupBy({
        by: ['category'],
        where: {
            userId: user.id,
            date: {
                gte: startOfMonth,
                lt: startOfNextMonth,
            },
        },
        _sum: { amount: true },
    })

    const data = monthly.map(g => ({ category: g.category, total: g._sum.amount.toNumber() }))

    return (
        <MonthlyChart chartType='bar' data={data}/>
    )
}