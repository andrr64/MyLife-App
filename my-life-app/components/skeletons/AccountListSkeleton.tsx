// components/skeletons/AccountListSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function AccountListSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                        {/* Icon Skeleton */}
                        <Skeleton className="h-9 w-9 rounded-md" />
                        <div className="space-y-2">
                            {/* Name Skeleton */}
                            <Skeleton className="h-4 w-24" />
                            {/* Number Skeleton */}
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                    {/* Amount Skeleton */}
                    <Skeleton className="h-5 w-20" />
                </div>
            ))}
        </div>
    )
}