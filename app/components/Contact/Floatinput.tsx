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
                className={`absolute left-3.5 sm:left-4 max-w-[calc(100%-2rem)] truncate transition-all duration-200 pointer-events-none z-10 ${
                    active
                        ? `top-2 text-[10px] tracking-widest uppercase font-bold ${
                            focused === name ? "text-accent-current" : "text-muted-foreground"
                        }`
                        : `top-1/2 -translate-y-1/2 text-[13.5px] sm:text-sm ${
                            focused === name ? "text-accent-current" : "text-muted-foreground group-hover:text-foreground"
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
                <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
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
                className={`h-[56px] sm:h-[58px] w-full rounded-xl border bg-secondary/30 text-base sm:text-sm text-foreground outline-none transition-all duration-200 placeholder:text-xs sm:placeholder:text-sm placeholder:text-muted-foreground/70
                    ${active ? "pt-6 pb-2 px-3.5 sm:px-4" : "px-3.5 sm:px-4 py-3.5"}
                    ${icon ? "pl-10" : ""}
                    ${suffix ? "pr-16" : ""}
                    ${
                        focused === name
                            ? "border-accent-current ring-2 ring-accent-current/15 bg-background"
                            : "border-border/80 hover:border-accent-current/30"
                    }
                    disabled:bg-secondary disabled:cursor-not-allowed disabled:opacity-60
                `}
            />

            {/* Suffix (Optional) */}
            {suffix && (
                <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    {suffix}
                </div>
            )}
        </div>
    );
}
