import { useState } from "react";

export default function useModalHook() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  return { open, toggle };
}
