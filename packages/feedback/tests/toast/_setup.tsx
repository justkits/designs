import { Toaster } from "@/toast/Toaster";
import { ToastsComponentProps, ToastObject } from "@/toast/types";

function TestToastGroup({ toasts }: Readonly<ToastsComponentProps>) {
  const handleDismiss = (toast: ToastObject) => {
    // and then dismiss the toast
    toast.dismiss();
  };

  return (
    <div>
      {toasts.map((toast) => (
        <div key={toast.id}>
          <p>{toast.message}</p>
          <button onClick={() => handleDismiss(toast)}>Dismiss</button>
        </div>
      ))}
    </div>
  );
}

export function TestComponent({ maxToasts }: Readonly<{ maxToasts?: number }>) {
  return <Toaster ToastsComponent={TestToastGroup} maxToasts={maxToasts} />;
}
