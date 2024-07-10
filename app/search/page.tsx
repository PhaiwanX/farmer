"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from "../main.layout";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import * as utm from 'utm'; 
export default function Search() {
    const [farmers, setFarmers] = useState([]);
    const [query, setQuery] = useState('');

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAiMUHa_2W5yKRSjon5PaaWvl5obLH03pY", // Add your Google Maps API key here
    });

    function convertUtmToLatLon(easting: number, northing: number) {
        const { latitude, longitude } = utm.toLatLon(easting, northing, 47, "W");
        return { lat: latitude, lng: longitude };
    }

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const response = await axios.get(`/api/farmer${query ? `?q=${query}` : ''}`);
                setFarmers(response.data);
            } catch (error) {
                console.error('Error fetching farmers:', error);
            }
        };

        fetchFarmers();
    }, [query]);

    const handleInputChange = (event: any) => {
        setQuery(event.target.value);
    };

    return (
        <MainLayout>
            <div className="px-2 md:px-96 my-5">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <MagnifyingGlassIcon className="h-6 w-6" />
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="ค้นหาพื้นที่"
                        value={query}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                        {farmers.map((farmer: any, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border">
                                <div className="px-6 py-3">
                                    {isLoaded && (
                                        <GoogleMap
                                            zoom={15}
                                            mapTypeId="satellite"
                                            center={convertUtmToLatLon(parseFloat(farmer.location_x), parseFloat(farmer.location_y))}
                                            mapContainerClassName="map"
                                            mapContainerStyle={{ width: "100%", height: "300px", margin: "auto" }}
                                        >
                                            <Marker position={convertUtmToLatLon(parseFloat(farmer.location_x), parseFloat(farmer.location_y))} />
                                        </GoogleMap>
                                    )}

                                    <h2 className="text-xl font-semibold mb-2">{farmer.fullname}</h2>
                                    <p className="text-sm text-gray-600">{farmer.phone_number}</p>
                                    <p className="text-sm mb-2">กลุ่ม : {farmer.group}</p>
                                    <p className='text-sm -mb-2'>
                                        {farmer.address_no} หมู่ {farmer.address_group} ตำบล{farmer.address_subdistrict} อำเภอ{farmer.address_district}
                                    </p>
                                    <br />
                                    <hr />
                                    <p className="text-xs text-center mt-3 text-gray-600 mb-2">
                                        X: {farmer.location_x} , Y: {farmer.location_y} , ( {farmer.location_amount} ไร่ )
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
