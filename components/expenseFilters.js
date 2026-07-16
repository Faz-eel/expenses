import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";
import ExpenseFiltersForm from "./expenseFiltersForm";

/* Needed for listing only the years and categories in database*/

export default async function ExpenseFilters() {
    const user = await getOrCreateUser();

    const [dateRange, categoryRows] = await Promise.all([
        prisma.expense.aggregate({
            where: { userId: user.id },
            _min: { date: true },
            _max: { date: true },
        }),
        prisma.expense.findMany({
            where: { userId: user.id },
            select: { category: true },
            distinct: ['category'],
            orderBy: { category: 'asc' },
        }),
    ]);

    const minYear = dateRange._min.date?.getFullYear();
    const maxYear = dateRange._max.date?.getFullYear();
    const years = minYear && maxYear
        ? Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i)
        : [];

    const categories = categoryRows.map(row => row.category);

    return <ExpenseFiltersForm years={years} categories={categories} />;
}
