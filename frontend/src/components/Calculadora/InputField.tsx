interface Props {
    label: string;
    type?: string;
    value: string | number;
    styles?: string
    onChange: (value: string) => void;
}

export const InputField = ({
  label,
  type = "text",
  value,
  onChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm w-[60%]">{label}</label>

      <input
        type={type}
        className="w-[40%] bg-white text-black px-2 py-1 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};