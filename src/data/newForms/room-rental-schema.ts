import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";

export const roomRentalSchema: DynamicJsonSchema = {
  id: "room-rental",
  title: "dynamicForms.roomRental.title",
  description: "dynamicForms.roomRental.description",
  formSections: [
    {
      id: "room-rental-schema",
      key: "room-rental",
      fields: [
        {
          name: "non-owned-auto",
          label: "dynamicForms.roomRental.autoNonOwnedLabel",
          type: "radio",
          options: [
            { value: "true", label: "<p>Yes</p>", id: 2 },
            { value: "false", label: "<p>No</p>", id: 1 },
          ],
          validations: { required: "This is required." },
        },
        {
          name: "yearly-coverage",
          label: "dynamicForms.roomRental.yearlyCoverageLabel",
          type: "select",
          options: [
            {
              value: "false",
              id: 1,
              label: "dynamicForms.roomRental.yearlyCoverageLabel1",
            },
            {
              value: "true",
              id: 2,
              label: "dynamicForms.roomRental.yearlyCoverageLabel2",
            },
          ],
          value: false,
          validations: { required: "This is required." },
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["non_sports"]["allow_weekly"]',
              depFieldValue: "true",
              depFieldValueCondition: "=",
            },
          ],
          // condition:
          //   "model.VALID_ACTIVITIES.non_sports.allow_weekly == true && model.selectedActivityType == 'class-1'",
        },

        {
          name: "activities-per-week",
          validations: { required: "This is required." },
          type: "number",
          label: "dynamicForms.roomRental.activitiesPerWeekLabel",
          renderLogic: [
            {
              depFieldName: "yearly-coverage",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
            },
          ],
          // "condition": "model.selectedActivityType == 'class-1' && model['yearly-coverage']"
        },
        {
          name: "hours-per-activity",
          validations: { required: "This is required." },
          type: "number",
          label: "dynamicForms.roomRental.hoursPerActivity",
          renderLogic: [
            {
              depFieldName: "yearly-coverage",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
            },
          ],
          // "condition": "model.selectedActivityType == 'class-1' && model['yearly-coverage']"
        },

        {
          name: "social-alcohol",
          id: "1",
          label: "dynamicForms.roomRental.socialAlcoholLabel",
          type: "select",
          options: [
            {
              value: "alcohol-caterer",
              label: "dynamicForms.roomRental.socialAlcoholLabel1",
              id: 1,
            },
            {
              value: "alcohol-no-caterer",
              label: "dynamicForms.roomRental.socialAlcoholLabel2",
              id: 2,
            },
            {
              value: "cannabis-caterer",
              label: "dynamicForms.roomRental.socialAlcoholLabel3",
              id: 3,
            },
            {
              value: "no-alcohol",
              label: "dynamicForms.roomRental.socialAlcoholLabel4",
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
          // "condition": "model.VALID_ACTIVITIES.alcohol.enabled == true && (model.selectedActivityType == 'class-1' || model.selectedActivityType == 'class-2')",
          validations: { required: "This is required." },
        },
        {
          name: "social-alcohol",
          id: "2",
          label: "dynamicForms.roomRental.socialAlcoholLabel",
          type: "select",
          options: [
            {
              value: "no-alcohol",
              label: "dynamicForms.roomRental.socialAlcoholLabel4",
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
          // "condition": "model.VALID_ACTIVITIES.alcohol.enabled == false && (model.selectedActivityType == 'class-1' || model.selectedActivityType == 'class-2')",
          validations: { required: "This is required." },
        },

        {
          name: "requires-5-mil",
          id: "1",
          label: "dynamicForms.roomRental.requires5MilLabel",
          type: "select",
          options: [
            { value: "false", label: "common.twoMillion", id: 1 },
            { value: "true", label: "common.fiveMillion", id: 2 },
          ],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == true && model.VALID_ACTIVITIES.sports.limits['5'] == true && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "=",
              depFieldValue: "no-alcohol",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["non-sports"]["limits"]["2"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                  andGroup: [
                    {
                      depFieldName:
                        'VALID_ACTIVITIES["non-sports"]["limits"]["5"]',
                      depFieldValue: "true",
                      depFieldValueCondition: "=",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          id: "2",
          label: "dynamicForms.roomRental.requires5MilLabel",
          type: "select",
          options: [{ value: "true", label: "common.fiveMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == false && model.VALID_ACTIVITIES.sports.limits['5'] == true && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "=",
              depFieldValue: "no-alcohol",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["non-sports"]["limits"]["2"]',
                  depFieldValue: "false",
                  depFieldValueCondition: "=",
                  andGroup: [
                    {
                      depFieldName:
                        'VALID_ACTIVITIES["non-sports"]["limits"]["5"]',
                      depFieldValue: "true",
                      depFieldValueCondition: "=",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          id: "3",
          label: "dynamicForms.roomRental.requires5MilLabel",
          type: "select",
          options: [{ value: "false", label: "common.twoMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == true && model.VALID_ACTIVITIES.sports.limits['5'] == false && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "=",
              depFieldValue: "no-alcohol",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["non-sports"]["limits"]["2"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                  andGroup: [
                    {
                      depFieldName:
                        'VALID_ACTIVITIES["non-sports"]["limits"]["5"]',
                      depFieldValue: "false",
                      depFieldValueCondition: "=",
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          name: "requires-5-mil",
          id: "4",
          label: "dynamicForms.roomRental.requires5MilLabel",
          type: "select",
          options: [
            { value: "false", label: "common.twoMillion", id: 1 },
            { value: "true", label: "common.fiveMillion", id: 2 },
          ],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == true && model.VALID_ACTIVITIES.sports.limits['5'] == true && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "!=",
              depFieldValue: "no-alcohol",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["non-sports"]["limits"]["2"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                  andGroup: [
                    {
                      depFieldName:
                        'VALID_ACTIVITIES["non-sports"]["limits"]["5"]',
                      depFieldValue: "true",
                      depFieldValueCondition: "=",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          id: "5",
          label: "dynamicForms.roomRental.requires5MilLabel",
          type: "select",
          options: [{ value: "true", label: "common.fiveMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == false && model.VALID_ACTIVITIES.sports.limits['5'] == true && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "!=",
              depFieldValue: "no-alcohol",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["non-sports"]["limits"]["2"]',
                  depFieldValue: "false",
                  depFieldValueCondition: "=",
                  andGroup: [
                    {
                      depFieldName:
                        'VALID_ACTIVITIES["non-sports"]["limits"]["5"]',
                      depFieldValue: "true",
                      depFieldValueCondition: "=",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          id: "6",
          label: "dynamicForms.roomRental.requires5MilLabel",
          type: "select",
          options: [{ value: "false", label: "common.twoMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == true && model.VALID_ACTIVITIES.sports.limits['5'] == false && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: "social-alcohol",
              depFieldValueCondition: "!=",
              depFieldValue: "no-alcohol",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["non-sports"]["limits"]["2"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                  andGroup: [
                    {
                      depFieldName:
                        'VALID_ACTIVITIES["non-sports"]["limits"]["5"]',
                      depFieldValue: "false",
                      depFieldValueCondition: "=",
                    },
                  ],
                },
              ],
            },
          ],
        },

        // {
        //   name: "birthday-info",
        //   "type": "help",
        //   "helpvalue": "<b><a href='https://support.instantriskcoverage.com/en/knowledge-base/what-should-i-select-if-i-have-both-a-gym-and-room-rental' target='_blank'><u>If you are having a birthday party with a gym/pool or other space rental as well</u></a>, please ensure to add one-time sporting coverage for the time you will be using the gym</b>",
        //   "condition": "model.selectedActivityId == 'birthday-party'"
        // },
        // {
        //   name: "block-party-info",
        //   "type": "help",
        //   "helpvalue": "<b>If you are having extra amenities at your block party such as petting zoos or inflatables, you must add multiple vendor coverage as well after you complete this application</b>",
        //   "condition": "model.selectedActivityId == 'block-party'"
        // },
        {
          name: "number-of-participants",
          label: "dynamicForms.roomRental.numberOfParticipantsLabel",
          type: "number",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },

        {
          name: "sop",
          label: "dynamicForms.roomRental.sopLabel",
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
          name: "smart-serve",
          label: "dynamicForms.roomRental.smartServeLabel",
          type: "radio",
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
                  depFieldValueCondition: "!=",
                  depFieldValue: "no-alcohol",
                },
              ],
            },
          ],
          info: "If participants are self-serving alcohol then bartending certification is not required. If this is the case select N/A. <a href='https://support.instantriskcoverage.com/en/knowledge-base/what-is-a-bartending-certification-in-my-province' target='_blank' class='mt-3'>Click here to find out what the bartending certification in my province is<i class='ml-1 fa-solid fa-circle-question'></i></a>",
        },

        {
          name: "cannabis-certification",
          label: "dynamicForms.roomRental.cannabisCertificationLabel",
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
          label: "dynamicForms.roomRental.alcoholReceipts",
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
          label: "dynamicForms.roomRental.nonOwnedLiabilityLabel",
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
          label: "dynamicForms.roomRental.nonOwnedValidLicenseLabel",
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
          label: "dynamicForms.roomRental.nonOwnedTransportLabel",
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
          label: "dynamicForms.roomRental.nonOwnedRentingLabel",
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
          label: "dynamicForms.roomRental.nonOwnedPhysicalDamageLabel",
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
          label: "dynamicForms.roomRental.numberOfVehiclesLabel",
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
          label: "dynamicForms.roomRental.nonOwnedPhysicalDamageAmountLabel",
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