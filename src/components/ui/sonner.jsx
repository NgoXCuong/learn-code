import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="w-4 h-4" />,
        info: <InfoIcon className="w-4 h-4" />,
        warning: <TriangleAlertIcon className="w-4 h-4" />,
        error: <OctagonXIcon className="w-4 h-4" />,
        loading: <Loader2Icon className="w-4 h-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "linear-gradient(145deg, #f0f0f0, #d9d9d9)", // nền gradient để nổi 3D
        "--normal-text": "var(--popover-foregrzound)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
        "--toast-shadow":
          "5px 5px 15px rgba(0,0,0,0.15), -5px -5px 15px rgba(255,255,255,0.7)", // tạo depth 3D
      }}
      {...props}
    />
  );
};

export { Toaster };
