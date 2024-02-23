"use client";

import Gallery from "@/components/Gallery";
import { ServiceProps } from "@/types";
import { fetchService, fetchServices } from "@/utils";
import { snakeCaseToHumanReadable } from "@/utils/functions";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Services({ params }: any) {
  const [service, setService] = useState<ServiceProps>();
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const getService = async (id: number) => {
    const response = await fetchService(id);
    const data = await response.data;

    return data;
  };
  useEffect(() => {
    getService(params.services).then((result) => {
      setService(result);
    });
  }, [params.services]);
  return (
    <div className="">
      
      <div className="relative h-80 md:h-80  lg:h-screen pt-96">
        <Image src="/overlaps.jpg" alt="Example Image" fill={true} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold text-white">
            {service?.serviceName}
          </h1>
          <p className="text-lg mt-2 text-white">for the bride</p>
          <button
            type="button"
            className="relative top-2 right-2 z-10 w-fit p-2 bg-purple-700 rounded-full "
            // onClick={closeModal}
          >
            Book Appointment
          </button>
        </div>
      </div>

      <div className="flex justify-center  my-5">
        <div className="w-screen lg:w-2/3 px-3">
          {service?.serviceDescription}
        </div>
        <div className="hidden sm:block md:hidden xsm:hidden lg:block w-1/3 mx-auto px-2">
          <Gallery />
        </div>
      </div>
      <div className="w-[90%] sm:block lg:hidden mx-auto">
        <Gallery />
      </div>
    </div>
  );
}
