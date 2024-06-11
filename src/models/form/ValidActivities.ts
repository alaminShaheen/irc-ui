export type ValidActivities = {
  key: string;
  value: {
    non_owned_auto: {
      enabled: string;
    };
    non_sports: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
      allow_weekly: string;
    };
    alcohol: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
      allow_cannabis: string;
    };
    sports: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
    };
    instructors: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
    };
    multi_vendors: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
      disable_inflatables: string;
    };
    individual_vendors: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
    };
    parades: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
    };
    cooking: {
      enabled: string;
      limits: {
        "2": string;
        "5": string;
      };
    };
    golf_events: {
      enabled: string;
    };
  };
};
