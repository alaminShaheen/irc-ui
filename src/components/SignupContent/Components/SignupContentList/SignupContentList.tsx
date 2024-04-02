import { ISignupContentList } from "./SignupContentList.d";
import Icon from "@/components/ui/Icon";

import Speedometer from "../../../AppIcons/SpeedometerIcon";
import RecurringTasks from "../../../AppIcons/RecurringTaskIcon";
import AllInOne from "../../../AppIcons/AllInOneIcon";

const iconMapper: {
  [key: string]: JSX.Element;
} = {
  speedometer: <Speedometer />,
  recurringTasks: <RecurringTasks />,
  allInOne: <AllInOne />,
};

const SignupContentList = (props: ISignupContentList) => {
  const {
    signupProposition: { iconPath, title, content },
  } = props;

  return (
    <li>
      <div className="flex flex-row items-start gap-x-4">
        <div>
          <Icon src={iconMapper[iconPath]} alt={iconPath} size={30} />
        </div>
        <div>
          <h2 className="mb-4 font-segoe text-[21px] font-semibold">{title}</h2>
          <p className="font-Roboto text-base leading-[22.4px] xl:w-[68%]">
            {content}
          </p>
        </div>
      </div>
    </li>
  );
};

export default SignupContentList;
