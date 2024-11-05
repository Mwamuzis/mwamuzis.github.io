// Calculate task duration in a human-readable format
export function taskDurationTime(startTime, endTime) {
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);

    // Calculate the difference in milliseconds
    const durationMs = endTimeDate - startTimeDate;

    // Check if duration is negative (endTime is before startTime)
    if (durationMs < 0) return "Invalid time range";

    // Convert milliseconds to time components
    const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    // Format the result as a string
    let durationString = "";
    if (days > 0) durationString += `${days}d `;
    if (hours > 0 || days > 0) durationString += `${hours}h `;
    durationString += `${minutes}m`;

    return durationString.trim(); // Remove any trailing spaces
}
