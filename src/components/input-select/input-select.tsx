import { useCallback, useId, useState } from "react";

interface InputSelectProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export const InputSelect: React.FC<InputSelectProps> = ({
  defaultValue,
  disabled = false,
  onChange,
  options,

  label,
}) => {
  const id = useId();
  const [input, setInput] = useState(defaultValue);

  const handleInputChanged = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setInput(e.target.value);
      onChange(e.target.value);
    },
    [setInput, onChange]
  );
  return (
    <div>
      <label htmlFor={id}>{label || "Input"}</label>
      <select
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleInputChanged}
        value={input}
      >
        {options.map((option, index) => (
          <option key={`${option.label}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
