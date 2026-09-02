import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  actionHref?: string;
  actionLabel?: string;
}

export function ErrorBanner({ message, actionHref, actionLabel }: ErrorBannerProps) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-start gap-3 text-sm">
      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-red-300">{message}</p>
        {actionHref && actionLabel && (
          <Link href={actionHref} className="text-amber-400 font-semibold hover:text-amber-300">
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
