import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: { Svg: React.FC<React.SVGProps<SVGSVGElement>>; title: string };
  ghost?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, placeholder, label, icon, ghost, ...props }, ref) =>
    ghost ? (
      <input
        {...props}
        id={id}
        ref={ref}
        placeholder={placeholder}
        className="input-ghost input h-8 w-full border-none p-0 px-2 sm:text-sm"
      />
    ) : (
      <label
        htmlFor={id}
        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
          {...props}
          id={id}
          ref={ref}
          placeholder={placeholder}
          className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />
        <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
          {placeholder}
        </span>
        {icon && (
          <span className="absolute inset-y-0 right-0 grid w-10 place-content-center">
            {/* <Tooltip
            title={icon.title}
            html={
              <button
                type="button"
                className="rounded-full bg-rose-600 p-0.5 text-white hover:bg-rose-700"
              >
                <icon.Svg />
              </button>
            }
          /> */}
          </span>
        )}
      </label>
    )
);
