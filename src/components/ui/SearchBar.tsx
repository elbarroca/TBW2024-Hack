import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative w-full md:w-64">
      <input
        type="text"
        placeholder="Search courses..."
        className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
    </div>
  );
} 