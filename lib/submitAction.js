"use server"

import { prisma } from "./prisma"
import { getOrCreateUser } from "./user"
import { redirect } from "next/navigation"
import { amountValidator, dateValidator, descriptionValidator, categoryValidator } from "./validate"

export default async function SubmitAction(prevState, formData) {
    const data = {
        amount: formData.get('amount'),
        description: formData.get('description'),
        category: formData.get('category'),
        date: formData.get('date')
    }

    const errors = {}
    if (!amountValidator(data.amount)) {
        errors.amount = "Enter a valid amount greater than 0"
    }
    if (!dateValidator(data.date)) {
        errors.date = "Enter a valid date"
    }
    if (!descriptionValidator(data.description)) {
        errors.description = "Enter a description (255 characters max)"
    }
    if (!categoryValidator(data.category)) {
        errors.category = "Enter a category (100 characters max)"
    }

    if (Object.keys(errors).length > 0) {
        return { data, errors }
    }

    const user = await getOrCreateUser();

    await prisma.expense.create({
        data: {
        ...data,
        date: new Date(data.date),
        userId: user.id,
        },
    });

    redirect('/');
}