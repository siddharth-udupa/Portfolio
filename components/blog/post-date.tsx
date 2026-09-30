import { formatDate } from "@/lib/format";

export function PostDate({ date }: { date: Date | string }) {
  return <time dateTime={new Date(date).toISOString()}>{formatDate(date)}</time>;
}
