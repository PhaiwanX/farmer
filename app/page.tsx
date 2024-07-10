"use client"
import Link from 'next/link';
import MainLayout from './main.layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import * as utm from 'utm';

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);

  function convertUtmToLatLon(easting: number, northing: number) {
    const { latitude, longitude } = utm.toLatLon(easting, northing, 47, "W");
    return { lat: latitude, lng: longitude };
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAiMUHa_2W5yKRSjon5PaaWvl5obLH03pY", // Replace with your actual API key
  });

  useEffect(() => {
    // Fetching farmers' locations from your API endpoint
    const fetchFarmers = async () => {
      try {
        const response = await axios.get(`/api/farmer`);
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <MainLayout>
      <main className="container mx-auto px-4 py-3">
        <div className="flex flex-col lg:space-x-5 items-center justify-center">
          <div className="lg:w-2/12">
            <div className="mt-2 flex flex-col gap-5 p-5">
              <Link href="/admin" className="bg-pink-500 text-white py-2 px-4 rounded text-center">
                บันทึกข้อมูลเกษตรกร
              </Link>
              <Link href="/search" className="bg-pink-500 text-white py-2 px-4 rounded text-center">
                ค้นหาข้อมูลเกษตรกร
              </Link>
            </div>
          </div>
          <div className="lg:w-10/12 lg:ml-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
                ความหนาแน่นของพื้นที่ดินเค็ม ตำบลหนองกรวด อำเภอด่านขุนทด จังหวัดนครราชสีมา
              </h2>
              <GoogleMap
                zoom={13}
                center={{ lat: 15.36398, lng: 101.6957511 }}
                mapContainerClassName="map"
                mapContainerStyle={{ width: "100%", height: "600px", margin: "auto" }}
              >
                {locations.map((locate: any, index: number) => {
                  const easting = parseFloat(locate.location_x);
                  const northing = parseFloat(locate.location_y);
                  const position = convertUtmToLatLon(easting, northing);

                  return position ? (
                    <Marker
                      key={index}
                      position={position}
                      onClick={() => setSelectedFarmer(locate)}
                    />
                  ) : null;
                })}

                {selectedFarmer && (
                  <InfoWindow
                    position={convertUtmToLatLon(parseFloat(selectedFarmer.location_x), parseFloat(selectedFarmer.location_y))}
                    onCloseClick={() => setSelectedFarmer(null)}
                  >
                    <div>
                      <h2>{selectedFarmer.fullname}</h2>
                      <p>{selectedFarmer.phone_number}</p>
                      <p>{selectedFarmer.group}</p>
                      <p>{`${selectedFarmer.address_no} หมู่ ${selectedFarmer.address_group} ตำบล${selectedFarmer.address_subdistrict} อำเภอ${selectedFarmer.address_district}`}</p>
                      <p>{`พืช ${selectedFarmer.plant}`}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};
export default Home;
