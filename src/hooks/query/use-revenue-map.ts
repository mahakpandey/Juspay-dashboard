import { getRandomCountries } from "@/lib/map-fetcher";
import { useQuery } from "@tanstack/react-query";

export default function useRevenueMap() {
  const query = useQuery({
    queryKey: ["revenue-map-data"],
    queryFn: () => getRandomCountries(),
  });
  return query;
}
