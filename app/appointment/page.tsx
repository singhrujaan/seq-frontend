"use client";
import { bookAppointment } from "@/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AppointmentBookingPage = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    serviceType: "Salon Service", // Default to Salon Service
  });
  const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);
  const [userService, setUserService] = useState({ serviceId: 0 });
  const pathname = usePathname();
  const searchparams = useSearchParams();

  useEffect(() => {
    console.log(searchparams.get("name"));
    setUserService({
      serviceId: Number(searchparams.get("id")),
    });
  }, [pathname, searchparams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceTypeClick = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      serviceType: value,
    }));
    setIsServiceTypeOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { ...formData, ...userService };
    const createBook = await bookAppointment(data)

  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Appointment Booking</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-bold mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-gray-700 font-bold mb-2"
            >
              Time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              // @ts-ignore
              onChange={handleInputChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Time</option>
              {/* You can generate time options dynamically here */}
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:30 AM">10:30 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              {/* Add more time options as needed */}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="serviceType"
              className="block text-gray-700 font-bold mb-2"
            >
              Service Type
            </label>
            <div className="relative">
              <div
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                onClick={() => setIsServiceTypeOpen(!isServiceTypeOpen)}
              >
                {formData.serviceType}
              </div>
              {isServiceTypeOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-b-lg border-gray-200 shadow-lg">
                  <div className="py-1">
                    <div
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                      onClick={() => handleServiceTypeClick("Home Service")}
                    >
                      Home Service
                    </div>
                    <div
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                      onClick={() => handleServiceTypeClick("Salon Service")}
                    >
                      Salon Service
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;
