import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.tsx';
import CoursesPage from './pages/courses';
import AboutPage from './pages/about';
import LandingPage from './pages';
import CreatorsPage from './pages/creators';
import ProfilePage from './pages/profile';
import ContentMarketplace from './pages/content';
import CreateEBook from './pages/create/ebook';
import CreateFile from './pages/create/file';
import CreateCourse from './pages/create/course';
import CreateVideo from './pages/create/video';
import CreateArticle from './pages/create/article';
import CreatorProfile from './pages/creators/[slug]';
import CourseDetailsPage from './pages/courses/course-details';
import ContentPage from './pages/content/[slug]';
import LearnPage from './pages/courses/learn';
import CoursePreview from './pages/create/course/preview';
import { AuthProvider } from '@/contexts/AuthProvider';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <Routes>
                        {/* Main Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/content" element={<ContentMarketplace />} />
                        <Route path="/creators" element={<CreatorsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />

                        {/* Content Creation Routes */}
                        <Route path="/create">
                            <Route path="ebook" element={<CreateEBook />} />
                            <Route path="file" element={<CreateFile />} />
                            <Route path="course" element={<CreateCourse />} />
                            <Route path="video" element={<CreateVideo />} />
                            <Route path="article" element={<CreateArticle />} />
                        </Route>

                        {/* Dynamic Routes - Order matters! \*/}
                        <Route path="/:creatorSlug/:courseSlug/learn/:lessonId?" element={<LearnPage />} />
                        <Route path="/:creatorSlug/:contentType/:contentSlug" element={<ContentPage />} />
                        <Route path="/:creatorSlug/:courseSlug" element={<CourseDetailsPage />} />
                        <Route path="/:slug" element={<CreatorProfile />} />

                        {/* Preview Routes */}
                        <Route path="/create/course/preview" element={<CoursePreview />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}
