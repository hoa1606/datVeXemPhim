import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [searchTerm, setSearchTerm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('set timeout');
      setSearchTerm(value);
    }, delay);

    return () => {
      console.log('clear timeout');
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue: searchTerm };
};
export default useDebounce;
