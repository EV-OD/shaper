import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    unit?: string;
}

const CustomInput: React.FC<InputProps> = ({ label, unit = "m", ...inputProps }) => {
    // Render the label only if there is no value in inputProps.
    const showLabel = !inputProps.value;

    return (
        <div className="flex items-center justify-between bg-zinc-800 text-white rounded-sm px-3 py-1">
            {/* {showLabel && (
                <label htmlFor={label} className="font-semibold uppercase">
                    {label}:
                </label>
            )} */}
            <div className="flex items-center">
                <input
                placeholder={label}
                    id={label}
                    className="w-16 px-3 bg-zinc-900 text-right text-white outline-none !border-none rounded-xs p-1 mr-1 !border-0 "
                    {...inputProps}
                />
                <span className="text-zinc-400">{}</span>
            </div>
        </div>
    );
};

export default CustomInput;
