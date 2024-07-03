import Link from "next/link";

export default function Header() {
    return (
        <div className="header-sec">
            <div className="logo">CRM</div>
            <nav className="nav-bar">
                <Link href="/" className="nav-links">Home</Link>
                <Link href="/" className="nav-links">About</Link>
                <Link href="/" className="nav-links">Service</Link>
                <Link href="/" className="nav-links">Projects</Link>
                <Link href="/" className="nav-links">Contact</Link>
                <div className="nav-btns">
                    <Link href="/client-login" className="uni-btns">Login</Link>
                    <Link href="/client-register" className="uni-btns">Register</Link>
                </div>
            </nav>
        </div>
    )
}
