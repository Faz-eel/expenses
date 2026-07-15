import { prisma } from '@/lib/prisma';
import { getOrCreateUser } from '@/lib/user';
import ExpenseTable from './expenseTable';

export default async function ExpenseList({ period, categories }) {
    const user = await getOrCreateUser();

    const expenses = await prisma.expense.findMany({
        where: {
            userId: user.id,
            ...(period && {
                date: {
                    gte: period.start,
                    lt: period.end,
                },
            }),
            ...(categories?.length && {
                category: { in: categories },
            }),
        },
        orderBy: { date: 'desc' },
    })

    const data = expenses.map((expense) => ({
        description: expense.description,
        amount: expense.amount.toNumber(),
        category: expense.category,
        date: expense.date.toLocaleDateString(),
    }))

    return <ExpenseTable data={data} />
}