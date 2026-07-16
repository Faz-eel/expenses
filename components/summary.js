import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";
import SummaryCard from "./summaryCard";

export default function Summary() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const userPromise = getOrCreateUser();

    const totalPromise = userPromise
        .then(user => prisma.expense.aggregate({
            where: {
                userId: user.id,
                date: {
                    gte: startOfMonth,
                    lt: startOfNextMonth,
                },
            },
            _sum: { amount: true },
        }))
        .then(total => total._sum.amount?.toNumber() ?? 0);

    const budgetPromise = userPromise.then(user => user.monthlyBudget.toNumber());

    const daysLeft = Math.ceil((startOfNextMonth - now) / (1000 * 60 * 60 * 24)) - 1;

    return (
        <>
            <SummaryCard totalPromise={totalPromise} budgetPromise={budgetPromise} daysLeft={daysLeft} />
        </>
    )
}