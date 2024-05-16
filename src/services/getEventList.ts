import { mockCoverageInfo } from "@/constants/MockData";
import { ICoverageInfo } from "@/components/EventPolicy/EventPolicy.d";

export const getEventList = (): Promise<ICoverageInfo> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCoverageInfo), 500),
  );
};
