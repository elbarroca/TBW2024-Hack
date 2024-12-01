import { ArrowRight, Sparkles } from 'lucide-react';

export function CallToAction() {
    return (
        <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                        <Sparkles className="h-5 w-5 text-yellow-300 mr-2" />
                        <span className="text-white font-medium">Start Learning Today</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Begin Your Web3 Journey
                    </h2>

                    <p className="text-xl text-purple-100 mb-10">
                        Join thousands of students and become a part of the decentralized future.
                        Get started with our comprehensive courses today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="inline-flex items-center px-8 py-4 rounded-full bg-white text-purple-600 font-semibold shadow-lg hover:bg-purple-50 transition-colors group"
                            onClick={() => (window.location.href = '/courses')}
                        >
                            Explore Courses
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            className="inline-flex items-center px-8 py-4 rounded-full text-white border-2 border-white/20 hover:bg-white/10 transition-colors"
                            onClick={() => (window.location.href = '/about')}
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
