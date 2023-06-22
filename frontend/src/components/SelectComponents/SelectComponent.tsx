import { useState } from "react";
import AsyncSelect from "react-select/async";
import { get } from "@/adapters/xhr";

interface PropsOptions {
  idKey: string;
  labelKey: string;
  data: any;
  selectFor?: string;
  setValue?: any;
  disabled?: boolean;
  disableKey?: string;
  setDisable?: any;
  selectedValue?: string;
  setSelectedValue?: any;
}

function SelectComponent({
  idKey,
  labelKey,
  selectFor,
  data,
  setValue,
  selectedValue,
  setSelectedValue,
  disabled = false,
}: PropsOptions) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (value: any) => {
    if (!setSelectedValue) {
      setValue(value);
    } else {
      setSelectedValue(value);
      setValue(value[idKey]);
    }
  };

  const handleInputChange = (input: any) => {
    setInputValue(input);
  };

  const loadOptions = async () => {
    console.log("load option called");
    const matchedOptions = data.filter((option: any) =>
      option[labelKey].toLowerCase().includes(inputValue.toLowerCase())
    );
    if (selectFor && matchedOptions.length > 0) {
      return Promise.resolve(matchedOptions);
    }
    const response = await get(`${selectFor}?${labelKey}=${inputValue}`);
    console.log(response);
    return Promise.resolve(response.data.data);
  };

  return (
    <AsyncSelect
      options={data}
      defaultOptions={data}
      value={selectedValue}
      loadOptions={loadOptions}
      getOptionValue={(option: any) => {
        return option[idKey];
      }}
      getOptionLabel={(option: any) => option[labelKey]}
      onChange={handleChange}
      // onInputChange={(input) => setInputValue(input)}
      onInputChange={(input) => handleInputChange(input)}
      isDisabled={disabled}
      isClearable
    />
  );
}

export default SelectComponent;
