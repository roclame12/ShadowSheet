import "../CSS/components/Header.css"

interface HeaderProps {
    text: string;
    className?: string;
}

export default function Header(props: HeaderProps) {
    return (
        <div className={ props.className + " header-container" }>
            <h1 className="header-text">{ props.text }</h1>
        </div>
    )
}