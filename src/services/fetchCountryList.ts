import axios, { AxiosResponse } from "axios";
import APILinks from "@/constants/APILinks";
import { CountryListResponse } from "@/models/apis/CountryListResponse";

export const fetchCountryList = async (): Promise<
  AxiosResponse<CountryListResponse>
> => {
  return axios.get<CountryListResponse>(APILinks.getCountryList());
};
