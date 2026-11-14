import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

const Label = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={`text-sm font-medium text-gray-700 ${className}`}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
export default Label;