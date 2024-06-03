import { useBlueBird } from "../../contexts/AppContext"
import TripleSwitch from "./TripleSwitch/TripleSwitch"

function Navbar() {
    const {socketRef} = useBlueBird();
    return (
        
        <div className="navbar">
            <TripleSwitch />
        </div>
    )
}

export default Navbar
