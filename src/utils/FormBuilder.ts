import {
  ConditionalLogic,
  ConditionMode,
  InputValue,
} from "@/models/form/DynamicJsonFormTypes";
import { ValidActivities } from "@/models/form/ValidActivities";

const evalConditionalLogic = (
  value: InputValue,
  condOp: string,
  expectedValue: InputValue,
): boolean => {
  switch (condOp) {
    case "NotEmpty":
      if (typeof value === "string") {
        return value.length > 0;
      } else return typeof value !== "undefined";
    case "!=":
      return value !== expectedValue;
    case "<":
      return value < expectedValue;
    case "<=":
      return value <= expectedValue;
    case "=":
      return value === expectedValue;
    case ">":
      return value > expectedValue;
    default:
      return false;
  }
};

const getValidActivityFieldValue = (
  validActivities: ValidActivities,
  objectString: string,
) => {
  const propertyNames = objectString
    .split(/\[(?:'([^']*)'|"([^"]*)")]/)
    .filter(Boolean)
    .slice(1) as (keyof typeof validActivities.value)[];

  return propertyNames.reduce(
    (currentValue, propertyName) => {
      return currentValue[propertyName];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validActivities.value as Record<string, any>,
  );
};

export const checkConditionalLogic = (
  _rootFieldName: string,
  watchList: Record<string, InputValue>,
  validActivities: ValidActivities,
  logicTrueIf?: ConditionMode,
  conditionalLogic?: ConditionalLogic[],
): boolean => {
  if (!conditionalLogic) {
    return true;
  }
  let andGroupConditionsMet = true;
  let result = true;
  let runningCond = true;

  const conditionType = logicTrueIf === "or" ? "or" : "and";
  if (conditionType === "or") {
    runningCond = false;
  }

  for (let i = 0; i < conditionalLogic.length; i++) {
    const condLogic = conditionalLogic[i];

    const checkingValidActivities = condLogic.depFieldName.includes(
      validActivities.key,
    );

    const fieldName = condLogic.depFieldName;
    const condOperator = condLogic.depFieldValueCondition;
    const fieldValue = checkingValidActivities
      ? (getValidActivityFieldValue(
          validActivities,
          fieldName,
        ) as unknown as InputValue)
      : watchList[fieldName];
    const expectedValue = condLogic.depFieldValue;
    const andGroup = condLogic.andGroup;

    result = evalConditionalLogic(fieldValue, condOperator, expectedValue);

    if (andGroup && andGroup.length > 0) {
      andGroupConditionsMet = true;
      for (const andGroupLogic of andGroup) {
        const checkingValidActivities = andGroupLogic.depFieldName.includes(
          validActivities.key,
        );
        const andFieldName = andGroupLogic.depFieldName;
        const andCondOp = andGroupLogic.depFieldValueCondition;
        const andFieldValue = checkingValidActivities
          ? (getValidActivityFieldValue(
              validActivities,
              fieldName,
            ) as unknown as InputValue)
          : watchList[andFieldName];
        const andExpectedValue = andGroupLogic.depFieldValue;
        andGroupConditionsMet &&=
          evalConditionalLogic(andFieldValue, andCondOp, andExpectedValue) &&
          checkConditionalLogic(
            andFieldName,
            watchList,
            validActivities,
            "and",
            andGroupLogic.andGroup,
          );
        if (!andGroupConditionsMet) {
          break;
        }
      }
      result &&= andGroupConditionsMet;
    }

    if (conditionType === "and") {
      runningCond &&= result;
    } else {
      runningCond ||= result;

      if (runningCond) {
        break;
      }
    }
  }

  return runningCond;
};
