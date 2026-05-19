"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss?: () => void;
  duration?: number;
}

export default function Toast({
  message,
  visible,
  onDismiss,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (visible && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss, duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[60] flex justify-center pointer-events-none">
      <div className="mx-4 px-5 py-3 bg-[#1E293B] text-white text-sm font-medium rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-sm">
        {message}
      </div>
    </div>
  );
}
