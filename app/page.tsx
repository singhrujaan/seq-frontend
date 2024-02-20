import { Hero } from "@/components";
import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps, ServiceProps } from "@/types";
import { fetchServices } from "@/utils";
import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const allServices = await fetchServices();
  const isDataEmpty = !Array.isArray(allServices?.data) || allServices?.data.length < 1 || !allServices;
  console.log(allServices, "allServices");
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">OUR SERVICES</h1>
          <p>Explore our Services</p>
        </div>

        {/* <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div> */}

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allServices.data?.map((service:ServiceProps) => (
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

      {/* <div className="relative h-80 md:h-80  lg:h-96">
        <Image
          src="/overlaps.jpg"
          alt="Example Image"
          // width={800}
          // height={1000}
          fill={true}
          // layout="responsive"
          // objectFit="contain" // Adjusted objectFit property
          // className="rounded-lg"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold">Self Care You Deserver</h1>
          <p className="text-lg mt-2">Beauty is not about enhancing</p>
          <button
            type="button"
            className="relative top-2 right-2 z-10 w-fit p-2 bg-purple-700 rounded-full "
            // onClick={closeModal}
          >
            Book your appointment now
          </button>
        </div>
      </div> */}
    </main>
  );
}
