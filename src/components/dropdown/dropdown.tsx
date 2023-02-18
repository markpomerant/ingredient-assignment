import "./dropdown.css";

interface InputSelectProps {
  label?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
  style?: Partial<React.CSSProperties>;
}

export const Dropdown: React.FC<InputSelectProps> = ({
  disabled = false,
  onChange,
  options,
  style = {},
  label,
}) => {
  const content = options.map((option) => (
    <div
      onClick={() => onChange(option.value)}
      key={`option-${option.value}`}
      className={option.disabled ? "disabled" : ""}
    >
      {option.label}
    </div>
  ));
  return (
    <div className="dropdown">
      <button>{label}</button>

      <div className="dropdown-content">{content}</div>
    </div>
  );
};
