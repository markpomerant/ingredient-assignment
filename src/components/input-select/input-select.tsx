import { useCallback, useId, useState } from "react";

interface InputSelectProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
  style?: Partial<React.CSSProperties>;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  defaultValue,
  disabled = false,
  onChange,
  options,
  style = {},
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
      {label && <label htmlFor={id}>{label || "Input"}</label>}
      <select
        style={style}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={handleInputChanged}
        value={input}
      >
        {options.map((option, index) => (
          <option
            key={`${option.label}-${index}`}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
