'use client'

import AddExpense from "./addExpense"
import Modal from "./Modal"
import { useState } from "react"

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
            <button onClick={onOpenDialog}>ADD EXPENSE</button>
            {modalMount &&
            <Modal>
                <AddExpense onClose={closeDialog}/>
            </Modal>
            }
        </>
    )
}