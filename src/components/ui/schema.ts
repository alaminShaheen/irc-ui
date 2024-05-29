import { FormSection } from "@/models/form/DynamicJsonFormTypes";

export const surveyForm: FormSection[] = [
  {
    key: "js",
    title: "",
    renderLogic: [],
    depRenderConditionMode: "or",
    fields: [
      {
        type: "radio",
        options: [
          { label: "Yes", value: "yes", id: 1 },
          { label: "No", value: "no", id: 2 },
        ],
        name: "has-JS-Experience",
        label: "Do you have experience with JavaScript?",
      },
      {
        type: "number",
        name: "js-years-experience",
        label: "Years of experience with JavaScript?",
        validations: { max: { value: 20, message: "Cannot be more than 20" } },
        renderLogic: [
          {
            depFieldName: "has-JS-Experience",
            depFieldValue: "yes",
            depFieldValueCondition: "=",
          },
        ],
      },
      {
        type: "radio",
        options: [
          { label: "Yes", value: "yes", id: 1 },
          { label: "No", value: "no", id: 2 },
        ],
        name: "know-react",
        label: "Do you know React?",
        renderLogic: [
          {
            depFieldName: "js-years-experience",
            depFieldValueCondition: ">",
            depFieldValue: 2,
          },
        ],
        valueLogic: [
          {
            logic: [
              {
                depFieldName: "js-years-experience",
                depFieldValueCondition: ">",
                depFieldValue: 2,
                andGroup: [
                  {
                    depFieldName: "js-years-experience",
                    depFieldValueCondition: "<",
                    depFieldValue: 10,
                  },
                ],
              },
            ],
            value: "no",
          },
          {
            logic: [
              {
                depFieldName: "js-years-experience",
                depFieldValueCondition: ">",
                depFieldValue: 10,
              },
              {
                depFieldName: "js-years-experience",
                depFieldValueCondition: "<",
                depFieldValue: 20,
              },
            ],
            value: "yes",
          },
        ],
      },
      {
        type: "radio",
        options: [
          { label: "Yes", value: "yes", id: 1 },
          { label: "No", value: "no", id: 2 },
        ],
        name: "know-react-hook-form",
        label: "Do you know React Hook Form?",
        renderLogic: [
          {
            depFieldName: "know-react",
            depFieldValue: "yes",
            depFieldValueCondition: "=",
          },
        ],
      },
      {
        type: "text",
        name: "what-other-language",
        value: "",
        placeholder: "Node.js, Go, Python",
        label: "What other language do you know?",
        renderLogic: [
          {
            depFieldName: "has-JS-Experience",
            depFieldValue: "no",
            depFieldValueCondition: "=",
          },
        ],
      },
      {
        type: "text",
        name: "what-is-your-name",
        label: "What is your name?",
        depRenderConditionMode: "or",
        renderLogic: [
          {
            depFieldName: "has-JS-Experience",
            depFieldValue: "yes",
            depFieldValueCondition: "=",
            andGroup: [
              {
                depFieldName: "js-years-experience",
                depFieldValue: "",
                depFieldValueCondition: "NotEmpty",
              },
              {
                depFieldName: "know-react",
                depFieldValue: "",
                depFieldValueCondition: "NotEmpty",
              },
              {
                depFieldName: "know-react-hook-form",
                depFieldValue: "",
                depFieldValueCondition: "NotEmpty",
              },
            ],
          },
          {
            depFieldName: "has-JS-Experience",
            depFieldValue: "no",
            depFieldValueCondition: "=",
            andGroup: [
              {
                depFieldName: "what-other-language",
                depFieldValue: "",
                depFieldValueCondition: "NotEmpty",
              },
            ],
          },
        ],
      },
      {
        type: "text",
        name: "what-is-your-phone",
        label: "What is Your Phone?",
        renderLogic: [
          {
            depFieldName: "what-is-your-name",
            depFieldValue: "",
            depFieldValueCondition: "NotEmpty",
          },
        ],
      },
      {
        type: "submit",
        name: "submit-dev-survey",
        label: "Submit Survey",
        depRenderConditionMode: "or",
        renderLogic: [
          {
            depFieldName: "know-react",
            depFieldValue: "no",
            depFieldValueCondition: "=",
          },
          {
            depFieldName: "what-is-your-phone",
            depFieldValue: "",
            depFieldValueCondition: "NotEmpty",
          },
        ],
      },
    ],
    description: "",
  },
];
