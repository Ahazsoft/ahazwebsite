// Used for determining the job post date and current time difference

function formatRelativeTime(dateString) {
  const postedDate = new Date(dateString);
  const today = new Date();

  // remove time portion for accurate day comparison
  postedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today - postedDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return `${diffDays} days ago`;
}

export default formatRelativeTime;
