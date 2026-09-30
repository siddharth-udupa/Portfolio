import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const proseClassName = [
  "max-w-none leading-7",
  "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight",
  "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight",
  "[&_p]:my-4",
  "[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4",
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6",
  "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_li]:my-1",
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em]",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_table]:my-6 [&_table]:w-full [&_table]:text-left [&_table:text-sm",
  "[&_th]:border-b [&_th]:p-2 [&_th]:font-semibold",
  "[&_td]:border-b [&_td]:p-2",
  "[&_img]:my-6 [&_img]:rounded-lg",
  "[&_hr]:my-8",
].join(" ");

export function Prose({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(proseClassName, className)} {...props} />;
}
