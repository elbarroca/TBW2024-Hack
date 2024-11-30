import { useState, useEffect } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function PriceInput({
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 0.01,
  className,
}: PriceInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());
  const [error, setError] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    
    if (newValue === '') {
      onChange(0);
      setError('');
      return;
    }

    const numericValue = parseFloat(newValue);
    
    if (isNaN(numericValue)) {
      setError('Please enter a valid number');
      return;
    }

    if (numericValue < min) {
      setError(`Minimum price is $${min}`);
      return;
    }

    if (numericValue > max) {
      setError(`Maximum price is $${max}`);
      return;
    }

    onChange(numericValue);
    setError('');
  };

  return (
    <div className={className}>
      <div className="relative">
        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
            'transition-transform duration-200',
            isFocused ? 'scale-110' : 'scale-100'
          )}
        >
          <FiDollarSign
            className={cn(
              'h-5 w-5 transition-colors duration-200',
              isFocused ? 'text-purple-500' : 'text-gray-400'
            )}
          />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (!error) {
              setInputValue(parseFloat(inputValue || '0').toFixed(2));
            }
          }}
          step={step}
          className={cn(
            'block w-full rounded-lg border bg-white pl-10 pr-4 py-2.5',
            'text-sm placeholder:text-gray-400',
            'transition-all duration-200',
            isFocused
              ? 'border-purple-500 ring-2 ring-purple-100'
              : error
              ? 'border-red-300 ring-2 ring-red-100'
              : 'border-gray-300 hover:border-gray-400',
            'focus:outline-none'
          )}
          placeholder="0.00"
        />
        
        {/* Price Range Slider */}
        <div className="relative mt-4">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={error ? 0 : value}
            onChange={(e) => handleChange(e.target.value)}
            className={cn(
              'w-full h-2 rounded-lg appearance-none cursor-pointer',
              'bg-gradient-to-r from-purple-200 to-purple-400',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-4',
              '[&::-webkit-slider-thumb]:h-4',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-white',
              '[&::-webkit-slider-thumb]:border-2',
              '[&::-webkit-slider-thumb]:border-purple-500',
              '[&::-webkit-slider-thumb]:transition-transform',
              '[&::-webkit-slider-thumb]:duration-200',
              '[&::-webkit-slider-thumb]:hover:scale-110',
              '[&::-webkit-slider-thumb]:hover:border-purple-600'
            )}
          />
        </div>
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-500 animate-slideIn">
          {error}
        </p>
      )}

      <div className="mt-1.5 flex justify-between text-xs text-gray-500">
        <span className="font-medium">Min: ${min}</span>
        <span className="font-medium">Max: ${max}</span>
      </div>
    </div>
  );
} 