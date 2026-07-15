'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./nav.module.css"

export default function Nav() {
    const pathname = usePathname()

    return (
        <nav className={styles.nav}>
            <Link
                href="/"
                className={pathname === "/" ? styles.linkActive : styles.link}
            >
                Dashboard
            </Link>
            <Link
                href="/expenses"
                className={pathname === "/expenses" ? styles.linkActive : styles.link}
            >
                Expenses
            </Link>
        </nav>
    )
}
