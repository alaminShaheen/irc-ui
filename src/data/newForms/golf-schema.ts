import { FormSection } from "@/models/form/DynamicJsonFormTypes";

export const golfSchema: FormSection[] = [
  {
    id: "golf-schema",
    key: "golf",
    fields: [
      {
        name: "policyType",
        label: "Select the type of golf prize contest that is being hosted:",
        type: "select",
        value: "hole-in-one",
        options: [
          { id: 1, value: "hole-in-one", label: "Hole in One Competition" },
          { id: 2, value: "million-dollar-shot", label: "Million Dollar Shot" },
          { id: 3, value: "putting", label: "Putting Competition" },
          { id: 4, value: "shootout", label: "Shootout Competition" },
        ],
        validations: { required: "This is required." },
      },
      {
        name: "name-of-event",
        label: "Name of event",
        type: "textarea",
        validations: { required: "This is required." },
      },
      {
        name: "prize-amount",
        label: "Amount of prize",
        type: "textarea",
        validations: { required: "This is required." },
        depRenderConditionMode: "or",
        renderLogic: [
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "putting",
          },
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "shootout",
          },
        ],
      },
      {
        name: "million-dollar-shot-yards",
        label: "Million Dollar Shot Yards",
        type: "text",
        validations: { required: "This is required." },
        depRenderConditionMode: "and",
        renderLogic: [
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "million-dollar-shot",
          },
        ],
      },
      {
        name: "million-dollar-shot-num-attempts",
        label: "Million Dollar Shot Number Attempts",
        type: "text",
        validations: { required: "This is required." },
        depRenderConditionMode: "and",
        renderLogic: [
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "million-dollar-shot",
          },
        ],
      },
      {
        name: "number-amateur-participants",
        label: "Number of amateur participants",
        type: "text",
        validations: { required: "This is required." },
      },
      {
        name: "number-pro-participants",
        label: "Number of pro participants",
        type: "text",
        validations: { required: "This is required." },
      },
      {
        name: "putt-length",
        label:
          "Select the length of the putt that will be completed in the competition:",
        type: "select",
        options: [
          { id: 1, value: "0", label: "Less than 20 foot putt" },
          { id: 2, value: "20", label: "20 foot putt" },
          { id: 3, value: "30", label: "30 foot putt" },
          { id: 4, value: "40", label: "40 foot putt" },
          { id: 5, value: "50", label: "50 foot putt" },
          { id: 6, value: "60", label: "60 foot putt" },
          { id: 7, value: "70", label: "70 foot putt" },
          { id: 8, value: "80", label: "80 foot putt" },
          { id: 9, value: "100", label: "100 foot putt" },
          { id: 10, value: "-1", label: "Over 100 foot putt" },
        ],
        validations: { required: "This is required." },
        depRenderConditionMode: "and",
        renderLogic: [
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "putting",
          },
        ],
      },
      {
        name: "putt-num-attempts",
        type: "text",
        label: "Number of putt attempts",
        validations: { required: "This is required." },
        depRenderConditionMode: "and",
        renderLogic: [
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "putting",
          },
        ],
      },
      {
        name: "played-rounds",
        type: "text",
        label: "Number of played rounds",
        validations: { required: "This is required." },
        depRenderConditionMode: "or",
        renderLogic: [
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "hole-in-one",
          },
          {
            depFieldName: "policyType",
            depFieldValueCondition: "=",
            depFieldValue: "shootout",
          },
        ],
      },
      {
        name: "previous-event-experience",
        label:
          "Do you have previous experience holding events/promotions of this kind?",
        type: "radio",
        value: "false",
        options: [
          { id: 1, value: "true", label: "Yes" },
          { id: 2, value: "false", label: "No" },
        ],
        validations: { required: "This is required." },
      },
      {
        name: "previous-experience-description",
        label: "Previous experience description",
        type: "textarea",
        validations: { required: "This is required." },
        depRenderConditionMode: "and",
        renderLogic: [
          {
            depFieldName: "previous-event-experience",
            depFieldValueCondition: "=",
            depFieldValue: "true",
          },
        ],
      },
      {
        name: "non-owned-liability",
        label:
          "Please select the amount of non-owned auto insurance coverage you wish to add:",
        type: "select",
        options: [
          { id: 1, value: 1, label: "$1,000,000" },
          { id: 2, value: 2, label: "$2,000,000" },
          { id: 3, value: 5, label: "$5,000,000" },
        ],
        value: 1,
        validations: { required: "This is required." },
      },

      {
        name: "non-owned-valid-license",
        label:
          "Does every driver of the vehicles have a valid drivers' license?",
        type: "radio",
        value: "false",
        options: [
          { id: 1, value: "true", label: "Yes" },
          { id: 2, value: "false", label: "No" },
        ],
        validations: { required: "This is required." },
        // condition: "model['non-owned-auto'] == true"
      },

      {
        name: "non-owned-transport",
        label:
          "Are you responsible for providing transportation and/or chauffeuring services, or transporting attendees?",
        type: "radio",
        value: "false",
        options: [
          { id: 1, value: "true", label: "Yes" },
          { id: 2, value: "false", label: "No" },
        ],
        validations: { required: "This is required." },
        // condition: "model['non-owned-auto'] == true"
      },

      {
        name: "non-owned-renting",
        label:
          "Do you have any short term rental vehicles (less than 30 days)?",
        type: "radio",
        value: "false",
        options: [
          { id: 1, value: "true", label: "Yes" },
          { id: 2, value: "false", label: "No" },
        ],
        validations: { required: "This is required." },
        // condition: "model['non-owned-auto'] == true"
      },

      {
        name: "non-owned-physical-damage",
        label:
          "Do you require physical damage coverage for the short term rental vehicles?",
        type: "radio",
        value: "false",
        options: [
          { id: 1, value: "true", label: "Yes" },
          { id: 2, value: "false", label: "No" },
        ],
        validations: { required: "This is required." },
        // condition: "model['non-owned-auto'] == true && model['non-owned-renting'] == true"
      },

      {
        name: "number-of-vehicles",
        label: "Number of vehicles",
        type: "text",
        validations: { required: "This is required." },
        // condition: "model['non-owned-auto'] == true && model['non-owned-physical-damage'] == true"
      },

      {
        name: "non-owned-physical-damage-amount",
        label:
          "What limit of physical damage coverage is required per vehicle?",
        type: "select",
        options: [
          { id: 1, value: 25, label: "$25,000" },
          { id: 2, value: 50, label: "$50,000" },
          { id: 3, value: 100, label: "$100,000" },
        ],
        value: 25,
        validations: { required: "This is required." },
        // condition: "model['non-owned-auto'] == true && model['non-owned-physical-damage'] == true"
      },

      {
        name: "acknowledge-exclusions",
        label:
          "I acknowledge that there are rules and stipulations listed in the policy that must be adhered to. Failure to comply with these requirements wil result in a voiding of the policy.",
        type: "radio",
        value: "false",
        options: [
          { id: 1, value: "true", label: "Yes" },
          { id: 2, value: "false", label: "No" },
        ],
        validations: { required: "This is required." },
      },
    ],
  },
];
