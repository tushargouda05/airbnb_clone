import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef(
  ({ className = "", align = "center", ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={8}
        className={`z-50 rounded-xl border border-gray-200 bg-white p-4 shadow-xl outline-none ${className}`}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);

PopoverContent.displayName = "PopoverContent";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor
};