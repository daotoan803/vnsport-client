import { useState, useEffect } from 'react';

export default (defaultValue, checkValueIsValid) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(checkValueIsValid(value));
    setError(!checkValueIsValid(value));
  }, [value]);

  return [error, value, setValue];
};
