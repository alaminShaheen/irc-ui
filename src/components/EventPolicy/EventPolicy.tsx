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
import { mockCoverageInfo } from "@/constants/MockData";

const EventPolicy = (props: IEventPolicy) => {
  const [coverageInfo, setCoverageInfo] = useState<ICoverageInfo>({});
  const {
    i18n: { language: currentLanguage },
  } = useTranslation();

  const policyList = policies[currentLanguage as LanguageCode] as Policy[];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCoverageInfo(mockCoverageInfo);
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
