import "../CSS/components/Header.css"

interface HeaderProps {
    children: string
    className?: string;
}

export default function Header(props: HeaderProps) {
    return (
        <div className={ props.className + " header-container" }>
            <h1 className="header-text">{ props.children }</h1>
        </div>
    )
}