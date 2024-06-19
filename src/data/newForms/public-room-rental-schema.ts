import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";

export const publicRoomRentalSchema: DynamicJsonSchema = {
  id: "room-rental",
  title: "dynamicForms.publicRoomRental.title",
  description: "dynamicForms.publicRoomRental.description",
  formSections: [
    {
      id: "public-room-rental-schema",
      key: "public-room-rental",
      fields: [
        {
          name: "non-owned-auto",
          label: "dynamicForms.publicRoomRental.autoNonOwnedLabel",
          type: "radio",
          options: [
            { id: 1, value: "true", label: "common.yes" },
            { id: 2, value: "false", label: "common.no" },
          ],
          validations: { required: "This is required." },
        },

        {
          name: "requires-5-mil",
          label: "dynamicForms.publicRoomRental.requires5MilLabel",
          type: "select",
          options: [
            { value: "false", label: "common.twoMillion", id: 1 },
            { value: "true", label: "common.fiveMillion", id: 2 },
          ],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },
        {
          name: "social-alcohol",
          id: "1",
          label: "dynamicForms.publicRoomRental.socialAlcoholLabel",
          type: "select",
          options: [
            {
              value: "alcohol-caterer",
              label: "dynamicForms.publicRoomRental.socialAlcoholLabel1",
              id: 1,
            },
            {
              value: "alcohol-no-caterer",
              label: "dynamicForms.publicRoomRental.socialAlcoholLabel2",
              id: 2,
            },
            {
              value: "cannabis-caterer",
              label: "dynamicForms.publicRoomRental.socialAlcoholLabel3",
              id: 3,
            },
            {
              value: "no-alcohol",
              label: "dynamicForms.publicRoomRental.socialAlcoholLabel4",
              id: 4,
            },
          ],
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["alcohol"]["enabled"]',
              depFieldValue: "true",
              depFieldValueCondition: "=",
            },
          ],
          // "condition": "model.VALID_ACTIVITIES.alcohol.enabled == true && (model.selectedActivityType == 'public-class-1' || model.selectedActivityType == 'public-class-2')",
          validations: { required: "This is required." },
        },
        {
          name: "social-alcohol",
          id: "2",
          label: "dynamicForms.publicRoomRental.socialAlcoholLabel",
          type: "select",
          options: [
            {
              value: "no-alcohol",
              label: "dynamicForms.publicRoomRental.socialAlcoholLabel4",
              id: 1,
            },
          ],
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["alcohol"]["enabled"]',
              depFieldValue: "false",
              depFieldValueCondition: "=",
            },
          ],
          // "condition": "model.VALID_ACTIVITIES.alcohol.enabled == false && (model.selectedActivityType == 'public-class-1' || model.selectedActivityType == 'public-class-2')",
          validations: { required: "This is required." },
        },
        {
          name: "number-of-participants",
          label: "dynamicForms.publicRoomRental.numberOfParticipantsLabel",
          type: "number",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },

        {
          name: "sop",
          label: "dynamicForms.publicRoomRental.sopLabel",
          type: "radio",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "cannabis-caterer",
                },
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "no-alcohol",
                },
              ],
            },
          ],
          info: "<a href='https://support.instantriskcoverage.com/en/knowledge-base/what-is-a-liquor-licence-in-my-province' target='_blank' class='mt-3'>What is a liquor license in my province <i class='fa-solid fa-circle-question'></i></a>",
        },
        {
          name: "server-ai",
          label: "serverAi",
          type: "radio",
          options: [
            { value: "true", label: "<p>Yes</p>", id: 2 },
            { value: "false", label: "<p>No</p>", id: 1 },
          ],
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "cannabis-caterer",
                },
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "no-alcohol",
                },
              ],
            },
          ],
        },

        {
          name: "smart-serve",
          label: "dynamicForms.publicRoomRental.smartServeLabel",
          type: "radio",
          id: "2",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
            { value: "na", label: "common.notAvailable", id: 3 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "cannabis-caterer",
                },
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "=",
                  depFieldValue: "alcohol-no-caterer",
                },
              ],
            },
          ],
          info: "If participants are self-serving alcohol then bartending certification is not required. If this is the case select N/A. <a href='https://support.instantriskcoverage.com/en/knowledge-base/what-is-a-bartending-certification-in-my-province' target='_blank' class='mt-3'>Click here to find out what the bartending certification in my province is<i class='ml-1 fa-solid fa-circle-question'></i></a>",
        },
        {
          name: "smart-serve",
          label: "dynamicForms.publicRoomRental.smartServeLabel",
          type: "radio",
          id: "1",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
            { value: "na", label: "common.notAvailable", id: 3 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "cannabis-caterer",
                },
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "=",
                  depFieldValue: "alcohol-caterer",
                },
              ],
            },
          ],
          info: "If participants are self-serving alcohol then bartending certification is not required. If this is the case select N/A. <a href='https://support.instantriskcoverage.com/en/knowledge-base/what-is-a-bartending-certification-in-my-province' target='_blank' class='mt-3'>Click here to find out what the bartending certification in my province is<i class='ml-1 fa-solid fa-circle-question'></i></a>",
        },

        {
          name: "cannabis-certification",
          label: "dynamicForms.publicRoomRental.cannabisCertificationLabel",
          type: "radio",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "=",
                  depFieldValue: "cannabis-caterer",
                },
              ],
            },
          ],
        },
        {
          name: "alcohol-receipts",
          label: "dynamicForms.publicRoomRental.alcoholReceipts",
          type: "radio",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "cannabis-caterer",
                },
                {
                  depFieldName: "social-alcohol",
                  depFieldValueCondition: "!=",
                  depFieldValue: "no-alcohol",
                },
              ],
            },
          ],
        },

        {
          name: "non-owned-liability",
          label: "dynamicForms.publicRoomRental.nonOwnedLiabilityLabel",
          type: "select",
          options: [
            {
              value: 1,
              label: "common.oneMillion",
              id: 1,
            },
            {
              value: 2,
              label: "common.twoMillion",
              id: 2,
            },
            {
              value: 5,
              label: "common.fiveMillion",
              id: 3,
            },
          ],
          value: 1,
          validations: {
            required: "common.form.errors.fieldRequired",
          },
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
          label: "dynamicForms.publicRoomRental.nonOwnedValidLicenseLabel",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
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
          label: "dynamicForms.publicRoomRental.nonOwnedTransportLabel",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
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
          label: "dynamicForms.publicRoomRental.nonOwnedRentingLabel",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
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
          label: "dynamicForms.publicRoomRental.nonOwnedPhysicalDamageLabel",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
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
          type: "number",
          label: "dynamicForms.publicRoomRental.numberOfVehiclesLabel",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
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
            "dynamicForms.publicRoomRental.nonOwnedPhysicalDamageAmountLabel",
          type: "select",
          options: [
            { value: "25", label: "common.twentyFiveK", id: 1 },
            { value: "50", label: "common.fiftyK", id: 2 },
            { value: "100", label: "common.hundredK", id: 3 },
          ],
          value: "25",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
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
          label: "common.ok",
        },
      ],
    },
  ],
};
