import { Helmet } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Quote from "@/pages/Quote";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import ROUTES from "@/constants/Routes";
import Layout from "@/components/Layout/Layout";
import ConfirmIdentity from "@/pages/ConfirmIdentity";
import AddEventForm from "@/components/Stepper/AddEventForm/AddEventForm";
import StepperContainer from "@/components/Stepper/StepperContainer/StepperContainer";
import { ThemeProvider } from "@/context/ThemeContext";
import ApplicantInformation from "@/pages/ApplicantInformation";
import { AppContextProvider } from "@/context/AppContext";
import ReviewAndSubmitSection from "@/components/Stepper/ReviewAndSubmitSection/ReviewAndSubmitSection";
import ApplicantInformationForm from "@/components/Stepper/ApplicantInformationForm/ApplicantInformationForm";
import TransportAndInsuranceForm from "@/components/Stepper/TransportAndInsuranceForm/TransportAndInsuranceForm";
import { StepperStepInformation } from "@/models/StepperStepInformation";

// Custom styling
import "./styles/global.css";

function App() {
  const stepperSteps: StepperStepInformation[] = [
    {
      id: 1,
      route: ROUTES.STEPPER_FORM.APPLICANT_INFORMATION,
      Component: ApplicantInformation,
    },
    {
      id: 2,
      route: ROUTES.STEPPER_FORM.APPLICATION_AGREEMENT,
      Component: ApplicantInformationForm,
    },
    {
      id: 3,
      route: ROUTES.STEPPER_FORM.TRANSPORT_AND_INSURANCE,
      Component: TransportAndInsuranceForm,
    },
    {
      id: 4,
      route: ROUTES.STEPPER_FORM.ADD_EVENTS,
      Component: AddEventForm,
    },
    {
      id: 5,
      route: ROUTES.STEPPER_FORM.REVIEW_AND_SUBMIT,
      Component: ReviewAndSubmitSection,
    },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="description"
          content="At Instant Risk Coverage, we believe the insurance system should be built to work for everyone. That’s why we have created an insurance technology platform that lets you purchase insurance on your own terms 24/7."
        />
        <meta
          name="keywords"
          content="At Instant Risk Coverage, we believe the insurance system should be built to work for everyone. That’s why we have created an insurance technology platform that lets you purchase insurance on your own terms 24/7."
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Helmet>
      <BrowserRouter>
        <AppContextProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Layout>
              <Routes>
                <Route
                  path={ROUTES.HOME}
                  element={<Navigate to={ROUTES.SIGNUP} replace />}
                />
                <Route path={ROUTES.SIGNIN} element={<Signin />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
                <Route path={ROUTES.QUOTE} element={<Quote />} />
                <Route
                  path={ROUTES.IDENTITY_CONFIRM}
                  element={<ConfirmIdentity />}
                />
                <Route
                  path={ROUTES.STEPPER_FORM.BASE}
                  element={<StepperContainer steps={stepperSteps} />}
                >
                  <Route
                    index
                    Component={() => (
                      <Navigate
                        to={ROUTES.STEPPER_FORM.APPLICANT_INFORMATION}
                        replace
                      />
                    )}
                  />
                  {stepperSteps.map((stepInformation) => (
                    <Route
                      key={stepInformation.id}
                      path={stepInformation.route}
                      Component={stepInformation.Component}
                    />
                  ))}
                </Route>
              </Routes>
            </Layout>
          </ThemeProvider>
        </AppContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
