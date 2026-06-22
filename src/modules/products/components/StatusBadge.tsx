import { cn } from "@/shared/lib/utils";

export default function StatusBadge({ status }: { status: "active" | "inactive" }) {
  return (
    <small
      className={cn(
        "py-0.5 px-2 rounded-full w-fit font-medium",
        status === "active" && "bg-green-200 text-green-700",
        status === "inactive" && "bg-red-200 text-red-700",
      )}
    >
      {status}
    </small>
  );
}
