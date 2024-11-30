import { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Clock, Book, Target, Zap, Code, Gem } from 'lucide-react';
import { CourseCard } from '@/components/courses/CourseCard';
import { CategoryList } from '@/components/courses/CategoryList';
import { COURSES } from '@/data/courses';

const TAGS = [
  { id: 'beginner-friendly', name: 'Beginner Friendly', icon: <Target className="w-4 h-4" /> },
  { id: 'trending', name: 'Trending', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'quick-learn', name: 'Quick Learn', icon: <Zap className="w-4 h-4" /> },
  { id: 'certification', name: 'With Certification', icon: <Gem className="w-4 h-4" /> },
  { id: 'hands-on', name: 'Hands-on', icon: <Code className="w-4 h-4" /> },
  { id: 'comprehensive', name: 'Comprehensive', icon: <Book className="w-4 h-4" /> },
  { id: 'self-paced', name: 'Self Paced', icon: <Clock className="w-4 h-4" /> },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  // Handle tag selection
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      // Search query filter
      if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !course.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && course.category?.toLowerCase() !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all' && course.level?.toLowerCase() !== selectedLevel) {
        return false;
      }

      // Price filter
      if (selectedPrice === 'free' && course.price > 0) {
        return false;
      }
      if (selectedPrice === 'paid' && course.price === 0) {
        return false;
      }

      // Duration filter
      if (selectedDuration.length > 0) {
        const courseDurationWeeks = parseInt(course.duration?.split(' ')[0] || '0');
        const matchesDuration = selectedDuration.some(range => {
          if (range === '0-4 weeks') return courseDurationWeeks <= 4;
          if (range === '4-8 weeks') return courseDurationWeeks > 4 && courseDurationWeeks <= 8;
          if (range === '8+ weeks') return courseDurationWeeks > 8;
          return false;
        });
        if (!matchesDuration) return false;
      }

      // Tags filter
      if (selectedTags.length > 0 && (!course.tags || !selectedTags.every(tag => course.tags?.includes(tag)))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.enrolled - a.enrolled;
      }
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedPrice, selectedDuration, selectedTags, sortBy]);

  // Handle duration filter changes
  const handleDurationChange = (duration: string) => {
    setSelectedDuration(prev => 
      prev.includes(duration)
        ? prev.filter(d => d !== duration)
        : [...prev, duration]
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Enhanced Gradient */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 pt-32 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
            Explore Courses Tailored for Your Goals
          </h1>
          <p className="text-xl text-purple-100 mb-12 text-center max-w-3xl mx-auto">
            Master Web3, Blockchain, and Programming with expert-led courses
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="py-4 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all
                  ${selectedTags.includes(tag.id)
                    ? 'bg-purple-100 border-purple-400 text-purple-700'
                    : 'bg-white border-gray-200 hover:border-purple-400 text-gray-700 hover:bg-purple-50'
                  }`}
              >
                {tag.icon}
                <span>{tag.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="py-6 bg-white border-b">
        <CategoryList onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>

              {/* Level Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Level</h3>
                <div className="space-y-2">
                  {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="radio"
                        name="level"
                        value={level.toLowerCase()}
                        checked={selectedLevel === level.toLowerCase()}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Price</h3>
                <div className="space-y-2">
                  {['All Prices', 'Free', 'Paid'].map((price) => (
                    <label key={price} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value={price.toLowerCase()}
                        checked={selectedPrice === price.toLowerCase()}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Duration</h3>
                <div className="space-y-2">
                  {['0-4 weeks', '4-8 weeks', '8+ weeks'].map((duration) => (
                    <label key={duration} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDuration.includes(duration)}
                        onChange={() => handleDurationChange(duration)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                      />
                      <span className="ml-2 text-gray-700">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredCourses.length} courses
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {filteredCourses.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No courses match your current filters. Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 