import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const Avatar = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 ${className}`}
      {...props}
    />
  )
);

const AvatarImage = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  )
);

const AvatarFallback = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold ${className}`}
      {...props}
    />
  )
);

export {
  Avatar,
  AvatarImage,
  AvatarFallback
};