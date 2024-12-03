import { Hero } from '../components/landing/Hero';
import FeaturedCourses from '../components/landing/FeaturedCourses';
import FeaturedCreators from '../components/landing/FeaturedCreators';
import { CallToAction } from '../components/landing/CallToAction';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="relative pt-16">
                <Hero />
                <div className="space-y-24 pb-24">
                    <FeaturedCourses />
                    <FeaturedCreators />
                    <CallToAction />
                </div>
            </main>
            <Footer />
        </div>
    );
}
