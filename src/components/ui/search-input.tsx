import { ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import { Input } from "./input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (query: string) => void;
  loading: boolean;
}

export function SearchInput({ onSearch, loading, onChange, ...props }: Props) {
  const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (timeoutState) clearTimeout(timeoutState);

    const value = event.target.value;

    const newTimeoutState = setTimeout(() => {
      onSearch(value);
    }, 500);

    setTimeoutState(newTimeoutState);

    if (onChange) onChange(event);
  };

  return <Input onChange={handleChange} {...props} />;
}
