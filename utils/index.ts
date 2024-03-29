import { ServiceProps, FilterProps } from "@/types";
import axios from "axios";
import { getHeaders } from "./functions";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchServices() {

  // Set the required headers for the API request
  // const headers: HeadersInit = {
  //   "X-RapidAPI-Key": "f556cf9f08msh2b20f046b44d1bdp13631fjsn3d0041a8b672" || "",
  //   "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  // };

  // Set the required headers for the API request
  const response = await fetch(
    `http://localhost:8080/user/services`,
    {
      headers: new Headers(),
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}
export async function fetchService(id:number) {
  console.log(id,'id')

  const response = await fetch(
    `http://localhost:8080/user/service/${id}`,
    {
      headers: new Headers(),
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}


// @ts-ignore
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 

export async function signIn(email:string,password:string) {

 
  const result = axios.post('http://localhost:8080/user/login', {
    email: email,
    password: password
  })
  .then(function (response) {
    console.log(response);
    return response
  })
  .catch(function (error) {
    console.log(error);
  });


  return result;
}
export async function logOut() {

 
  const result = axios.get('http://localhost:8080/user/logout')
  .then(function (response) {
    console.log(response);
    return response
  })
  .catch(function (error) {
    console.log(error);
  });


  return result;
}
export async function register(data:{name:string,email:string,address:string,password:string}) {
  const {name,email,address,password} = data
 
  const result = axios.post('http://localhost:8080/user/register', {
  name,
    email,
    password,
    address
  })
  .then(function (response) {
    console.log(response,'response');
    return response
  })
  .catch(function (error) {
    console.log(error);
  });


  return result;
}
export async function bookAppointment(data: {
  date: string;
  time: string;
  serviceType: string;
  serviceId: number;
}) {
  const { date, time, serviceType,  serviceId } = data;
  const headers = getHeaders();
  console.log(headers, 'headers');
  try {
    const result = await axios.post(
      'http://localhost:8080/appointment/book-appointment',
      {
        appointmentDate: date,
        appointmentTime: date,
        serviceType,
        serviceId,
      },
      { headers }
    );
    console.log(result, 'response');
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function cancelAppointment(id: 
  number) {
  const headers = getHeaders();
  console.log(headers, 'headers');
  try {
    const result = await axios.delete(
      `http://localhost:8080/appointment/cancel-appointments/${id}`,     
      { headers }
    );
    console.log(result, 'response');
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function myAppointments() {
  const headers = getHeaders();
  console.log(headers, 'headers');
  try {
    const result = axios.get(
      'http://localhost:8080/appointment/my-appointments',
      { headers }
    )
  .then(function (response) {
    console.log(response,'response');
    return response
  })
  .catch(function (error) {
    console.log(error);
  });


  return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function resetPassword(email:string) {
  try {
    const result = axios.post(
      'http://localhost:8080/user/reset-password',{
        email
      }
    )
  .then(function (response) {
    console.log(response,'response');
    return response
  })
  .catch(function (error) {
    console.log(error);
  });


  return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function resetPasswordParams(password:string,userId:number,token:string) {
  try {
console.log(password,userId,token,'api')
    const result = axios.post(
      'http://localhost:8080/user/reset-password-params',{
        password,userId,token
      }
    )
  .then(function (response) {
    console.log(response,'response');
    return response
  })
  .catch(function (error) {
    console.log(error);
  });


  return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}