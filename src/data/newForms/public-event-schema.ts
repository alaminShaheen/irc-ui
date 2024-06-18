import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";

export const instructorSchema: DynamicJsonSchema = {
  id: "public-event",
  title: "dynamicForms.publicEvent.title",
  description: "dynamicForms.publicEvent.description",
  formSections: [
    {
      id: "public-event-section",
      key: "public-event",
      fields: [
        {
          name: "non-owned-auto",
          label: "dynamicForms.publicEvent.autoNonOwnedLabel",
          type: "radio",
          value: "true",
          options: [
            { id: 1, value: "true", label: "common.yes" },
            { id: 2, value: "false", label: "common.no" },
          ],
          validations: { required: "common.form.errors.fieldRequired" },
        },
        {
          name: "public-event-increased-vendor-insurance",
          label: "dynamicForms.publicEvent.vendorInsuranceLabel",
          type: "select",
          options: [
            { value: "false", label: "common.twoMillion", id: 1 },
            { value: "true", label: "common.fiveMillion", id: 2 },
          ],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["instructors"]["limits"]["2"]',
              depFieldValue: "true",
              depFieldValueCondition: "=",
              andGroup: [
                {
                  depFieldName:
                    'VALID_ACTIVITIES["instructors"]["limits"]["5"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                },
              ],
            },
          ],
        },
        {
          name: "public-event-increased-vendor-insurance",
          label: "dynamicForms.publicEvent.vendorInsuranceLabel",
          type: "select",
          options: [{ value: "true", label: "common.fiveMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["instructors"]["limits"]["2"]',
              depFieldValue: "false",
              depFieldValueCondition: "=",
              andGroup: [
                {
                  depFieldName:
                    'VALID_ACTIVITIES["instructors"]["limits"]["5"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                },
              ],
            },
          ],
        },
        {
          name: "public-event-increased-vendor-insurance",
          label: "dynamicForms.publicEvent.vendorInsuranceLabel",
          type: "select",
          options: [{ value: "false", label: "common.twoMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["instructors"]["limits"]["2"]',
              depFieldValueCondition: "=",
              depFieldValue: "true",
              andGroup: [
                {
                  depFieldName:
                    'VALID_ACTIVITIES["instructors"]["limits"]["5"]',
                  depFieldValueCondition: "=",
                  depFieldValue: "false",
                },
              ],
            },
          ],
        },
        {
          name: "public-event-attendance",
          label: "dynamicForms.publicEvent.attendanceLabel",
          type: "text",
          validations: { required: "common.form.errors.fieldRequired" },
        },
        // {
        //   "type": "help",
        //   "helpvalue": "<i>A Vendor is any individual, partnership, and/or corporation (for-Profit and not-for-profit) who provides either a product, service, appearance, or presence before, during, or after your event, regardless of the dollar value.  It includes those selling products, demonstrating product, performing, providing equipment, providing security service, giving out information, etc</i>",
        //   "condition": "model['policyType'] == 'public-event'"
        // },
        {
          name: "public-event-food-alcohol-vendors",
          label: "dynamicForms.publicEvent.foodAlcoholVendorsLabel",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          type: "number",
        },

        {
          name: "public-event-liquor-served",
          label: "dynamicForms.publicEvent.liquorServedLabel",
          type: "radio",
          options: [
            { id: 1, value: "true", label: "common.yes" },
            { id: 2, value: "false", label: "common.no" },
          ],
          validations: { required: "common.form.errors.fieldRequired" },
          renderLogic: [
            {
              depFieldName: "public-event-food-alcohol-vendors",
              depFieldValueCondition: ">",
              depFieldValue: "0",
            },
          ],
        },
        {
          type: "radio",
          name: "public-event-liquor-license",
          label: "dynamicForms.publicEvent.liquorLicense",
          options: [
            { id: 1, value: "true", label: "common.yes" },
            { id: 2, value: "false", label: "common.no" },
          ],
          validations: { required: "common.form.errors.fieldRequired" },
          renderLogic: [
            {
              depFieldName: "public-event-food-alcohol-vendors",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "public-event-food-alcohol-vendors",
                  depFieldValueCondition: ">",
                  depFieldValue: "0",
                },
              ],
            },
          ],
        },
        {
          type: "radio",
          name: "public-event-smart-serve",
          label: "dynamicForms.publicEvent.smartServeLabel",
          options: [
            { id: 1, value: "true", label: "common.yes" },
            { id: 2, value: "false", label: "common.no" },
          ],
          validations: { required: "common.form.errors.fieldRequired" },
          info: "<a href='https://support.instantriskcoverage.com/en/knowledge-base/what-is-a-bartending-certification-in-my-province' target='_blank' class='mt-3'>What is the bartending certification in my province <i class='fa-solid fa-circle-question'></i></a>",
          renderLogic: [
            {
              depFieldName: "public-event-food-alcohol-vendors",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
              andGroup: [
                {
                  depFieldName: "public-event-food-alcohol-vendors",
                  depFieldValueCondition: ">",
                  depFieldValue: "0",
                },
              ],
            },
          ],
        },

        {
          name: "public-event-inflatables",
          label: "dynamicForms.publicEvent.inflatablesLabel",
          type: "text",
          validations: { required: "common.form.errors.fieldRequired" },
          info: "A high risk vendor is any of the following vendors: animal rides or dunk tanks",
          renderLogic: [
            {
              depFieldName:
                'VALID_ACTIVITIES["multi_vendors"]["disable_inflatables"]',
              depFieldValueCondition: "=",
              depFieldValue: "true",
            },
          ],
        },
        {
          name: "public-event-inflatables",
          label: "dynamicForms.publicEvent.inflatablesLabel",
          type: "text",
          validations: { required: "common.form.errors.fieldRequired" },
          info: "A high risk vendor is any of the following vendors: animal rides or dunk tanks",
          renderLogic: [
            {
              depFieldName:
                'VALID_ACTIVITIES["multi_vendors"]["disable_inflatables"]',
              depFieldValueCondition: "=",
              depFieldValue: "false",
            },
          ],
        },

        {
          name: "public-event-vendors",
          label: "dynamicForms.publicEvent.vendorsLabel",
          type: "text",
          validations: { required: "common.form.errors.fieldRequired" },
        },
        {
          name: "acknowledge-exclusions",
          label: "dynamicForms.publicEvent.acknowledgeExclusionLabel",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },
        {
          name: "non-owned-liability",
          label: "dynamicForms.publicEvent.nonOwnedLiabilityLabel",
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
          label: "dynamicForms.publicEvent.nonOwnedValidLicenseLabel",
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
          label: "dynamicForms.publicEvent.nonOwnedTransportLabel",
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
          label: "dynamicForms.publicEvent.nonOwnedRentingLabel",
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
          label: "dynamicForms.publicEvent.nonOwnedPhysicalDamageLabel",
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
          label: "dynamicForms.publicEvent.numberOfVehiclesLabel",
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
          label: "dynamicForms.publicEvent.nonOwnedPhysicalDamageAmountLabel",
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
