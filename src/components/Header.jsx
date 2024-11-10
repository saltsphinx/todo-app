import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <header>
      <nav>
        <ul
          className="d-flex p-0 py-3 border-bottom pb-3"
          style={{ listStyle: "none" }}
        >
          <li className=" me-auto">
            <Link className="navbar-brand fw-bold" to="/">
              Todo App
            </Link>
          </li>
          <li className="me-2">Logout</li>
          <li>
            <Link to="/">{username}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
