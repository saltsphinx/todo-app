import { Outlet } from "react-router-dom"
import Header from "../components/Header"

export default function Root() {
    return (
    <>
        <Header username={"monkminker"} />  
        <main>
            <Outlet />
        </main>
    </>);
};