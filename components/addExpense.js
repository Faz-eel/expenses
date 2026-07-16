'use client'

import { useEffect, useRef } from "react";
import SubmitAction from "@/lib/submitAction";
import { useActionState } from "react";
import SubmitButton from "./submitButton";
import styles from "./addExpense.module.css";

export default function AddExpense({ onClose }) {
    const [formState, formAction] = useActionState(SubmitAction, null)

    const dialog = useRef();

    useEffect(() => {
        dialog.current.showModal();
    }, [])

    return (
        <dialog ref={dialog} className={styles.dialog} onClose={onClose}>
            <h2 className={styles.title}>Add Expense</h2>
            <form className={styles.form} action={formAction}>
                <div className={styles.field}>
                    <label htmlFor="amount">Amount</label>
                    <input id="amount" name="amount" type="number" step="0.01" min="0" defaultValue={formState?.data?.amount} required />
                    {formState?.errors?.amount && (
                        <span className={styles.error}>{formState.errors.amount}</span>
                    )}
                </div>
                <div className={styles.field}>
                    <label htmlFor="description">Description</label>
                    <input id="description" name="description" type="text" defaultValue={formState?.data?.description} />
                    {formState?.errors?.description && (
                        <span className={styles.error}>{formState.errors.description}</span>
                    )}
                </div>
                <div className={styles.field}>
                    <label htmlFor="category">Category</label>
                    <input id="category" name="category" type="text" defaultValue={formState?.data?.category} />
                    {formState?.errors?.category && (
                        <span className={styles.error}>{formState.errors.category}</span>
                    )}
                </div>
                <div className={styles.field}>
                    <label htmlFor="date">Date</label>
                    <input id="date" name="date" type="date" defaultValue={formState?.data?.date} required />
                    {formState?.errors?.date && (
                        <span className={styles.error}>{formState.errors.date}</span>
                    )}
                </div>
                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.cancel}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <SubmitButton className={styles.submit} />
                </div>
            </form>
        </dialog>
    )
}