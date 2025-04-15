
import React from 'react';
import { Header } from '@/components/layout/Header';
import { ModulesList } from '@/components/modules/ModulesList';
import { ModuleDetail } from '@/components/modules/ModuleDetail';
import { Routes, Route } from 'react-router-dom';

const Modules = () => {
  return (
    <>
      <Routes>
        <Route 
          index
          element={
            <>
              <Header title="Modules & Sections" />
              <div className="p-6">
                <ModulesList />
              </div>
            </>
          } 
        />
        <Route 
          path=":id" 
          element={
            <>
              <Header title="Module Details" />
              <div className="p-6">
                <ModuleDetail />
              </div>
            </>
          } 
        />
      </Routes>
    </>
  );
};

export default Modules;
