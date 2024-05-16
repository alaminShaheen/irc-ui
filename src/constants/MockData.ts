import { ICoverageInfo } from "@/components/EventPolicy/EventPolicy.d";

export const mockCoverageInfo: ICoverageInfo = {
  vendorCoverage: {
    listOfEvents: [
      {
        eventName: "[Vendor 1] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Vendor 2] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
    ],
  },
  roomCoverage: {
    listOfEvents: [
      {
        eventName: "Hockey Match",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Room] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
      {
        eventName: "[Room] - Reoccurring Activity",
        eventData: [{ eventDataValue: "test 1" }, { eventDataValue: "test 2" }],
      },
    ],
  },
};
