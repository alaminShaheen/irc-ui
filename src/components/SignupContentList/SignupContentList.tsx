import { LanguageCode } from "@/models/enums/LanguageCode";
import { ISignupContentList } from "./SignupContentList.d";
import Icon from "@/components/ui/Icon";

import Speedometer from "../AppIcons/SpeedometerIcon";
import RecurringTasks from "../AppIcons/RecurringTaskIcon";
import AllInOne from "../AppIcons/AllInOneIcon";

const iconMapper: {
  [key: string]: JSX.Element;
} = {
  speedometer: <Speedometer />,
  recurringTasks: <RecurringTasks />,
  allInOne: <AllInOne />,
};

const SignupContentList = (
  props: ISignupContentList & { currentLanguage: LanguageCode },
) => {
  const {
    signupProposition: { iconPath, title, title_fr, content, content_fr },
    currentLanguage,
  } = props;

  return (
    <li>
      <div className="flex flex-row items-start gap-x-4">
        <div className="flex-shrink-0 flex-grow-0">
          <Icon src={iconMapper[iconPath]} alt={iconPath} size={30} />
        </div>
        <div className="flex-grow">
          <h3 className="mb-4 font-segoe text-[21px] font-semibold">
            {currentLanguage === LanguageCode.ENGLISH ? title : title_fr}
          </h3>
          <p className="font-Roboto text-base leading-[22.4px] xl:w-[68%]">
            {currentLanguage === LanguageCode.ENGLISH ? content : content_fr}
          </p>
        </div>
      </div>
    </li>
  );
};

export default SignupContentList;
