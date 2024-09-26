import { Link } from "react-router-dom";

export function MapList() {
    return (
        <div id="mapList">
            <h1>Maps</h1>
            <ul>
                <li><Link to="/map/janthir_wilds">Janthir Wilds</Link></li>
                    <ul>
                        <li><Link to="/map/lowland_shore">Lowland Shore</Link></li>
                        <li><Link to="/map/janthir_syntri">Janthir Syntri</Link></li>
                    </ul>
                <li>
                    Secrets of the Obscure
                    <ul>
                        <li><Link to="/map/skywatch">Skywatch Archipelago</Link></li>
                        <li>Amnytas</li>
                        <li>Nayos</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}