'use client'

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./expenseFilters.module.css";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function ExpenseFiltersForm({ years, categories }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [year, setYear] = useState(searchParams.get('year') ?? '');
    const [month, setMonth] = useState(searchParams.get('month') ?? '');
    const [day, setDay] = useState(searchParams.get('day') ?? '');
    const [selectedCategories, setSelectedCategories] = useState(
        () => searchParams.get('categories')?.split(',').filter(Boolean) ?? []
    );

    function toggleCategory(category) {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    }

    function handleSearch() {
        const params = new URLSearchParams();
        if (year) params.set('year', year);
        if (month) params.set('month', month);
        if (day) params.set('day', day);
        if (selectedCategories.length) params.set('categories', selectedCategories.join(','));

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }

    return (
        <div className={styles.filters}>
            <div className={styles.dateFilters}>
                <select className={styles.select} value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">Year</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>

                <select className={styles.select} value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((label, index) => (
                        <option key={label} value={index + 1}>{label}</option>
                    ))}
                </select>

                <select className={styles.select} value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Day</option>
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                <button
                    type="button"
                    className={styles.searchButton}
                    onClick={handleSearch}
                    disabled={isPending}
                >
                    {isPending ? "Searching…" : "Search"}
                </button>
            </div>

            {categories.length > 0 &&
            <div className={styles.categoryFilters}>
                {categories.map(category => (
                    <button
                        key={category}
                        type="button"
                        className={selectedCategories.includes(category) ? styles.categoryActive : styles.category}
                        onClick={() => toggleCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            }
        </div>
    )
}
