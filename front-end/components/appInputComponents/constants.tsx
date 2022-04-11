export const commonProps = {
  name: `input_name`,
  label: "New Input",
};

// Register all component types here
export const COMPONENT_TYPES = [
  // User Input
  "NumberInput",
  "TextInput",
  "FileInput",
  "SingleSelect",
  "MultipleSelect",
  "Checkbox",
  "Slider",
  "RangeSlider",
  "ColorPicker",
  "DateTimePicker",
  // Visual Input
  "RichText",
];

// HTML attributes that have to be passed into InputProps (ie. passed to native html input)
export const INPUT_PROPS = [
  "min",
  "max",
  "step",
  "minLength",
  "maxLength",
  "pattern",
];

export interface DefaultProps {
  required?: {
    [prop: string]: any;
  };
  optional?: {
    [prop: string]: any;
  };
  advanced?: {
    [prop: string]: any;
  };
}
