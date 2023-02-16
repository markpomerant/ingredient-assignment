import { useId, useState, useCallback } from "react";

interface Props {
  value?: string | number;
  label?: string;
  onChange: (value: string) => void;
}
export const InputText: React.FunctionComponent<Props> = ({
  onChange,
  value,
  label,
}) => {
  const id = useId();
  const [input, setInput] = useState(value ?? "");

  const handleInputChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [setInput]
  );

  const handleUpdate = useCallback(() => {
    onChange(String(input));
  }, [input, onChange]);
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <label htmlFor={id}>{label || "Input"}</label>
      <input
        id={id}
        value={input}
        onBlur={handleUpdate}
        onChange={handleInputChanged}
      />
    </div>
  );
};
