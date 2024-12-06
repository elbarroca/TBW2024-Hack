import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useCallback } from "react";

interface Lesson {
    id: string;
    title: string;
    description: string;
    slug: string;
    duration?: string;
}

interface Module {
    id: string;
    title: string;
    description?: string;
    lessons: Lesson[];
}

interface LessonSelectorProps {
    modules: Module[];
    className?: string;
}

export const LessonSelector = ({ modules, className }: LessonSelectorProps) => {
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(modules.map(m => m.id)));

    const toggleModule = useCallback((moduleId: string) => {
        setExpandedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200",
                className
            )}
        >
            <div className="border-b border-gray-200 bg-gradient-to-r from-purple-100/80 to-blue-100/80 p-8 sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Course Curriculum
                        </h3>
                        <p className="mt-2 text-gray-600 text-lg">
                            {modules.length} modules • {modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setExpandedModules(new Set(modules.map(m => m.id)))}
                            className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                        >
                            Expand All
                        </button>
                        <button
                            onClick={() => setExpandedModules(new Set())}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
                        >
                            Collapse All
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="p-6">
                <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {modules.map((module, index) => {
                        const isExpanded = expandedModules.has(module.id);
                        
                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: Math.min(index * 0.1, 1) }}
                                className="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-all duration-300 hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleModule(module.id)}
                                    className="w-full bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200 flex justify-between items-center"
                                >
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-xl font-bold text-gray-900">
                                                {module.title}
                                            </h4>
                                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                                {module.lessons.length} lessons
                                            </span>
                                        </div>
                                        {module.description && (
                                            <p className="mt-2 text-gray-600">{module.description}</p>
                                        )}
                                    </div>
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                                
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="divide-y divide-gray-200"
                                        >
                                            {module.lessons.map((lesson) => (
                                                <motion.div
                                                    key={lesson.id}
                                                    whileHover={{ 
                                                        backgroundColor: "rgba(249, 250, 251, 0.9)",
                                                        x: 4,
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                    className="p-5 transition-all cursor-pointer group"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <div className="flex items-center">
                                                                <ChevronRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity mr-2" />
                                                                <h5 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                                    {lesson.title}
                                                                </h5>
                                                            </div>
                                                            <p className="mt-1.5 text-gray-600 text-sm leading-relaxed pl-6">
                                                                {lesson.description}
                                                            </p>
                                                        </div>
                                                        {lesson.duration && (
                                                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap ml-4 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                                                                {lesson.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};