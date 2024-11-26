export const getStatusEmoji = (status: string) => {
  switch (status?.toLowerCase()) {
    case "alive":
      return "🟢";
    case "dead":
      return "🔴";
    default:
      return "⚪️";
  }
};
