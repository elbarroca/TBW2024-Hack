import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-gradient-to-r from-purple-600 to-teal-400 text-white hover:opacity-90',
        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
        ghost: 'text-purple-600 hover:bg-purple-50',
    };

    const sizes = {
        sm: 'text-sm px-3 py-1.5 rounded-md',
        md: 'text-sm px-4 py-2 rounded-lg',
        lg: 'text-base px-6 py-3 rounded-lg',
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {Icon && iconPosition === 'left' && (
                <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
                <Icon className="h-4 w-4 ml-2" aria-hidden="true" />
            )}
        </button>
    );
}
