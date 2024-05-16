import { useQuery } from "@tanstack/react-query";
import QueryKeys from "@/constants/QueryKeys";
import { fetchCountryList } from "@/services/fetchCountryList";

type useGetCountryProps = {
  enabled: boolean;
};

const useGetCountry = (props: useGetCountryProps) => {
  const { enabled } = props;
  return useQuery({
    queryKey: [QueryKeys.GET_COUNTRY_LIST],
    queryFn: fetchCountryList,
    enabled,
    select: (response) =>
      response.data
        .map((country) => ({en: country.name.common, fr: country.translations.fra.common}))
        .sort((a, b) => a.en.localeCompare(b.en)),
  });
};

export default useGetCountry;
