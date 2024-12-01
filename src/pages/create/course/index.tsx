import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Upload, Plus, Trash2, MoveVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/CustomCard';
import { Switch } from '@/components/ui/Switch';
import { TagInput } from '@/components/shared/TagInput';
import { PriceInput } from '@/components/shared/PriceInput';
import { FileUploader } from '@/components/shared/FileUploader';
import { useToast } from '@/components/ui/use-toast';

interface Chapter {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
}

interface DragResult {
    destination?: {
        index: number;
    };
    source: {
        index: number;
    };
}

export default function CreateCourse() {
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [price, setPrice] = useState(0);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [enableCertificate, setEnableCertificate] = useState(false);
    const [certificateTemplate, setCertificateTemplate] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleThumbnailUpload = async (files: FileList) => {
        if (files.length === 0) return;
        // TODO: Implement thumbnail upload logic
        setThumbnailUrl(URL.createObjectURL(files[0]));
    };

    const handleVideoUpload = async (chapterId: string, files: FileList) => {
        if (files.length === 0) return;
        setIsUploading(true);
        try {
            // TODO: Implement video upload logic
            const videoUrl = URL.createObjectURL(files[0]);
            setChapters(
                chapters.map((chapter) =>
                    chapter.id === chapterId ? { ...chapter, videoUrl } : chapter
                )
            );
            toast({
                title: 'Success',
                description: 'Video uploaded successfully',
            });
        } catch (err) {
            console.error('Failed to upload video:', err);
            toast({
                title: 'Error',
                description: 'Failed to upload video',
                variant: 'destructive',
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleCertificateTemplateUpload = async (files: FileList) => {
        if (files.length === 0) return;
        // TODO: Implement certificate template upload logic
        setCertificateTemplate(URL.createObjectURL(files[0]));
    };

    const addChapter = () => {
        const newChapter: Chapter = {
            id: Date.now().toString(),
            title: '',
            description: '',
            videoUrl: '',
        };
        setChapters([...chapters, newChapter]);
    };

    const removeChapter = (id: string) => {
        setChapters(chapters.filter((chapter) => chapter.id !== id));
    };

    const updateChapter = (id: string, updates: Partial<Chapter>) => {
        setChapters(
            chapters.map((chapter) => (chapter.id === id ? { ...chapter, ...updates } : chapter))
        );
    };

    const handleDragEnd = (result: DragResult) => {
        if (!result.destination) return;
        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setChapters(items);
    };

    const handlePublish = async () => {
        // Validation
        if (!title || !description || tags.length === 0 || !thumbnailUrl || chapters.length === 0) {
            toast({
                title: 'Validation Error',
                description: 'Please fill in all required fields',
                variant: 'destructive',
            });
            return;
        }

        try {
            // TODO: Implement blockchain upload logic
            toast({
                title: 'Success',
                description: 'Course published successfully',
            });
        } catch (err) {
            console.error('Failed to publish course:', err);
            toast({
                title: 'Error',
                description: 'Failed to publish course',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-teal-400 bg-clip-text text-transparent">
                        Create a Course
                    </h1>
                    <p className="text-gray-600">
                        Build engaging video-based learning experiences with chapters, quizzes, and
                        completion certificates.
                    </p>
                </div>

                {/* Course Details */}
                <Card className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter course title"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your course"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Tags</Label>
                            <TagInput
                                value={tags}
                                onChange={setTags}
                                placeholder="Add course tags"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label>Course Thumbnail</Label>
                            <FileUploader
                                accept="image/*"
                                onUpload={handleThumbnailUpload}
                                className="mt-1"
                            />
                            {thumbnailUrl && (
                                <img
                                    src={thumbnailUrl}
                                    alt="Course thumbnail"
                                    className="mt-2 rounded-lg h-40 object-cover"
                                />
                            )}
                        </div>

                        <div>
                            <Label>Price</Label>
                            <PriceInput value={price} onChange={setPrice} className="mt-1" />
                        </div>
                    </div>
                </Card>

                {/* Chapters */}
                <Card className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Chapters</h2>
                        <Button onClick={addChapter} icon={Plus}>
                            Add Chapter
                        </Button>
                    </div>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="chapters">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4"
                                >
                                    {chapters.map((chapter, index) => (
                                        <Draggable
                                            key={chapter.id}
                                            draggableId={chapter.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className="border rounded-lg p-4 bg-white"
                                                >
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div {...provided.dragHandleProps}>
                                                            <MoveVertical className="text-gray-400 cursor-move" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <Input
                                                                value={chapter.title}
                                                                onChange={(e) =>
                                                                    updateChapter(chapter.id, {
                                                                        title: e.target.value,
                                                                    })
                                                                }
                                                                placeholder="Chapter title"
                                                            />
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() =>
                                                                removeChapter(chapter.id)
                                                            }
                                                            icon={Trash2}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>

                                                    <Textarea
                                                        value={chapter.description}
                                                        onChange={(e) =>
                                                            updateChapter(chapter.id, {
                                                                description: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Chapter description"
                                                        className="mb-4"
                                                    />

                                                    <FileUploader
                                                        accept="video/*"
                                                        onUpload={(files) =>
                                                            handleVideoUpload(chapter.id, files)
                                                        }
                                                        isLoading={isUploading}
                                                    />

                                                    {chapter.videoUrl && (
                                                        <video
                                                            src={chapter.videoUrl}
                                                            controls
                                                            className="mt-2 rounded-lg w-full"
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Card>

                {/* Certificate Options */}
                <Card className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold">Completion Certificate</h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    Enable certificates for students who complete the course
                                </p>
                            </div>
                            <Switch
                                checked={enableCertificate}
                                onCheckedChange={setEnableCertificate}
                            />
                        </div>

                        {enableCertificate && (
                            <div>
                                <Label>Certificate Template</Label>
                                <FileUploader
                                    accept="image/*"
                                    onUpload={handleCertificateTemplateUpload}
                                    className="mt-1"
                                />
                                {certificateTemplate && (
                                    <img
                                        src={certificateTemplate}
                                        alt="Certificate template"
                                        className="mt-2 rounded-lg h-40 object-cover"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </Card>

                {/* Publish Button */}
                <div className="flex justify-end">
                    <Button onClick={handlePublish} icon={Upload} size="lg">
                        Publish Course
                    </Button>
                </div>
            </div>
        </div>
    );
}
