import { useContext, createContext, ReactNode, useState, useMemo, useEffect } from 'react';

type ToastType = 'SUCCESS' | 'ERROR';

interface IToastMessage {
  toastType: ToastType;
  content: string;
}

interface IToastState {
  isOpened: boolean;
  message?: IToastMessage;
}

const initialToastState = { isOpened: false };
const ToastStateContext = createContext<IToastState>(initialToastState);
const ToastDispatchContext = createContext({});

export const useToastState = () => {
  const toastContext = useContext(ToastStateContext);
  if (!toastContext) throw new Error('Cannot use Toast provider');
  return toastContext;
};

export const useToast = () => {
  const dispatchToast = useContext(ToastDispatchContext);
  if (!dispatchToast) throw new Error('Cannot use Toast provider');
  return dispatchToast;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [toastState, setToastState] = useState<IToastState>(initialToastState);

  const success = (successMessage: string) => {
    setToastState({
      isOpened: true,
      message: {
        toastType: 'SUCCESS',
        content: successMessage,
      },
    });
  };

  const error = (errorMessage: string) => {
    setToastState({
      isOpened: true,
      message: {
        toastType: 'ERROR',
        content: errorMessage,
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setToastState(initialToastState);
    }, 2000);
  }, [toastState]);

  const actions = useMemo(() => ({ success, error }), []);

  return (
    <ToastStateContext.Provider value={toastState}>
      <ToastDispatchContext.Provider value={actions}>{children}</ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}
