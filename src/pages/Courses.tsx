
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CoursesList } from '@/components/courses/CoursesList';

const Courses = () => {
  return (
    <div className="p-6">
      <Routes>
        <Route index element={<CoursesList />} />
      </Routes>
    </div>
  );
};

export default Courses;
