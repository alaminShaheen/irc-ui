import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import policies from "@/data/policies.json";
import { Policy } from "@/models/Policy";
import PolicyCard from "@/components/PolicyCard/PolicyCard";
import { LanguageCode } from "@/models/enums/LanguageCode";
import {
  ICoverageInfo,
  IEventPolicy,
} from "@/components/EventPolicy/EventPolicy.d";

const EventPolicy = (props: IEventPolicy) => {
  const [coverageInfo, setCoverageInfo] = useState<ICoverageInfo>({});
  const {
    i18n: { language: currentLanguage },
  } = useTranslation();

  const policyList = policies[currentLanguage as LanguageCode] as Policy[];

  // Mock fetch function that simulates fetching user data
  const getListOfEvents = (): Promise<ICoverageInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          vendorCoverage: {
            listOfEvents: [
              {
                eventName: "[Vendor 1] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Vendor 2] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
            ],
          },
          roomCoverage: {
            listOfEvents: [
              {
                eventName: "Hockey Match",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Room] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
              {
                eventName: "[Room] - Reoccurring Activity",
                eventData: [
                  { eventDataValue: "test 1" },
                  { eventDataValue: "test 2" },
                ],
              },
            ],
          },
        });
      }, 500);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ICoverageInfo = await getListOfEvents();
        setCoverageInfo(result);
      } catch (error) {
        console.error("Failed to fetch Coverage data:", error);
        setCoverageInfo({});
      }
    };

    fetchData();
  }, []);

  const { onAddEventClick, translationContent } = props;

  return (
    <div>
      <ul className="space-y-6">
        {policyList?.map((policy: Policy) => {
          const listOfEvents = coverageInfo[policy.id]?.listOfEvents || [];
          return (
            <PolicyCard
              key={policy.id}
              listOfEvents={listOfEvents}
              onAddEventClick={onAddEventClick}
              policy={policy}
              translationContent={translationContent}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default EventPolicy;
