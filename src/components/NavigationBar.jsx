import { Link } from "react-router"

const NavigationBar = () => {
    return (
        <nav className="navbar flex justify-center bg-emerald-900">
            <Link to="/" className="btn btn-ghost text-stone-300">Home</Link>
            <Link to="register" className="btn btn-ghost text-stone-300">Knygos registracija</Link>
        </nav>
    )
}

export default NavigationBar;