import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className="btn-primary btn relative rounded-lg px-5 py-2 text-lg font-semibold text-neutral-50 "
    >
      {children}
    </button>
  )
);
