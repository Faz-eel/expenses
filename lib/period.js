export function getPeriodRange({ year, month, day }) {
    if (!year) return undefined;

    if (!month) {
        return { start: new Date(year, 0, 1), end: new Date(year + 1, 0, 1) };
    }

    if (!day) {
        return { start: new Date(year, month - 1, 1), end: new Date(year, month, 1) };
    }

    return { start: new Date(year, month - 1, day), end: new Date(year, month - 1, day + 1) };
}
