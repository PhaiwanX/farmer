"use client";
import { UserGroupIcon, InformationCircleIcon, MapPinIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { SetStateAction, useState } from 'react';
import RootLayout from '../layout';
import MainLayout from '../main.layout';
import axios from 'axios';
import Swal from 'sweetalert2';

const Home = () => {
  const [step, setStep] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [groupFormData, setGroupFormData] = useState({ group: 'Group A' });
  const [personalFormData, setPersonalFormData] = useState({
    fullname: '',
    phone_number: '',
    id_card: '',
    address_no: '',
    address_group: '',
    address_subdistrict: '',
    address_district: '',
    plant: '',
  });
  const [locationFormData, setLocationFormData] = useState({
    location_x: '',
    location_y: '',
    location_amount: ''
  });

  const stepper = [
    {
      step: 1,
      text: "เลือกกลุ่ม",
      description: "กลุ่มของเกษตกรที่ตนเองอยู่",
      icon: UserGroupIcon
    },
    {
      step: 2,
      text: "ข้อมูลส่วนตัว",
      description: "กรอกชื่อ นามสกุล เบอร์โทร",
      icon: InformationCircleIcon
    },
    {
      step: 3,
      text: "ข้อมูลพื้นที่",
      description: "พิกัดพื้นที่ของตัวเอง",
      icon: MapPinIcon
    }
  ];
  const groups = [
    {
      name: "Group A",
    },
    {
      name: "Group B",
    },
    {
      name: "Group C",
    },
    {
      name: "Group D",
    }
  ];

  const nextStep = () => {
    if (step < stepper.length) {
      setStep(step + 1);
    }
  };

  const backStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGroupSelection = (index: any) => {
    setSelectedGroup(index);
    setGroupFormData({ group: groups[index].name });
  };

  const handlePersonalInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setPersonalFormData({ ...personalFormData, [id]: value });
  };

  const handleLocationInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setLocationFormData({ ...locationFormData, [id]: value });
  };
  const handleSubmit = async () => {
    const formData = {
      ...groupFormData,
      ...personalFormData,
      ...locationFormData
    };

    try {
      const response = await axios.post('/api/farmer', formData);

      const data: any = JSON.stringify(response.data)

      Swal.fire({
        icon: 'success',
        title: 'SYSTEM!',
        text: "บันทึกข้อมูลเรียบร้อย",
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  const renderGroupSelection = () => (
    <div className="grid grid-cols-2 gap-2 rounded-xl p-2 w-full">
      {groups.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option-${index}`}
            name="groupOption"
            value={option.name}
            className="peer hidden"
            checked={selectedGroup === index}
            onChange={() => handleGroupSelection(index)}
          />
          <label
            htmlFor={`option-${index}`}
            className={`block cursor-pointer select-none rounded-xl p-2 text-center transition-all duration-100 border ${selectedGroup === index ? 'bg-blue-500 border-blue-500 font-bold text-white' : ''}`}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return renderGroupSelection();
      case 2:
        return (
          <div className='w-full md:max-w-md'>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="fullname"
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                placeholder="ชื่อ - นามสกุล"
                value={personalFormData.fullname}
                onChange={handlePersonalInputChange}

              />
              <label
                htmlFor="firstname"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90
                peer-focus:translate-x-0.5
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500 
                peer-[:not(:placeholder-shown)]:scale-90
                peer-[:not(:placeholder-shown)]:translate-x-0.5
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                ชื่อ - นามสกุล
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                type="phone"
                id="phone_number"
                maxLength={10}
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                placeholder="เบอร์โทร"
                value={personalFormData.phone_number}
                onChange={handlePersonalInputChange}

              />
              <label
                htmlFor="phone_number"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90
                peer-focus:translate-x-0.5
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500 
                peer-[:not(:placeholder-shown)]:scale-90
                peer-[:not(:placeholder-shown)]:translate-x-0.5
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                เบอร์โทร
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="id_card"
                maxLength={10}
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                placeholder="เลขบัตรประชาชน"
                value={personalFormData.id_card}
                onChange={handlePersonalInputChange}

              />
              <label
                htmlFor="id_card"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90
                peer-focus:translate-x-0.5
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500 
                peer-[:not(:placeholder-shown)]:scale-90
                peer-[:not(:placeholder-shown)]:translate-x-0.5
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                เลขบัตรประชาชน
              </label>
            </div>
            <div className="grid grid-cols-2">
              <div className='relative w-full my-2 pr-2'>
                <input
                  type="text"
                  id="address_no"
                  className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                  placeholder="บ้านเลขที่"
                  value={personalFormData.address_no}
                  onChange={handlePersonalInputChange}

                />
                <label
                  htmlFor="address_no"
                  className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90
                peer-focus:translate-x-0.5
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500 
                peer-[:not(:placeholder-shown)]:scale-90
                peer-[:not(:placeholder-shown)]:translate-x-0.5
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-gray-500 "
                >
                  บ้านเลขที่
                </label>
              </div>
              <div className='relative w-full my-2 pl-2'>
                <input
                  type="text"
                  id="address_group"
                  className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                  placeholder="หมู่ที่"
                  value={personalFormData.address_group}
                  onChange={handlePersonalInputChange}

                />
                <label
                  htmlFor="address_group"
                  className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90
                peer-focus:translate-x-0.5
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500 
                peer-[:not(:placeholder-shown)]:scale-90
                peer-[:not(:placeholder-shown)]:translate-x-0.5
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-gray-500 "
                >
                  หมู่ที่
                </label>
              </div>
            </div>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="address_subdistrict"
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                placeholder="ตำบล"
                value={personalFormData.address_subdistrict}
                onChange={handlePersonalInputChange}

              />
              <label
                htmlFor="address_subdistrict"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90
                peer-focus:translate-x-0.5
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500 
                peer-[:not(:placeholder-shown)]:scale-90
                peer-[:not(:placeholder-shown)]:translate-x-0.5
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                ตำบล
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="address_district"
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                focus:pt-6
                focus:pb-2
                [&:not(:placeholder-shown)]:pt-6
                [&:not(:placeholder-shown)]:pb-2
                autofill:pt-6
                autofill:pb-2"
                placeholder="อำเภอ"
                value={personalFormData.address_district}
                onChange={handlePersonalInputChange}

              />
              <label
                htmlFor="address_district"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:scale-90
                peer-focus:translate-x-0.5
                peer-focus:-translate-y-1.5
                peer-focus:text-gray-500 
                peer-[:not(:placeholder-shown)]:scale-90
                peer-[:not(:placeholder-shown)]:translate-x-0.5
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                อำเภอ
              </label>
            </div>
          </div >
        );
      case 3:
        return (
          <div className='w-full md:max-w-md'>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="location_x"
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
                placeholder="พิกัด x"
                value={locationFormData.location_x}
                onChange={handleLocationInputChange}
              />
              <label
                htmlFor="location_x"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5
              peer-focus:text-gray-500 
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                พิกัด x
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="location_y"
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
                placeholder="พิกัด y"
                value={locationFormData.location_y}
                onChange={handleLocationInputChange}
              />
              <label
                htmlFor="location_y"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5
              peer-focus:text-gray-500 
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                พิกัด y
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="location_amount"
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
                placeholder="พื้นที่"
                value={locationFormData.location_amount}
                onChange={handleLocationInputChange}
              />
              <label
                htmlFor="location_amount"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5
              peer-focus:text-gray-500 
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                พื้นที่
              </label>
            </div>
            <div className="relative w-full my-2">
              <input
                type="text"
                id="plant"
                className="peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
                placeholder="พืชทีปลูก"
                value={personalFormData.plant}
                onChange={handlePersonalInputChange}
              />
              <label
                htmlFor="plant"
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
              peer-focus:scale-90
              peer-focus:translate-x-0.5
              peer-focus:-translate-y-1.5
              peer-focus:text-gray-500 
              peer-[:not(:placeholder-shown)]:scale-90
              peer-[:not(:placeholder-shown)]:translate-x-0.5
              peer-[:not(:placeholder-shown)]:-translate-y-1.5
              peer-[:not(:placeholder-shown)]:text-gray-500 "
              >
                พืชทีปลูก
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="px-2 md:px-10 lg:px-96">
        <div className="flex flex-col justify-center items-center bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 my-5">
          <ul className="flex flex-row justify-between gap-x-2 w-full">
            {stepper.map((item, index) => (
              <li key={index} className={`flex-1 group ${index === stepper.length - 1 ? 'flex-end' : ''}`}>
                <div className="flex flex-col items-center">
                  <span className={`inline-flex items-center justify-center w-10 h-10 ${step >= item.step ? 'bg-blue-100' : 'bg-gray-100'} rounded-full`}>
                    <item.icon className={`h-6 w-6 ${step >= item.step ? 'text-blue-500' : 'text-gray-800'}`} />
                  </span>
                  <div className="mt-3 text-center">
                    <span className={`block text-base font-bold ${step >= item.step ? 'text-blue-500' : 'text-gray-800'}`}>
                      {item.text}
                    </span>
                    <p className={`hidden md:block text-sm ${step >= item.step ? 'text-blue-400' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col min-h-96 justify-center items-center bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 my-5">
          {renderFormStep()}
        </div>

        <div className="flex flex-col justify-center items-center bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 my-5">
          <div className="w-full flex justify-between space-x-2">
            {step !== 1 && (
              <button onClick={backStep} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none">
                <ArrowLeftIcon className="h-5" /> ย้อนกลับ
              </button>
            )}

            {step < stepper.length ? (
              <button onClick={nextStep} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                ถัดไป <ArrowRightIcon className="h-5" />
              </button>
            ) : (
              <button onClick={handleSubmit} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                <CheckCircleIcon className="h-5" /> ส่งข้อมูล
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
