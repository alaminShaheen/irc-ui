const ROUTES = {
  // Add app router routes here
  QUOTE: "/quote",
  STEPPER_FORM: {
    BASE: "/form",
    APPLICANT_INFORMATION: "applicant-information",
    APPLICATION_AGREEMENT: "application-agreement",
    TRANSPORT_AND_INSURANCE: "transport-and-insurance",
    ADD_EVENTS: "add-events",
    REVIEW_AND_SUBMIT: "review-and-submit",
  },
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  HOME: "/",
  IDENTITY_CONFIRM: "/confirm-identity",
  FORGET_PASSWORD: "/forget-password",
  // REGISTER: "/register",
  // CREATE_GROUP: "/create-group",
  // GROUP: {
  // 	BASE: "/group/:slug",
  // 	CREATE_POST: "create-post",
  // 	POST_DETAILS: "post/:postSlug",
  // },
  // USER_PROFILE: "/profile/:userId",
};

export default ROUTES;
