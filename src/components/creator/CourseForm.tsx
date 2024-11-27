import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Course } from '../../types/course';

const courseSchema = z.object({
  // Basic Information
  title: z.string().min(10).max(100),
  subtitle: z.string().min(20).max(200),
  description: z.string().min(100).max(5000),
  category: z.string(),
  targetAudience: z.string(),
  language: z.string(),
  
  // Pricing
  price: z.number().min(0),
  
  // ... add more validation rules
});

export function CourseForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseSchema)
  });

  const steps = [
    {
      title: 'Course Information',
      fields: ['title', 'subtitle', 'description', 'category', 'targetAudience', 'language']
    },
    {
      title: 'Course Content',
      component: <CourseContentBuilder />
    },
    {
      title: 'Pricing & Revenue',
      fields: ['price', 'revenueSplit']
    },
    {
      title: 'Visual Branding',
      component: <VisualBrandingUploader />
    },
    // ... more steps
  ];

  const onSubmit = async (data: any) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex items-center ${
                index + 1 === currentStep ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index + 1 === currentStep ? 'border-purple-600' : 'border-gray-300'
                }`}>
                  {index + 1}
                </div>
                <span className="mt-2 text-sm">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-4 mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Render current step fields */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                {...register('title')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            {/* Add more fields */}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(step => step - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={() => setCurrentStep(step => step + 1)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-purple-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-purple-700"
            >
              Create Course
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 