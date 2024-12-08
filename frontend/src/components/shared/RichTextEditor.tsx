import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    className?: string;
    error?: string;
    placeholder?: string;
}

export function RichTextEditor({
    content = '',
    onChange,
    className,
    error,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none',
                'aria-label': 'Rich text editor',
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const handleFormat = (type: 'bold' | 'italic' | 'bulletList' | 'orderedList') => {
        switch (type) {
            case 'bold':
                editor.chain().focus().toggleBold().run();
                break;
            case 'italic':
                editor.chain().focus().toggleItalic().run();
                break;
            case 'bulletList':
                editor.chain().focus().toggleBulletList().run();
                break;
            case 'orderedList':
                editor.chain().focus().toggleOrderedList().run();
                break;
        }
    };

    return (
        <div
            className={cn(
                'w-full rounded-lg border border-gray-200',
                error && 'border-red-500',
                className
            )}
        >
            <div className="flex flex-wrap gap-1 border-b border-gray-200 p-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFormat('bold')}
                    aria-label="Bold"
                    className={cn(editor.isActive('bold') && 'bg-gray-100')}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFormat('italic')}
                    aria-label="Italic"
                    className={cn(editor.isActive('italic') && 'bg-gray-100')}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFormat('bulletList')}
                    aria-label="Bullet list"
                    className={cn(editor.isActive('bulletList') && 'bg-gray-100')}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFormat('orderedList')}
                    aria-label="Numbered list"
                    className={cn(editor.isActive('orderedList') && 'bg-gray-100')}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
            </div>

            <div className="p-4">
                <EditorContent editor={editor} />
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
