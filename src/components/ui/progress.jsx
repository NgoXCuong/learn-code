import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

const Progress = React.forwardRef(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value} // 🔥 quan trọng
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-200", // đổi màu nền dễ thấy
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-blue-500 transition-transform"
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
