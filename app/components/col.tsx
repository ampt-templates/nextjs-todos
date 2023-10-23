import { CSSProperties } from "react";

export const Col: React.FC<{
  children: React.ReactNode;
  className?: string;
  css?: CSSProperties;
}> = ({ children, className, css }) => {
  const twClasses = `flex flex-col ${className ? className : ""}`;

  return (
    <div className={twClasses} style={css}>
      {children}
    </div>
  );
};
