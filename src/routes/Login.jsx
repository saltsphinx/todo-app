import { Link } from "react-router-dom";

export default function Login() {
    return (
        <section className="ms-auto me-auto pt-5" style={{width: "fit-content"}}>
            <h1>Login</h1>
            <form>
                <div>
                    <label className="d-block mb-1 user-select-none" htmlFor="username">Username</label>
                    <input className="mb-2" type="text" id="username" name="username" />
                </div>
                <div>
                    <label className="d-block mb-1 user-select-none" htmlFor="password">Password</label>
                    <input className="mb-2" type="password" id="password" name="password" />
                </div>
                <div>
                    <input type="checkbox" name="remember" id="remember" />
                    <label className="text-center ms-1 mb-3 user-select-none" htmlFor="remember" id="remember">Remember me?</label>
                </div>
                <input className="btn btn-primary w-100 mb-1" type="submit" value="Login" />
            </form>
            <span className="small text-secondary">Don't have an account? <Link to="/signup">Sign up</Link></span>
        </section>
    );
}