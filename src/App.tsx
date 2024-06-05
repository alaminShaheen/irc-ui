import { Helmet } from "react-helmet-async";
import { Bounce, ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { APIProvider as GooglePlacesAPIProvider } from "@vis.gl/react-google-maps";

import Quote from "@/pages/Quote";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import ROUTES from "@/constants/Routes";
import Layout from "@/components/Layout/Layout";
import ConfirmIdentity from "@/pages/ConfirmIdentity";
import StepperContainer from "@/components/Stepper/StepperContainer/StepperContainer";
import { ThemeProvider } from "@/context/ThemeContext";
import ApplicantInformation from "@/pages/ApplicantInformation";
import AddEvent from "@/pages/AddEvent";
import { AppContextProvider } from "@/context/AppContext";
import ReviewAndSubmitSection from "@/components/Stepper/ReviewAndSubmitSection/ReviewAndSubmitSection";
import TransportAndInsuranceForm from "@/components/Stepper/TransportAndInsuranceForm/TransportAndInsuranceForm";

// Custom styling
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import Builder from "@/components/FormBuilder/Builder";

function App() {
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
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <GooglePlacesAPIProvider
        apiKey={process.env.GOOGLE_MAPS_API_KEY as string}
      >
        <BrowserRouter>
          <AppContextProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <Layout>
                <Routes>
                  <Route path={"/builder"} element={<Builder />} />
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
                    Component={StepperContainer}
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
                    <Route
                      Component={ApplicantInformation}
                      path={ROUTES.STEPPER_FORM.APPLICANT_INFORMATION}
                    />

                    <Route
                      Component={AddEvent}
                      path={ROUTES.STEPPER_FORM.ADD_EVENTS}
                    />

                    <Route
                      Component={TransportAndInsuranceForm}
                      path={ROUTES.STEPPER_FORM.TRANSPORT_AND_INSURANCE}
                    />

                    <Route
                      Component={ReviewAndSubmitSection}
                      path={ROUTES.STEPPER_FORM.REVIEW_AND_SUBMIT}
                    />
                  </Route>
                </Routes>
              </Layout>
            </ThemeProvider>
          </AppContextProvider>
        </BrowserRouter>
      </GooglePlacesAPIProvider>
    </>
  );
}

export default App;
