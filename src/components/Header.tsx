import Link from "next/link";

export default function Header() {
    return (
        <div className="header-sec">
            <Link href="/" className="logo">CRM</Link>
            <nav className="nav-bar">
                <Link href="/" className="nav-links">Home</Link>
                <Link href="/about" className="nav-links">About</Link>
                <Link href="/services" className="nav-links">Services</Link>
                <Link href="/portfolio" className="nav-links">Portfolio</Link>
                <Link href="/contact-us" className="nav-links">Contact</Link>
                <div className="nav-btns">
                    <Link href="/client-login" className="uni-btns">Login</Link>
                    <Link href="/client-register" className="uni-btns">Register</Link>
                </div>
            </nav>
        </div>
    )
}
