export const getDate  = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = currentDate.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return {
        date: `${year}-${formattedMonth}-${formattedDay}`
    };
}

export const formatDate = (date) => {
    const postDate = new Date(date);
    const now = new Date();
    const timeDifference = now - postDate;

    if (timeDifference < 60000) { // Less than 1 minute
        return 'Just Now';
    } else if (timeDifference < 3600000) { // Less than 1 hour
        const minutesDifference = Math.floor(timeDifference / 60000);
        return minutesDifference === 1 ? '1 minute ago' : `${minutesDifference} minutes ago`;
    } else if (timeDifference < 86400000) { // Less than 1 day
        const hoursDifference = Math.floor(timeDifference / 3600000);
        return hoursDifference === 1 ? '1 hour ago' : `${hoursDifference} hours ago`;
    } else if (timeDifference < 604800000) { // Less than 1 week
        const daysDifference = Math.floor(timeDifference / 86400000);
        return daysDifference === 1 ? '1 day ago' : `${daysDifference} days ago`;
    } else {
        // Display the actual date in the format 'DD MMM YYYY'
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return postDate.toLocaleDateString(undefined, options);
    }
};

