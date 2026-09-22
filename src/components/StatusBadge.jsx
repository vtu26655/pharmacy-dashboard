function StatusBadge({ status }) {
  const formattedStatus = status
    ? status.replaceAll("_", " ")
    : "UNKNOWN";

  return (
    <span
      className={`status-badge ${
        status?.toLowerCase() || "unknown"
      }`}
    >
      {formattedStatus}
    </span>
  );
}

export default StatusBadge;