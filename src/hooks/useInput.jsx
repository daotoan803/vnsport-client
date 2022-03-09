import { useState, useEffect } from 'react';

export default (defaultValue, checkValueIsValid) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(!checkValueIsValid(value));
  }, [value]);

  return [error, value, setValue];
};
