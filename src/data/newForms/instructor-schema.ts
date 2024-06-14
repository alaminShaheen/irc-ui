import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";

export const instructorSchema: DynamicJsonSchema = {
  id: "instructor",
  title: "dynamicForms.instructor.title",
  description: "dynamicForms.instructor.description",
  formSections: [
    {
      id: "instructor-section",
      key: "instructor",
      fields: [
        {
          name: "non-owned-auto",
          label: "dynamicForms.instructor.autoNonOwnedLabel",
          type: "radio",
          value: "true",
          options: [
            { id: 1, value: "true", label: "common.yes" },
            { id: 2, value: "false", label: "common.no" },
          ],
          validations: { required: "common.form.errors.fieldRequired" },
        },
        {
          name: "policyType",
          label: "dynamicForms.instructor.policyTypeLabel",
          type: "select",
          value: "one-time-coaching",
          options: [
            {
              value: "one-time-coaching",
              label: "dynamicForms.instructor.policyTypeLabel1",
              id: 1,
            },
            {
              value: "season-coaching",
              label: "dynamicForms.instructor.policyTypeLabel2",
              id: 2,
            },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.selectedActivityType !== null"
        },

        {
          name: "requires-5-mil",
          label: "dynamicForms.instructor.requires5MilLabel",
          type: "select",
          options: [
            { value: "false", label: "common.twoMillion", id: 1 },
            { value: "true", label: "common.fiveMillion", id: 2 },
          ],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // "condition": "model.VALID_ACTIVITIES.instructors.limits['2'] == true && model.VALID_ACTIVITIES.instructors.limits['5'] == true && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
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
          label: "dynamicForms.instructor.requires5MilLabel",
          type: "select",
          options: [{ value: "true", label: "common.fiveMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.instructor.limits['2'] == false && model.VALID_ACTIVITIES.instructor.limits['5'] == true && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
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
          label: "dynamicForms.instructor.requires5MilLabel",
          type: "select",
          options: [{ value: "false", label: "common.twoMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.instructor.limits['2'] == true && model.VALID_ACTIVITIES.instructor.limits['5'] == false && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["instructors"]["limits"]["2"]',
              depFieldValueCondition: "=",
              depFieldValue: "false",
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
          name: "participants",
          label: "dynamicForms.instructor.numberOfParticipants",
          type: "number",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: "policyType",
              depFieldValue: "event",
              depFieldValueCondition: "NotEmpty",
            },
          ],
        },
        {
          name: "coach-concussion",
          label: "dynamicForms.instructor.coachConcussionLabel",
          type: "radio",
          value: "false",
          options: [
            { value: "true", label: "common.yes", id: 1 },
            { value: "false", label: "common.no", id: 2 },
            { value: "na", label: "common.notAvailable", id: 3 },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // description:
          //   "<a href='https://rise.articulate.com/share/7m7dZI7BbiuCOsiT9ATV-zahc9YQYXB5#/' target='_blank' class='mt-3'>Concussion training can be accessed through the Tools / Forms dropdown or clicking this link</a>",
        },
        {
          name: "concussion-management",
          label: "dynamicForms.instructor.concussionManagementLabel",
          description:
            "dynamicForms.instructor.concussionManagementDescription",
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
          name: "concussion-management-distribute",
          label: "dynamicForms.instructor.concussionManagementDistributeLabel",
          description:
            "dynamicForms.instructor.concussionManagementDistributeDescription",
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
          name: "acknowledge-exclusions",
          label: "dynamicForms.instructor.acknowledgeExclusionLabel",
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
          label: "dynamicForms.instructor.nonOwnedLiabilityLabel",
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
          label: "dynamicForms.instructor.nonOwnedValidLicenseLabel",
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
          label: "dynamicForms.instructor.nonOwnedTransportLabel",
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
          label: "dynamicForms.instructor.nonOwnedRentingLabel",
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
          label: "dynamicForms.instructor.nonOwnedPhysicalDamageLabel",
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
          label: "dynamicForms.instructor.numberOfVehiclesLabel",
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
          label: "dynamicForms.instructor.nonOwnedPhysicalDamageAmountLabel",
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
