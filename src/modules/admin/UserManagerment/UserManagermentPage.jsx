import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

export default function UserManagementPage() {
  const [searchValues, setSearchValues] = useState('');

  const { debouncedValue } = useDebounce(searchValues, 500);

  useEffect(() => {
    if (searchValues) {
      console.log('searchValues', searchValues);
    }
  }, [searchValues]);

  useEffect(() => {
    console.log('debouncedValue', debouncedValue);
  }, [debouncedValue]);

  return (
    <div>
      <input placeholder='Search' onChange={(event) => setSearchValues(event.target.value)} />
    </div>
  );
}
