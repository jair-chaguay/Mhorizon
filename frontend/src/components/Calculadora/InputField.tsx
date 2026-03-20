interface Props {
    label: string;
    type?: string;
    value: string | number;
    styles?: string
    onChange: (value: string) => void;
}

export const InputField = ({label, type = "", value, onChange, styles=''}: Props) => {
    return (
        <div className="flex items-center gap-3 ">
            <label className=" mb-1">{label}</label>
            <input
                type={type}
                className={`${styles} border border-orange-500 border-2 px-3 py-1 rounded`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};