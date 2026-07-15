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
            <button className={styles.addButton} onClick={onOpenDialog}>ADD EXPENSE</button>
            {modalMount &&
            <Modal>
                <AddExpense onClose={closeDialog}/>
            </Modal>
            }
        </>
    )
}