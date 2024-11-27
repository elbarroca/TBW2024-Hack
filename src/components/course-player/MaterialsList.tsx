import React from 'react';
import { FileText, Code, Presentation, Check } from 'lucide-react';
import type { CourseMaterial } from '../../types/course';

interface MaterialsListProps {
  materials: CourseMaterial[];
  onMaterialReviewed: (materialId: string) => void;
}

const materialIcons = {
  pdf: FileText,
  code: Code,
  slides: Presentation,
};

export function MaterialsList({ materials, onMaterialReviewed }: MaterialsListProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Course Materials</h3>
      <div className="space-y-2">
        {materials.map((material) => {
          const Icon = materialIcons[material.type];
          
          return (
            <div
              key={material.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{material.title}</span>
              </div>
              
              <button
                onClick={() => onMaterialReviewed(material.id)}
                className={`p-2 rounded-full transition-colors ${
                  material.reviewed
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}