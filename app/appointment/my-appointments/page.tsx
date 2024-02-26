// pages/appointments/index.tsx
"use client";
import { myAppointments, cancelAppointment } from "@/utils";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<any>([]);

  // Function to book appointment
  const bookAppointment = async () => {
    const myBookings = await myAppointments();
    const data = myBookings?.data?.data;
    data &&
      Object.values(data).map((value: any, index: number) => {
        setAppointments((prev: any) => [...value]);
        console.log(index, "valll");
      });
  };

  const cancelMyAppointment = async (id: number) => {
    const cancelApi = await cancelAppointment(id);
    console.log(cancelApi, "cancelap");
  };

  useMemo(() => {
    bookAppointment();
  }, []);

  console.log(appointments, "appointmens");
  const toggleAccordion = (index: number) => {
    setAppointments((prevAppointments: any) => {
      return prevAppointments.map((appointment: any, i: number) => {
        if (i === index) {
          return { ...appointment, isOpen: !appointment.isOpen };
        }
        return appointment;
      });
    });
  };
  return (
    <div className="container mx-auto px-4 py-8 mt-28">
      <h1 className="text-4xl font-bold text-center mb-8">My Appointments</h1>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments:</h2>
        <ul>
          {appointments?.length > 0 ? (
            appointments?.map((appointment: any, index: number) => (
              <li key={index} className="bg-gray-100 rounded-md mb-4 shadow-md">
                <div
                  className="flex justify-between items-center cursor-pointer p-4"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg">{appointment?.serviceType}</span>
                  <span className="text-lg">
                    {appointment.Services[0].serviceName}
                  </span>
                  <span className="text-lg">
                    Rs.{" " + appointment.Services[0].servicePrice}
                  </span>
                  <span
                    className="text-lg"
                    onClick={() => cancelAppointment(appointment?.id)}
                  >
                    X
                  </span>
                  <span>{appointment.isOpen ? "-" : "+"}</span>
                </div>
                {appointment.isOpen && (
                  <div className="p-4 bg-white">
                    {/* Additional details for appointment */}
                    <p>Date: {appointment?.appointmentDate}</p>
                    <p>Time: {appointment?.appointmentTime}</p>
                    {/* Add more details here */}
                  </div>
                )}
              </li>
            ))
          ) : (
            <div>You currently dont have any appointments</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentsPage;
