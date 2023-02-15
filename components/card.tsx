


export function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={`bg-slate-200 rounded min-h-fit text-gray-700 break-words ${className}`}>
        {children}
    </div>
}