import {
  ConditionalLogic,
  ConditionMode,
  InputValue,
} from "@/models/form/DynamicJsonFormTypes";

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

export const checkConditionalLogic = (
  rootFieldName: string,
  watchList: Record<string, InputValue>,
  logicTrueIf?: ConditionMode,
  conditionalLogic?: ConditionalLogic[],
) => {
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

    const fieldName = condLogic.depFieldName;
    const condOperator = condLogic.depFieldValueCondition;
    const fieldValue = watchList[fieldName];
    const expectedValue = condLogic.depFieldValue;
    const andGroup = condLogic.andGroup;

    result = evalConditionalLogic(fieldValue, condOperator, expectedValue);

    if (andGroup && andGroup.length > 0) {
      andGroupConditionsMet = true;
      for (const andGroupLogic of andGroup) {
        const andFieldName = andGroupLogic.depFieldName;
        const andCondOp = andGroupLogic.depFieldValueCondition;
        const andFieldValue = watchList[andFieldName];
        const andExpectedValue = andGroupLogic.depFieldValue;
        andGroupConditionsMet &&=
          evalConditionalLogic(andFieldValue, andCondOp, andExpectedValue) &&
          checkConditionalLogic(
            andFieldName,
            watchList,
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
