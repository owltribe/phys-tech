"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
    return <Toaster
      toastOptions={{
        duration: 5000
      }}
    />
};

export default ToastProvider