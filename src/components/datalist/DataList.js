import React from 'react';
// import { useData } from '../../contexts/DataContext';
import { useData } from '../../../src/contexts/DataContext';

function DataList() {
  const { data, loading } = useData();

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export default DataList;
