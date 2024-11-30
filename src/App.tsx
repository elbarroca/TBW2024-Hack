import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import CoursesPage from './pages/courses';
import CourseDetailPage from './pages/course/[id]';
import InstructorsPage from './pages/instructors';
import AboutPage from './pages/about';
import LandingPage from './pages';
import { WalletProvider } from './providers/WalletProvider';

export default function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/instructors" element={<InstructorsPage />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}
