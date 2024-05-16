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

export type StepperContextType = {
  formValues: {
    applicantInformationForm: ApplicantInformationFormModel & {
      enterManualAddress: boolean;
    };
  };
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setFormValues: Dispatch<SetStateAction<StepperContextType["formValues"]>>;
  stepperStepInformation: StepperStepInformation[];
  currentStepIndex: number;
  changingRouteTo: string;
  switchRoute: () => void;
  changeRouteTo: (stepperIndex: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

export const STEPPER_CONTEXT_DEFAULT_VALUES: StepperContextType = {
  formValues: {
    applicantInformationForm: {
      address: "",
      name: "",
      bestAbilityAcknowledgement: false,
      personalInformationCollectionAgreement: false,
      enterManualAddress: false,
    },
  },
  changeRouteTo: () => {},
  switchRoute: () => {},
  currentStepIndex: -1,
  setFormValues: () => {},
  changingRouteTo: "",
  isLoading: false,
  setIsLoading: () => {},
  stepperStepInformation: [],
  goToNextStep: () => {},
  goToPreviousStep: () => {},
};
export const StepperContext = createContext<StepperContextType>(
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
      enterManualAddress: false,
    },
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const stepperSteps: StepperStepInformation[] = useMemo(
    () => [
      {
        id: 1,
        title: t("pages.stepperForm.applicantInformation.title"),
        subtitle: t("pages.stepperForm.applicantInformation.subtitle"),
        route: ROUTES.STEPPER_FORM.APPLICANT_INFORMATION,
      },
      {
        id: 2,
        title: t("pages.stepperForm.addEvents.title"),
        subtitle: t("pages.stepperForm.addEvents.subtitle"),
        route: ROUTES.STEPPER_FORM.ADD_EVENTS,
      },
      {
        id: 3,
        title: t("pages.stepperForm.transportAndInsurance.title"),
        subtitle: t("pages.stepperForm.transportAndInsurance.subtitle"),
        route: ROUTES.STEPPER_FORM.TRANSPORT_AND_INSURANCE,
      },
      {
        id: 4,
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

  const currentStepIndex = useMemo(() => {
    return Math.max(
      stepperSteps.findIndex((step) => pathname.search(step.route) >= 0),
      0,
    );
  }, [pathname, stepperSteps]);

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < stepperSteps.length - 1) {
      navigate(stepperSteps[currentStepIndex + 1].route);
    }
  }, [currentStepIndex, navigate, stepperSteps]);

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      navigate(stepperSteps[currentStepIndex - 1].route);
    }
  }, [currentStepIndex, navigate, stepperSteps]);

  return (
    <StepperContext.Provider
      value={{
        goToPreviousStep,
        goToNextStep,
        switchRoute,
        changeRouteTo,
        changingRouteTo,
        setFormValues,
        isLoading,
        currentStepIndex: currentStepIndex,
        formValues,
        setIsLoading,
        stepperStepInformation: stepperSteps,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export const useStepperContext = () => {
  return useContext(StepperContext);
};
