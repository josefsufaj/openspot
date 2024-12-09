import {useEffect, useState} from "react";
import './App.css';

import Map from "./Components/Map/Map";
import Taskbar from "./Components/Taskbar/Taskbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Spots from "./Components/Spots/Spots";

function App() {
    const [activeMenu, setActiveMenu] = useState("Map")
    const [spots, setSpots] = useState([])

    useEffect(() => {
    }, [spots]);

    const addSpot = (spot) => {
        setSpots((prevSpots) => [...prevSpots, spot]);
    };

    const updateSpot = (id, updatedDetails) => {
        setSpots((prevSpots) =>
            prevSpots.map((spot) => (spot.id === id ? { ...spot, ...updatedDetails } : spot))
        );
    };

    const removeSpot = (id) => {
        setSpots((prevSpots) => prevSpots.filter((spot) => spot.id !== id));
    };

    const onMenuChange = (menu) => {
        switch(menu) {
            case "Map":
                setActiveMenu("Map")
                break
            case "Dashboard":
                setActiveMenu("Dashboard")
                break
            case "Spots":
                setActiveMenu("Spots")
                break
            default:
                break
        }
    }

    const renderActiveMenu = () => {
        switch (activeMenu) {
            case "Map":
                return <Map
                    spots={spots}
                    setSpots={setSpots}
                    addSpot={addSpot}
                    updateSpot={updateSpot}
                    removeSpot={removeSpot}
                />;
            case "Dashboard":
                return <Dashboard />;
            case "Spots":
                return <Spots spots={spots}/>;
            default:
                return <Map
                    spots={spots}
                    setSpots={setSpots}
                    addSpot={addSpot}
                    updateSpot={updateSpot}
                    removeSpot={removeSpot}
                />;
        }
    };

  return (
    <div>
        {renderActiveMenu()}
        <Taskbar onMenuChange={onMenuChange}/>
    </div>
  );
}

export default App;
