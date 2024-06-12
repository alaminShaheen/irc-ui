import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";

export const paradeParticipantSchema: DynamicJsonSchema = {
  id: "parade-participant",
  title: "Parade Participant Form",
  description: "Parade Participant Form",
  formSections: [
    {
      id: "parade-participant-schema",
      key: "parade",
      fields: [
        {
          name: "non-owned-auto",
          label: "Is your auto non-owned?",
          type: "radio",
          options: [
            { value: "true", label: "<p>Yes</p>", id: 2 },
            { value: "false", label: "<p>No</p>", id: 1 },
          ],
          validations: { required: "This is required." },
        },
        {
          name: "non-profit",
          label: "Is your organization a registered non-profit?",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "<p>Yes</p>", id: 2 },
            { value: "false", label: "<p>No</p>", id: 1 },
          ],
          validations: { required: "This is required." },
        },
        {
          name: "parade-participant-type",
          label:
            "Select the option which most accurately describes how your organization will be participating in the parade:",
          type: "select",
          value: "event",
          options: [
            { value: "float", label: "Operating a Float", id: 1 },
            { value: "walking-group", label: "Walking Group", id: 2 },
            { value: "other-parade", label: "Cars with Riders", id: 3 },
            { value: "animal", label: "Horse Riders / Carriage", id: 4 },
            { value: "band", label: "Walking Band", id: 4 },
          ],
          validations: { required: "This is required." },
        },

        {
          name: "requires-5-mil",
          label: "Please select the amount of insurance coverage required:",
          type: "select",
          options: [
            { value: "false", label: "$2,000,000", id: 1 },
            { value: "true", label: "$5,000,000", id: 2 },
          ],
          value: "false",
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["parades"]["limits"]["2"]',
              depFieldValueCondition: "=",
              depFieldValue: "true",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["parades"]["limits"]["5"]',
                  depFieldValueCondition: "=",
                  depFieldValue: "true",
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          label: "Please select the amount of insurance coverage required:",
          type: "select",
          options: [{ value: "true", label: "$5,000,000", id: 1 }],
          value: "false",
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["parades"]["limits"]["2"]',
              depFieldValueCondition: "=",
              depFieldValue: "false",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["parades"]["limits"]["5"]',
                  depFieldValueCondition: "=",
                  depFieldValue: "true",
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          label: "Please select the amount of insurance coverage required:",
          type: "select",
          options: [{ value: "false", label: "$2,000,000", id: 1 }],
          value: "false",
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["parades"]["limits"]["2"]',
              depFieldValueCondition: "=",
              depFieldValue: "true",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["parades"]["limits"]["5"]',
                  depFieldValueCondition: "=",
                  depFieldValue: "false",
                },
              ],
            },
          ],
        },
        {
          name: "items-thrown",
          label: "Will items be thrown into the crowd?",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "<p>Yes</p>", id: 1 },
            { value: "false", label: "<p>No</p>", id: 2 },
          ],
          validations: { required: "This is required." },
        },

        {
          name: "items-thrown",
          label: "Will items be thrown into the crowd?",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "<p>Yes</p>", id: 1 },
            { value: "false", label: "<p>No</p>", id: 1 },
          ],
          validations: { required: "This is required." },
        },

        {
          name: "acknowledge-exclusions",
          label:
            "I acknowledge that I have registered with the parade organizers and meet all requirements to participate in the parade.",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "<p>Yes</p>", id: 1 },
            { value: "false", label: "<p>No</p>", id: 1 },
          ],
          validations: { required: "This is required." },
        },

        {
          name: "non-owned-liability",
          label:
            "Please select the amount of non-owned auto insurance coverage you wish to add:",
          type: "select",
          options: [
            { value: 1, label: "$1,000,000", id: 1 },
            { value: 2, label: "$2,000,000", id: 1 },
            { value: 5, label: "$5,000,000", id: 1 },
          ],
          value: 1,
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "non-owned-auto",
              depFieldValue: "true",
              depFieldValueCondition: "=",
            },
          ],
        },

        {
          name: "non-owned-valid-license",
          label:
            "Does every driver of the vehicles have a valid drivers' license?",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "Yes", id: 1 },
            { value: "false", label: "No", id: 1 },
          ],
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "non-owned-auto",
              depFieldValue: "true",
              depFieldValueCondition: "=",
            },
          ],
        },

        {
          name: "non-owned-transport",
          label:
            "Are you responsible for providing transportation and/or chauffeuring services, or transporting attendees?",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "Yes", id: 1 },
            { value: "false", label: "No", id: 1 },
          ],
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "non-owned-auto",
              depFieldValue: "true",
              depFieldValueCondition: "=",
            },
          ],
        },

        {
          name: "non-owned-renting",
          label:
            "Do you have any short term rental vehicles (less than 30 days)?",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "Yes", id: 1 },
            { value: "false", label: "No", id: 1 },
          ],
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "non-owned-auto",
              depFieldValue: "true",
              depFieldValueCondition: "=",
            },
          ],
        },

        {
          name: "non-owned-physical-damage",
          label:
            "Do you require physical damage coverage for the short term rental vehicles?",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "Yes", id: 1 },
            { value: "false", label: "No", id: 1 },
          ],
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "non-owned-auto",
              depFieldValue: "true",
              depFieldValueCondition: "=",
              andGroup: [
                {
                  depFieldName: "non-owned-renting",
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                },
              ],
            },
          ],
        },

        {
          name: "number-of-vehicles",
          label: "Number of vehicles",
          type: "text",
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "non-owned-auto",
              depFieldValue: "true",
              depFieldValueCondition: "=",
              andGroup: [
                {
                  depFieldName: "non-owned-physical-damage",
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                },
              ],
            },
          ],
        },

        {
          name: "non-owned-physical-damage-amount",
          label:
            "What limit of physical damage coverage is required per vehicle?",
          type: "select",
          options: [
            { value: 25, label: "$25,000", id: 1 },
            { value: 50, label: "$50,000", id: 1 },
            { value: 100, label: "$100,000", id: 1 },
          ],
          value: 25,
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "non-owned-auto",
              depFieldValue: "true",
              depFieldValueCondition: "=",
              andGroup: [
                {
                  depFieldName: "non-owned-physical-damage",
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                },
              ],
            },
          ],
        },
        {
          name: "submit",
          type: "submit",
          label: "OK",
        },
      ],
    },
  ],
};
