import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";

export const instructorSchema: DynamicJsonSchema = {
  id: "individual-vendor",
  title: "dynamicForms.individualFoodVendor.title",
  description: "dynamicForms.individualFoodVendor.description",
  formSections: [
    {
      id: "individual-vendor-section",
      key: "individual-vendor",
      fields: [
        {
          name: "non-owned-auto",
          label: "dynamicForms.individualFoodVendor.autoNonOwnedLabel",
          type: "radio",
          value: "true",
          options: [
            { id: 1, value: "true", label: "common.yes" },
            { id: 2, value: "false", label: "common.no" },
          ],
          validations: { required: "common.form.errors.fieldRequired" },
        },
        {
          name: "requires-5-mil",
          label: "dynamicForms.individualFoodVendor.requires5MilLabel",
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
          name: "requires-5-mil",
          label: "dynamicForms.individualFoodVendor.requires5MilLabel",
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
          name: "requires-5-mil",
          label: "dynamicForms.individualFoodVendor.requires5MilLabel",
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
          name: "individual-food-vendor",
          label: "dynamicForms.individualFoodVendor.individualFoodVendorLabel",
          type: "radio",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
            { value: "na", label: "common.notAvailable", id: 3 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },
        {
          name: "individual-food-vendor-third-party",
          label:
            "dynamicForms.individualFoodVendor.individualFoodVendorThirdPartyLabel",
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
              depFieldName: "individual-food-vendor",
              depFieldValueCondition: "=",
              depFieldValue: "true",
            },
          ],
        },
        {
          name: "individual-vendor-alcohol",
          label:
            "dynamicForms.individualFoodVendor.individualFoodVendorAlcohol",
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
              depFieldName: "individual-food-vendor",
              depFieldValueCondition: "=",
              depFieldValue: "true",
            },
          ],
        },
        {
          name: "sop",
          label: "dynamicForms.individualFoodVendor.sopLabel",
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
              depFieldName: "individual-vendor-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
            },
          ],
          info: "<a href='https://support.instantriskcoverage.com/en/knowledge-base/what-is-a-liquor-licence-in-my-province' target='_blank' class='mt-3'>What is a liquor license in my province <i class='fa-solid fa-circle-question'></i></a>",
        },
        {
          name: "smart-serve",
          label: "dynamicForms.individualFoodVendor.smartServeLabel",
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
              depFieldName: "individual-vendor-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
            },
          ],
          info: "<a href='https://support.instantriskcoverage.com/en/knowledge-base/what-is-a-bartending-certification-in-my-province' target='_blank' class='mt-3'>What is the bartending certification in my province <i class='fa-solid fa-circle-question'></i></a>",
        },

        {
          name: "alcohol-receipts",
          label: "dynamicForms.individualFoodVendor.alcoholReceiptsLabel",
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
              depFieldName: "individual-vendor-alcohol",
              depFieldValueCondition: "NotEmpty",
              depFieldValue: "",
            },
          ],
        },
        {
          name: "non-owned-liability",
          label: "dynamicForms.individualFoodVendor.nonOwnedLiabilityLabel",
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
          label: "dynamicForms.individualFoodVendor.nonOwnedValidLicenseLabel",
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
          label: "dynamicForms.individualFoodVendor.nonOwnedTransportLabel",
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
          label: "dynamicForms.individualFoodVendor.nonOwnedRentingLabel",
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
          label:
            "dynamicForms.individualFoodVendor.nonOwnedPhysicalDamageLabel",
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
          label: "dynamicForms.individualFoodVendor.numberOfVehiclesLabel",
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
            "dynamicForms.individualFoodVendor.nonOwnedPhysicalDamageAmountLabel",
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
