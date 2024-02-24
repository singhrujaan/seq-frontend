import { Hero } from "@/components";
import CarCard from "@/components/CarCard";
import Carousel from "@/components/Carousel";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps, ServiceProps } from "@/types";
import { fetchServices } from "@/utils";
import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const allServices = await fetchServices();
  const isDataEmpty =
    !Array.isArray(allServices?.data) ||
    allServices?.data.length < 1 ||
    !allServices;
  
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold appear-animation">
            OUR SERVICES
          </h1>
          <p className="sub-appear-animation">Explore our Services</p>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allServices.data?.map((service: ServiceProps) => (
                <CarCard service={service} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allServices.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            {/* <p>{allCars?.message}</p> */}
          </div>
        )}
      </div>
    </main>
  );
}
