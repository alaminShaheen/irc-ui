import { DynamicJsonSchema } from "@/models/form/DynamicJsonFormTypes";

export const sportsSchema: DynamicJsonSchema = {
  id: "sports",
  title: "dynamicForms.sports.title",
  description: "dynamicForms.sports.description",
  formSections: [
    {
      id: "sports-section",
      key: "sports",
      fields: [
        {
          name: "non-owned-auto",
          label: "dynamicForms.sports.autoNonOwnedLabel",
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
          label: "dynamicForms.sports.policyTypeLabel",
          // description:
          //   "<a href='https://support.instantriskcoverage.com/en/knowledge-base/what-type-of-sporting-event-should-i-select' target='_blank' class='mt-3'>Click here to get help selecting the type of sporting event <i class='fa-solid fa-circle-question'></i></a>",
          type: "select",
          value: "event",
          options: [
            {
              value: "league",
              label: "dynamicForms.sports.policyTypeLabel1",
              id: 1,
            },
            {
              value: "tournament",
              label: "dynamicForms.sports.policyTypeLabel2",
              id: 2,
            },
            {
              value: "camp",
              label: "dynamicForms.sports.policyTypeLabel3",
              id: 3,
            },
            {
              value: "event",
              label: "Hourly Rental / One Time Event (Other)",
              id: 4,
            },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.selectedActivityType != null && model.selectedActivityType != 'sports-class-1' && model.selectedActivityType != 'sports-class-2'"
        },
        {
          name: "policyType",
          label: "dynamicForms.sports.policyTypeLabel",
          type: "select",
          value: "event",
          options: [
            {
              value: "event",
              label: "dynamicForms.sports.policyTypeLabel4",
              id: 1,
            },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.selectedActivityType !== null && (model.selectedActivityType == 'sports-class-1' || model.selectedActivityType == 'sports-class-2')"
        },
        {
          name: "requires-5-mil",
          label: "dynamicForms.sports.requires5MilLabel",
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
              depFieldName: 'VALID_ACTIVITIES["sports"]["limits"]["2"]',
              depFieldValue: "true",
              depFieldValueCondition: "=",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["sports"]["limits"]["5"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          label: "dynamicForms.sports.requires5MilLabel",
          type: "select",
          options: [{ value: "true", label: "common.fiveMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == false && model.VALID_ACTIVITIES.sports.limits['5'] == true && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["sports"]["limits"]["2"]',
              depFieldValue: "false",
              depFieldValueCondition: "=",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["sports"]["limits"]["5"]',
                  depFieldValue: "true",
                  depFieldValueCondition: "=",
                },
              ],
            },
          ],
        },
        {
          name: "requires-5-mil",
          label: "dynamicForms.sports.requires5MilLabel",
          type: "select",
          options: [{ value: "false", label: "common.twoMillion", id: 1 }],
          value: "false",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          // condition: "model.VALID_ACTIVITIES.sports.limits['2'] == true && model.VALID_ACTIVITIES.sports.limits['5'] == false && model.selectedActivityType != null && (model['selectedActivityType'] === 'low' || model['selectedActivityType'] === 'medium')"
          renderLogic: [
            {
              depFieldName: 'VALID_ACTIVITIES["sports"]["limits"]["2"]',
              depFieldValueCondition: "=",
              depFieldValue: "false",
              andGroup: [
                {
                  depFieldName: 'VALID_ACTIVITIES["sports"]["limits"]["5"]',
                  depFieldValueCondition: "=",
                  depFieldValue: "false",
                },
              ],
            },
          ],
        },
        {
          name: "participants",
          label: "dynamicForms.sports.numberOfParticipants",
          type: "number",
          validations: {
            required: "common.form.errors.fieldRequired",
          },
          renderLogic: [
            {
              depFieldName: "policyType",
              depFieldValueCondition: "=",
              depFieldValue: "event",
            },
          ],
        },
        {
          name: "teams-league",
          description: "dynamicForms.sports.teamLeaguesDescription",
          type: "text",
          renderLogic: [
            {
              depFieldName: "policyType",
              depFieldValueCondition: "=",
              depFieldValue: "league",
            },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },
        {
          name: "coach-concussion",
          label: "dynamicForms.sports.coachConcussionLabel",
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
          // description: "<a href='https://rise.articulate.com/share/7m7dZI7BbiuCOsiT9ATV-zahc9YQYXB5#/' target='_blank' class='mt-3'>Concussion training can be accessed through the Tools / Forms dropdown or clicking this link</a>",
          renderLogic: [
            {
              depFieldName: "policyType",
              depFieldValueCondition: "=",
              depFieldValue: "league",
            },
          ],
        },
        {
          name: "concussion-management-distribute",
          label: "dynamicForms.sports.concussionManagementLabel",
          description: "dynamicForms.sports.concussionManagementDescription",
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
              depFieldName: "policyType",
              depFieldValueCondition: "=",
              depFieldValue: "league",
            },
          ],
        },
        {
          name: "teams-tournament",
          label: "dynamicForms.sports.teamsTournamentLabel",
          type: "text",
          renderLogic: [
            {
              depFieldName: "policyType",
              depFieldValueCondition: "=",
              depFieldValue: "tournament",
            },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },
        {
          name: "players",
          label: "dynamicForms.sports.playersLabel",
          type: "text",
          renderLogic: [
            {
              depFieldName: "policyType",
              depFieldValueCondition: "=",
              depFieldValue: "camp",
            },
          ],
          validations: {
            required: "common.form.errors.fieldRequired",
          },
        },
        {
          name: "acknowledge-exclusions",
          label: "dynamicForms.sports.acknowledgeExclusionLabel",
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
          label: "dynamicForms.sports.nonOwnedLiabilityLabel",
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
          label: "dynamicForms.sports.nonOwnedValidLicenseLabel",
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
          label: "dynamicForms.sports.nonOwnedTransportLabel",
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
          label: "dynamicForms.sports.nonOwnedRentingLabel",
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
          label: "dynamicForms.sports.nonOwnedPhysicalDamageLabel",
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
          label: "dynamicForms.sports.numberOfVehiclesLabel",
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
          label: "dynamicForms.sports.nonOwnedPhysicalDamageAmountLabel",
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
