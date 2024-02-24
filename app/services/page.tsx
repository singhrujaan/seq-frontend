"use client";
import { ServiceProps } from "@/types";
import { fetchServices } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ServicePage = () => {
  const router = useRouter();
  const [allServices, setAllServices] = useState([]);
  const fetch = async () => {
    const data = await fetchServices();
    setAllServices(data.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  console.log(allServices);

  const bookService = (id: number,name:string) => {
    router.push(`/appointment?id=${id}&name=${name}`);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Our Service</h2>
        <div className=" flex flex-col gap-6 flex-wrap">
          {allServices ? (
            allServices?.map((service: ServiceProps) => (
              <div
                className={`flex justify-between py-4 px-6 border rounded-lg focus:outline-none focus:shadow-outline `}
              >
                <div>{service.serviceName}</div>
                <button
                  type="button"
                  className="relative text-white top-2 right-2 z-10 w-fit p-2 bg-purple-700 rounded-full"
                  onClick={() => bookService(service.id,service.serviceName)}
                >
                  Book appointment
                </button>
              </div>
            ))
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
