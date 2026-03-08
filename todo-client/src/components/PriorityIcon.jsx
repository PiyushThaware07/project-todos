import { FcHighPriority } from "react-icons/fc";

export function PriorityIcon({ priority }) {
  if (priority === "high") {
    return <FcHighPriority className="inline-block" />;
  }
  return null;
}