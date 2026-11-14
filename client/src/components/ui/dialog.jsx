import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={`fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in ${className}`}
      {...props}
    />
  )
);

const DialogContent = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={`fixed left-1/2 top-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl outline-none ${className}`}
        {...props}
      >
        {children}

        <DialogPrimitive.Close className="absolute right-4 top-4 text-gray-500 hover:text-black">
          ✕
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);

const DialogHeader = ({ className = "", ...props }) => (
  <div className={`flex flex-col gap-2 ${className}`} {...props} />
);

const DialogTitle = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-xl font-semibold ${className}`}
      {...props}
    />
  )
);

const DialogDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    />
  )
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
};