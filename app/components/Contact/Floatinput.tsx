"use client";

interface FloatInputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    focused: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    required?: boolean;
    icon?: React.ReactNode;
    suffix?: string;
    placeholder?: string;
}

export default function FloatInput({
    label,
    name,
    type,
    value,
    focused,
    onChange,
    onFocus,
    onBlur,
    required = false,
    icon,
    suffix,
    placeholder,
}: FloatInputProps) {
    const active = focused === name || value.length > 0;

    return (
        <div className="relative w-full group">
            {/* Label */}
            <label
                htmlFor={name}
                className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
                    active
                        ? `top-2 text-[10px] tracking-widest uppercase font-bold ${
                            focused === name ? "text-primary" : "text-textMuted"
                        }`
                        : `top-1/2 -translate-y-1/2 text-sm ${
                            focused === name ? "text-primary" : "text-textMuted/60 group-hover:text-textMuted"
                        }`
                }`}
            >
                {label}
                {required && (
                    <span className="text-red-500 ml-0.5 text-xs">*</span>
                )}
            </label>

            {/* Icon (Optional) */}
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    {icon}
                </div>
            )}

            {/* Input */}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete="off"
                placeholder={active ? placeholder : ""}
                required={required}
                className={`w-full rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-200 bg-secondary/30 text-foreground placeholder:text-textMuted/50 placeholder:text-sm
                    ${active ? "pt-7 pb-3" : "pt-3 pb-3"}
                    ${icon ? "pl-10" : "px-4"}
                    ${suffix ? "pr-16" : "pr-4"}
                    ${
                        focused === name
                            ? "border-primary ring-1 ring-primary bg-background shadow-sm"
                            : "border-border hover:border-textMuted/30"
                    }
                    disabled:bg-secondary disabled:cursor-not-allowed disabled:opacity-60
                `}
            />

            {/* Suffix (Optional) */}
            {suffix && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 pointer-events-none">
                    {suffix}
                </div>
            )}

            {/* Bottom Border Animation (Alternative Design) */}
            {/* <div className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${focused === name ? "w-full" : "w-0"}`} /> */}
        </div>
    );
}