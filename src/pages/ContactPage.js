import React from 'react'
import { DataProvider } from '../../src/contexts/DataContext';
import DataList from '../components/datalist/DataList';

function ContactPage() {
  return (
    
    <DataProvider>
      <DataList />
    </DataProvider>
  )
}

export default ContactPage