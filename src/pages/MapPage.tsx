import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapData } from "../components/Achievement";
import { Map } from "../components/Map";

export default function MapPage() {
  const { name } = useParams();
  const [mapData, setMapData] = useState<MapData>({
    name: "Loading...",
    achievements: [],
  });

  useEffect(() => {
    const fetchAchievementData = async () => {
      try {
        const mapRequest = await fetch(
          `${import.meta.env.BASE_URL}/config/${name}.json`,
        );
        const mapJson = await mapRequest.json();
        setMapData(mapJson);
      } catch (err) {
        // I guess 404?
      }
    };

    fetchAchievementData();
  }, [name]);
  return <Map mapData={mapData} />;
}
