export function amountValidator(amount) {
    const value = Number(amount);
    if (!amount || Number.isNaN(value) || value <= 0) {
        return false;
    }
    return true;
}

export function dateValidator(date) {
    if (!date || Number.isNaN(Date.parse(date))) {
        return false;
    }
    return true;
}

export function descriptionValidator(description) {
    if (!description || !description.trim() || description.trim().length > 255) {
        return false;
    }
    return true;
}

export function categoryValidator(category) {
    if (!category || !category.trim() || category.trim().length > 100) {
        return false;
    }
    return true;
}
