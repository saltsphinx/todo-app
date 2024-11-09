import { Link } from "react-router-dom"

export default function Header({ username }) {
    return (
        <header>
            <nav>
                <ul>
                    <li className="brand-logo">
                        <Link to="/">Todo App</Link>
                    </li>
                    <li>
                        Logout
                    </li>
                    <li>
                        <Link to="/">{ username }</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}