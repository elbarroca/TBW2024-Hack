import { useState, KeyboardEvent } from 'react';
import { FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    maxTags?: number;
    className?: string;
}

export function TagInput({
    value,
    onChange,
    placeholder = 'Add tags...',
    maxTags = 10,
    className,
}: TagInputProps) {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string>('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && input === '' && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    const addTag = () => {
        const tag = input.trim().toLowerCase();
        if (tag === '') return;

        if (value.includes(tag)) {
            setError('Tag already exists');
            return;
        }

        if (value.length >= maxTags) {
            setError(`Maximum ${maxTags} tags allowed`);
            return;
        }

        onChange([...value, tag]);
        setInput('');
        setError('');
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter((tag) => tag !== tagToRemove));
        setError('');
    };

    return (
        <div className={className}>
            <div
                className={cn(
                    'flex flex-wrap gap-2 rounded-lg border border-gray-300 bg-white p-2',
                    'focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500',
                    'transition-all duration-200'
                )}
            >
                {value.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm"
                    >
                        <span className="text-purple-800">{tag}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 rounded-full p-1 hover:bg-purple-200"
                        >
                            <FiX className="h-3 w-3 text-purple-600" />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value.replace(',', ''));
                        setError('');
                    }}
                    onKeyDown={handleKeyDown}
                    onBlur={() => {
                        if (input.trim()) addTag();
                    }}
                    placeholder={value.length === 0 ? placeholder : ''}
                    className="flex-1 border-none bg-transparent p-1 text-sm outline-none placeholder:text-gray-400"
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            <p className="mt-1 text-xs text-gray-500">
                Press enter or comma to add a tag. {maxTags - value.length} tags remaining.
            </p>
        </div>
    );
}
