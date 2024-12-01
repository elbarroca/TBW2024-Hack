import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/ui/Header';
import CoursesPage from './pages/courses';
import CourseDetailPage from './pages/course/[id]';
import AboutPage from './pages/about';
import LandingPage from './pages';
import CreatorsPage from './pages/creators';
import ProfilePage from './pages/profile';
import ContentMarketplace from './pages/content';
import CreateEBook from './pages/create/ebook';
import CreateResearchPaper from './pages/create/research-paper';
import CreateCourse from './pages/create/course';
import CreateVideo from './pages/create/video';
import CreateArticle from './pages/create/article';
import CreateFile from './pages/create/file';

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Header />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/course/:courseId" element={<CourseDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/creators" element={<CreatorsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/content" element={<ContentMarketplace />} />

                    {/* Content Creation Routes */}
                    <Route path="/create/ebook" element={<CreateEBook />} />
                    <Route path="/create/research-paper" element={<CreateResearchPaper />} />
                    <Route path="/create/course" element={<CreateCourse />} />
                    <Route path="/create/video" element={<CreateVideo />} />
                    <Route path="/create/article" element={<CreateArticle />} />
                    <Route path="/create/file" element={<CreateFile />} />
                </Routes>
            </div>
        </Router>
    );
}
