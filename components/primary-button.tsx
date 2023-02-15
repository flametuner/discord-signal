import Link from "next/link";


type PrimaryButtonProps = {
    href?: string,
    children?: React.ReactNode,
    className?: string
    onClick?: () => void
}
export function PrimaryButton({ href, children, className, onClick }: PrimaryButtonProps) {

    const button = <button onClick={onClick} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}>
        {children}
    </button>;

    if (href) return <Link href={href}>{button}</Link>
    return button;
}