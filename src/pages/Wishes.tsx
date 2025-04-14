
import React from 'react';
import { Header } from '@/components/layout/Header';
import { WishesList } from '@/components/wishes/WishesList';
import { WishDetail } from '@/components/wishes/WishDetail';
import { Routes, Route } from 'react-router-dom';

const Wishes = () => {
  return (
    <>
      <Routes>
        <Route 
          index
          element={
            <>
              <Header title="Wishes" />
              <div className="p-6">
                <WishesList />
              </div>
            </>
          } 
        />
        <Route 
          path=":id" 
          element={
            <>
              <Header title="Wish Details" />
              <div className="p-6">
                <WishDetail />
              </div>
            </>
          } 
        />
      </Routes>
    </>
  );
};

export default Wishes;
