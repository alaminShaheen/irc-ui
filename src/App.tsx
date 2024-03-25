import { BrowserRouter, Route, Routes } from "react-router-dom";

import Quote from "@/pages/Quote";
import ROUTES from "@/constants/Routes";
import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppContextProvider } from "@/context/AppContext";

// Custom styling
import "./styles/global.css";
import AddEventForm from "@/components/Stepper/AddEventForm/AddEventForm";
import StepperContainer from "@/components/Stepper/StepperContainer/StepperContainer";
import ReviewAndSubmitSection from "@/components/Stepper/ReviewAndSubmitSection/ReviewAndSubmitSection";
import ApplicationAgreementForm from "@/components/Stepper/ApplicationAgreementForm/ApplicationAgreementForm";
import ApplicantInformationForm from "@/components/Stepper/ApplicantInformationForm/ApplicantInformationForm";
import TransportAndInsuranceForm from "@/components/Stepper/TransportAndInsuranceForm/TransportAndInsuranceForm";
import { StepperStepInformation } from "@/models/StepperStepInformation";

function App() {
  const stepperSteps: StepperStepInformation[] = [
    {
      title: "Application Agreement",
      subtitle: "lorem ipsum",
      route: ROUTES.STEPPER_FORM.APPLICATION_AGREEMENT,
      Component: ApplicationAgreementForm,
    },
    {
      title: "Applicant Information",
      subtitle: "lorem ipsum",
      route: ROUTES.STEPPER_FORM.APPLICANT_INFORMATION,
      Component: ApplicantInformationForm,
    },
    {
      title: "Transport & Insurance",
      subtitle: "lorem ipsum",
      route: ROUTES.STEPPER_FORM.TRANSPORT_AND_INSURANCE,
      Component: TransportAndInsuranceForm,
    },
    {
      title: "Add Events",
      subtitle: "lorem ipsum",
      route: ROUTES.STEPPER_FORM.ADD_EVENTS,
      Component: AddEventForm,
    },
    {
      title: "Review & Submit",
      subtitle: "lorem ipsum",
      route: ROUTES.STEPPER_FORM.REVIEW_AND_SUBMIT,
      Component: ReviewAndSubmitSection,
    },
  ];

  return (
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path={ROUTES.QUOTE} element={<Quote />} />
              <Route
                path={ROUTES.STEPPER_FORM.BASE}
                element={<StepperContainer steps={stepperSteps} />}
              >
                {stepperSteps.map((stepInformation) => (
                  <Route
                    key={stepInformation.title}
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
  );
}

export default App;
