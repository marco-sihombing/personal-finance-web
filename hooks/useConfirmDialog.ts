"use client";

import { useCallback, useState } from "react";

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

export function useConfirmDialog() {
  const [state, setState] = useState<ConfirmState>({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const confirm = useCallback(
    (title: string, message: string, onConfirm: () => void) => {
      setState({ open: true, title, message, onConfirm });
    },
    [],
  );

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const accept = useCallback(() => {
    state.onConfirm();
    close();
  }, [state, close]);

  return { state, confirm, close, accept };
}
