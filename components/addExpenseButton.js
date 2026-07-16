'use client'

import AddExpense from "./addExpense"
import Modal from "./Modal"
import { useState } from "react"
import styles from "./addExpenseButton.module.css"

export default function AddExpenseButton() {
    const [modalMount, setModalMount] = useState(false);

    function onOpenDialog() {
        setModalMount(true);
    }

    function closeDialog() {
        setModalMount(false);
    }

    return (
        <>
            <button className={styles.addButton} onClick={onOpenDialog}>
                <svg className={styles.addIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            {modalMount &&
            <Modal>
                <AddExpense onClose={closeDialog}/>
            </Modal>
            }
        </>
    )
}