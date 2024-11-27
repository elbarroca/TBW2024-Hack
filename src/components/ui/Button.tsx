import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  children, 
  icon: Icon, 
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = "flex items-center px-6 py-2 rounded-full transition-all duration-200";
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-teal-400 text-white hover:opacity-90",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:border-purple-400",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </button>
  );
}