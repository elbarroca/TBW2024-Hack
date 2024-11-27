import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages';
import CoursesPage from './pages/courses';
import CourseDetailPage from './pages/course/[id]';
import CreatorDashboard from './pages/creator/dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/:creatorName/:courseName" element={<CourseDetailPage />} />
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
