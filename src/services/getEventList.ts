import { mockCoverageInfo } from "@/constants/MockData";
import { PolicyEvents } from "@/models/PolicyEvents";

export const getEventList = (): Promise<PolicyEvents> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCoverageInfo), 500),
  );
};
