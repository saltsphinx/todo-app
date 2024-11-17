import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <section className="ms-auto me-auto pt-5" style={{width: "fit-content"}}>
            <h1>Sign up</h1>
            <form>
                <div>
                    <label className="d-block mb-1 user-select-none" htmlFor="username">Username</label>
                    <input className="mb-2" type="text" id="username" name="username" />
                </div>
                <div>
                    <label className="d-block mb-1 user-select-none" htmlFor="email">Email</label>
                    <input className="mb-2" type="email" id="email" name="email" />
                </div>
                <div>
                    <label className="d-block mb-1 user-select-none" htmlFor="password">Password</label>
                    <input className="mb-3" type="password" id="password" name="password" />
                </div>
                <input className="btn btn-primary w-100" type="submit" value="Sign up" />
            </form>
            <span className="small text-secondary">Have an account already? <Link to="/login">Login</Link></span>
        </section>
    );
}