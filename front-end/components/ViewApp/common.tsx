import { get, isUndefined, snakeCase } from "lodash";
import { App } from "../types";

/**
 * Get `defaultValues` for all the inputs in `input_inputs`
 * @param input_inputs
 * @returns initialValues
 */
export const getInitialValues = (input_inputs: App["input_inputs"]) => {
  return Object.keys(input_inputs).reduce((accum, key) => {
    const name = get(input_inputs, [key, "props", "name"]);
    if (isUndefined(name)) return accum;

    const props = input_inputs[key]["props"];
    const component = input_inputs[key]["component"];

    let initialValue: any = "None";
    if ("defaultValue" in props) initialValue = props["defaultValue"];
    else if ("defaultChecked" in props) initialValue = props["defaultChecked"];
    else if (component == "MultipleSelect") initialValue = [];
    else if (component == "SingleSelect")
      initialValue = get(props, ["options", "0"]);
    else if (component == "RangeSlider")
      initialValue = [props["defaultMinValue"], props["defaultMaxValue"]];
    else if (component == "DateTimePicker") initialValue = new Date();

    return {
      ...accum,
      [name]: initialValue,
    };
  }, {});
};

export const parseInvalidJson = (
  json: string,
  errorCallback: (e: any) => void
) => {
  // Handle non-JSON serializable values: NaN, Infinity, -Infinity
  json = json
    .replace(/ -Infinity/g, '"-Infinity"')
    .replace(/ Infinity/g, '"Infinity"')
    .replace(/ NaN/g, '"NaN"');
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error(e);
    errorCallback(e);
    return { error: `Failed to parse: ${json}` };
  }
};

/**
 * Formats a dateTime string to be more readable
 * @param dateTime date time string to format ("2021-08-17T19:02:26.307944-06:00")
 * @returns Aug 17 2021
 */
export function formatDate(dateTime: string): string {
  const date = new Date(dateTime);
  return date.toDateString().slice(4);
}

export const getTargetValue = (e: any, name: string) => {
  let newValue;
  if (!!e.target)
    switch (e.target.type) {
      case "number":
        newValue = e.target.valueAsNumber;
        if (isNaN(newValue)) newValue = "None";
        break;
      case "checkbox":
        newValue = e.target.checked;
        break;
      default:
        // text
        newValue = e.target.value;
        break;
    }
  else newValue = e;

  // Transform `newValue`
  // (1) If `name` attribute, force snake case. Allow adding spaces
  if (name === "name" && /[\w\d]$/.test(newValue)) return snakeCase(newValue);

  return newValue;
};
