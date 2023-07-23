export function formatDate(datetime) {
    const date = new Date(datetime);
    const now = new Date();

    const timeDiff = now - date;
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
    const oneYear = 365 * oneDay;

    if (timeDiff < oneDay) {
        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
        }).toLowerCase();
    } else if (timeDiff < oneWeek) {
        return date.toLocaleTimeString([], { weekday: "short" });
    } else if (timeDiff < oneYear) {
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } else {
        return date.toLocaleDateString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }
}
