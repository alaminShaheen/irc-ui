import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import ROUTES from "@/constants/Routes";
import { StepperStepInformation } from "@/models/StepperStepInformation";
import { ApplicantInformationFormModel } from "@/models/form/ApplicantInformationFormModel";

type StepperContextType = {
  formValues: {
    applicantInformationForm: ApplicantInformationFormModel;
  };
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setFormValues: Dispatch<SetStateAction<StepperContextType["formValues"]>>;
  stepperStepInformation: StepperStepInformation[];
  activeStepIndex: number;
  changingRouteTo: string;
  switchRoute: () => void;
  changeRouteTo: (stepperIndex: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

const STEPPER_CONTEXT_DEFAULT_VALUES: StepperContextType = {
  formValues: {
    applicantInformationForm: {
      address: "",
      name: "",
      bestAbilityAcknowledgement: false,
      personalInformationCollectionAgreement: false,
    },
  },
  changeRouteTo: () => {},
  switchRoute: () => {},
  activeStepIndex: -1,
  setFormValues: () => {},
  changingRouteTo: "",
  isLoading: false,
  setIsLoading: () => {},
  stepperStepInformation: [],
  goToNextStep: () => {},
  goToPreviousStep: () => {},
};
export const StepContext = createContext<StepperContextType>(
  STEPPER_CONTEXT_DEFAULT_VALUES,
);

type StepperContextProviderProps = {
  children: ReactNode;
};

export const StepperContextProvider = (props: StepperContextProviderProps) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [changingRouteTo, setChangingRouteTo] = useState("");
  const [formValues, setFormValues] = useState<
    StepperContextType["formValues"]
  >({
    applicantInformationForm: {
      name: "",
      bestAbilityAcknowledgement: false,
      personalInformationCollectionAgreement: false,
      address: "",
    },
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const stepperSteps: StepperStepInformation[] = useMemo(
    () => [
      {
        id: 1,
        title: t("pages.stepperForm.applicationAgreement.title"),
        subtitle: t("pages.stepperForm.applicationAgreement.subtitle"),
        route: ROUTES.STEPPER_FORM.APPLICANT_INFORMATION,
      },
      {
        id: 3,
        title: t("pages.stepperForm.transportAndInsurance.title"),
        subtitle: t("pages.stepperForm.transportAndInsurance.subtitle"),
        route: ROUTES.STEPPER_FORM.TRANSPORT_AND_INSURANCE,
      },
      {
        id: 4,
        title: t("pages.stepperForm.addEvents.title"),
        subtitle: t("pages.stepperForm.addEvents.subtitle"),
        route: ROUTES.STEPPER_FORM.ADD_EVENTS,
      },
      {
        id: 5,
        title: t("pages.stepperForm.reviewAndSubmit.title"),
        subtitle: t("pages.stepperForm.reviewAndSubmit.subtitle"),
        route: ROUTES.STEPPER_FORM.REVIEW_AND_SUBMIT,
      },
    ],
    [t],
  );

  const changeRouteTo = useCallback(
    (stepperIndex: number) => {
      setChangingRouteTo(stepperSteps[stepperIndex].route);
    },
    [stepperSteps],
  );

  const switchRoute = useCallback(() => {
    if (changingRouteTo) {
      navigate(changingRouteTo);
      setChangingRouteTo("");
    }
  }, [navigate, changingRouteTo]);

  const activeStepIndex = useMemo(() => {
    return Math.max(
      stepperSteps.findIndex((step) => pathname.search(step.route) >= 0),
      0,
    );
  }, [pathname, stepperSteps]);

  const goToNextStep = useCallback(() => {
    if (activeStepIndex < stepperSteps.length - 1) {
      navigate(stepperSteps[activeStepIndex + 1].route);
    }
  }, [activeStepIndex, navigate, stepperSteps]);

  const goToPreviousStep = useCallback(() => {
    if (activeStepIndex > 0) {
      navigate(stepperSteps[activeStepIndex - 1].route);
    }
  }, [activeStepIndex, navigate, stepperSteps]);

  return (
    <StepContext.Provider
      value={{
        goToPreviousStep,
        goToNextStep,
        switchRoute,
        changeRouteTo,
        changingRouteTo,
        setFormValues,
        isLoading,
        activeStepIndex,
        formValues,
        setIsLoading,
        stepperStepInformation: stepperSteps,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStepperContext = () => {
  return useContext(StepContext);
};
