import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
    Copy,
    BookOpen,
    Video,
    PenTool,
    Clock,
    ShoppingBag,
    Microscope,
    FileUp,
    Globe,
    Twitter,
    Github,
    Linkedin,
    Medal,
    Camera,
    AlertCircle,
    ArrowRight,
    Upload,
    GraduationCap,
    ChevronDown,
    BarChart3,
    Calendar,
    Activity,
    Edit3,
    Plus,
    X,
    Tag,
    Save,
    XCircle,
    ExternalLink,
    Settings,
} from 'lucide-react';
import { useAppSelector } from '@/store';
import { WalletPicker } from '@/components/solana/WalletPicker';
import { useAuth } from '@/contexts/AuthProvider';
import { LoginStatus } from '@/store/types';
import { AuthState } from '@/store/types';
import { RootState } from '@/store';

// Mock data for demonstration
const mockPurchases = [
    {
        id: '1',
        title: 'Introduction to Web3',
        type: 'course',
        thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
        date: '2024-03-20',
        isNew: true,
        progress: 25,
        author: 'John Doe',
        description: 'Learn the fundamentals of Web3 development and blockchain technology.',
    },
    {
        id: '2',
        title: 'DeFi Trading Guide',
        type: 'ebook',
        thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
        date: '2024-03-15',
        isNew: false,
        progress: 60,
        author: 'Jane Smith',
        description: 'Master DeFi trading strategies and understand market dynamics.',
    },
];

const stats = [
    {
        label: 'Total Purchases',
        value: '2',
        icon: ShoppingBag,
        gradient: 'from-purple-500 to-indigo-500',
    },
    {
        label: 'Content Created',
        value: '0',
        icon: PenTool,
        gradient: 'from-teal-500 to-emerald-500',
    },
    {
        label: 'Hours Learned',
        value: '12',
        icon: Clock,
        gradient: 'from-orange-500 to-pink-500',
    },
    {
        label: 'Certificates',
        value: '1',
        icon: Medal,
        gradient: 'from-blue-500 to-cyan-500',
    },
];

interface ContentType {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    route: string;
    category: 'file' | 'interactive';
}

const contentTypes: ContentType[] = [
    // File-Based Content
    {
        id: 'ebook',
        title: 'Upload eBook',
        description: 'Share your knowledge through comprehensive eBooks and guides',
        icon: BookOpen,
        gradient: 'from-blue-500 to-cyan-500',
        route: '/create/ebook',
        category: 'file',
    },
    {
        id: 'research',
        title: 'Upload Research Paper',
        description: 'Publish academic papers and research findings with the community',
        icon: Microscope,
        gradient: 'from-purple-500 to-indigo-500',
        route: '/create/research',
        category: 'file',
    },
    {
        id: 'file',
        title: 'Upload Learning Resource',
        description: 'Share PDFs, documents, and other educational materials',
        icon: FileUp,
        gradient: 'from-emerald-500 to-teal-500',
        route: '/create/file',
        category: 'file',
    },
    // Interactive Content
    {
        id: 'course',
        title: 'Create a Course',
        description: 'Build engaging video-based courses with chapters and quizzes',
        icon: GraduationCap,
        gradient: 'from-orange-500 to-pink-500',
        route: '/create/course',
        category: 'interactive',
    },
    {
        id: 'video',
        title: 'Upload Video',
        description: 'Share standalone video tutorials and educational content',
        icon: Video,
        gradient: 'from-red-500 to-rose-500',
        route: '/create/video',
        category: 'interactive',
    },
    {
        id: 'article',
        title: 'Write Article',
        description: 'Create in-depth articles and tutorials for the community',
        icon: PenTool,
        gradient: 'from-violet-500 to-purple-500',
        route: '/create/article',
        category: 'interactive',
    },
];

// Add new interfaces
interface SocialLinks {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
}

interface CreatorProfile {
    displayName: string;
    description: string;
    expertise: string[];
    socialLinks: SocialLinks;
}

// Add initial state for creator profile
const initialProfile: CreatorProfile = {
    displayName: '',
    description: '',
    expertise: [],
    socialLinks: {},
};

interface ExpertiseTag {
    id: string;
    label: string;
}

const suggestedTags = [
    'DeFi',
    'NFTs',
    'Smart Contracts',
    'Web3',
    'Blockchain',
    'Cryptocurrency',
    'DAOs',
    'Gaming',
    'Metaverse',
];

const socialPlatforms = {
    github: { icon: Github, label: 'GitHub', placeholder: 'Your GitHub profile URL' },
    twitter: { icon: Twitter, label: 'X (Twitter)', placeholder: 'Your X (Twitter) profile URL' },
    instagram: { icon: Camera, label: 'Instagram', placeholder: 'Your Instagram profile URL' },
    linkedin: { icon: Linkedin, label: 'LinkedIn', placeholder: 'Your LinkedIn profile URL' },
    website: { icon: Globe, label: 'Website', placeholder: 'Your personal website URL' },
};

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative animate-in fade-in slide-in-from-bottom-4 duration-200">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-full">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{message}</p>
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default function ProfilePage() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user, isLoading, loginStatus } = useAppSelector((state: RootState) => state.auth);
    const [purchaseFilter, setPurchaseFilter] = useState('all');
    const [showSettings, setShowSettings] = useState(false);
    const [profile, setProfile] = useState<CreatorProfile>(initialProfile);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [expertiseTags, setExpertiseTags] = useState<ExpertiseTag[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);
    const [editingSocialPlatform, setEditingSocialPlatform] = useState<keyof SocialLinks | null>(null);
    const [showDisconnectModal, setShowDisconnectModal] = useState(false);

    // Add debugging logs
    console.log('Auth State:', { user, isLoading });

    // Show loading state only briefly during initial load
    if (isLoading || loginStatus === LoginStatus.IDLE) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="space-y-4 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="text-sm text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Check for unauthenticated state
    if (!user || loginStatus === LoginStatus.OUT) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Connect Your Wallet
                        </h1>
                        <p className="text-gray-600">
                            Please connect your wallet to access your profile and start learning.
                        </p>
                    </div>
                    <div className="mt-8">
                        <WalletPicker />
                    </div>
                </div>
            </div>
        );
    }

    const copyAddress = () => {
        if (user?.address) {
            navigator.clipboard.writeText(user.address);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    const handleSocialLinkEdit = (platform: keyof SocialLinks) => {
        setEditingSocialPlatform(platform);
    };

    const handleSocialLinkSave = () => {
        setEditingSocialPlatform(null);
    };

    const handleSocialLinkCancel = () => {
        setEditingSocialPlatform(null);
        setProfile((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks } }));
    };

    const handleContentCreate = (route: string) => {
        navigate(route);
    };

    return (
        <main className="container mx-auto px-4 pt-24 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Profile Header */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {user?.full_name?.charAt(0) || user?.address?.slice(0, 2)}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {user?.full_name || 'Unnamed User'}
                                    </h1>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <span>{user?.address?.slice(0, 8)}...{user?.address?.slice(-8)}</span>
                                        <button
                                            onClick={copyAddress}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowSettings(true)}
                                    className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                                <button
                                    onClick={() => setShowDisconnectModal(true)}
                                    className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Dashboard Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="group relative bg-white rounded-xl p-6 border border-gray-100 hover:border-purple-200 transition-all hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
                        >
                            {/* Gradient background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                            />

                            {/* Content */}
                            <div className="relative flex items-center gap-4">
                                <div
                                    className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient} group-hover:scale-105 transition-transform`}
                                >
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full opacity-0 group-hover:opacity-50 transition-all transform translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0" />
                        </div>
                    ))}
                </div>

                {/* Enhanced My Purchases Section */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    My Purchases
                                </h2>
                                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                                    {mockPurchases.length}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={purchaseFilter}
                                    onChange={(e) => setPurchaseFilter(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                                >
                                    <option value="all">All Types</option>
                                    <option value="courses">Courses</option>
                                    <option value="ebooks">eBooks</option>
                                    <option value="pdfs">PDFs</option>
                                </select>
                                <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 bg-white">
                                    <BarChart3 className="w-4 h-4" />
                                    Sort
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {mockPurchases.map((purchase) => (
                            <div
                                key={purchase.id}
                                className="group p-6 hover:bg-gray-50 transition-colors relative overflow-hidden"
                            >
                                {/* Background decoration */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Content */}
                                <div className="relative flex gap-4">
                                    {/* Thumbnail */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-24 h-24 rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow">
                                            <img
                                                src={purchase.thumbnail}
                                                alt={purchase.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        {purchase.isNew && (
                                            <span className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium ring-2 ring-white">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-gray-900 hover:text-purple-600 transition-colors cursor-pointer truncate">
                                                {purchase.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {purchase.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(purchase.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <PenTool className="w-4 h-4" />
                                                {purchase.author}
                                            </span>
                                        </div>

                                        {/* Progress bar */}
                                        {purchase.type === 'course' && (
                                            <div className="mb-3">
                                                <div className="flex items-center justify-between text-sm mb-1">
                                                    <span className="text-gray-600">Progress</span>
                                                    <span className="text-purple-600 font-medium">
                                                        {purchase.progress}%
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-purple-500 to-teal-500 transition-all duration-300"
                                                        style={{ width: `${purchase.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Action button */}
                                        <button className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-teal-500 text-white hover:from-purple-700 hover:to-teal-600 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 text-sm font-medium group">
                                            <span>Access Content</span>
                                            <Activity className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Creator Profile Section */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <PenTool className="w-5 h-5 text-purple-600" />
                                Creator Profile
                            </h2>
                            {!isEditingProfile ? (
                                <button
                                    onClick={() => setIsEditingProfile(true)}
                                    className="px-4 py-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors flex items-center gap-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsEditingProfile(false)}
                                        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditingProfile(false);
                                            // TODO: Save profile changes
                                        }}
                                        className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* About Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                About You
                                {isEditingProfile && (
                                    <span className="text-gray-400 text-xs font-normal">
                                        (Markdown supported)
                                    </span>
                                )}
                            </label>
                            {isEditingProfile ? (
                                <textarea
                                    value={profile.description}
                                    onChange={(e) =>
                                        setProfile({ ...profile, description: e.target.value })
                                    }
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none min-h-[120px]"
                                    placeholder="Tell others about your expertise and experience..."
                                />
                            ) : (
                                <div
                                    className="prose prose-purple max-w-none"
                                    onClick={() => setIsEditingProfile(true)}
                                >
                                    {profile.description || (
                                        <p className="text-gray-500 italic">
                                            No description provided yet. Click here to add one.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Expertise Tags Section */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-700">
                                Areas of Expertise
                            </label>
                            <div className="space-y-3">
                                {isEditingProfile && (
                                    <div className="relative">
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    value={tagInput}
                                                    onChange={(e) => {
                                                        setTagInput(e.target.value);
                                                        setShowTagSuggestions(true);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && tagInput) {
                                                            e.preventDefault();
                                                            if (
                                                                !expertiseTags.some(
                                                                    (t) =>
                                                                        t.label.toLowerCase() ===
                                                                        tagInput.toLowerCase()
                                                                )
                                                            ) {
                                                                setExpertiseTags([
                                                                    ...expertiseTags,
                                                                    {
                                                                        id: Date.now().toString(),
                                                                        label: tagInput,
                                                                    },
                                                                ]);
                                                            }
                                                            setTagInput('');
                                                            setShowTagSuggestions(false);
                                                        }
                                                    }}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all pr-10"
                                                    placeholder="Type to add expertise tags..."
                                                />
                                                <Tag className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        tagInput &&
                                                        !expertiseTags.some(
                                                            (t) =>
                                                                t.label.toLowerCase() ===
                                                                tagInput.toLowerCase()
                                                        )
                                                    ) {
                                                        setExpertiseTags([
                                                            ...expertiseTags,
                                                            {
                                                                id: Date.now().toString(),
                                                                label: tagInput,
                                                            },
                                                        ]);
                                                    }
                                                    setTagInput('');
                                                    setShowTagSuggestions(false);
                                                }}
                                                disabled={!tagInput}
                                                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add
                                            </button>
                                        </div>
                                        {showTagSuggestions && tagInput && (
                                            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 max-h-48 overflow-y-auto">
                                                {suggestedTags
                                                    .filter(
                                                        (tag) =>
                                                            tag
                                                                .toLowerCase()
                                                                .includes(tagInput.toLowerCase()) &&
                                                            !expertiseTags.some(
                                                                (t) =>
                                                                    t.label.toLowerCase() ===
                                                                    tag.toLowerCase()
                                                            )
                                                    )
                                                    .map((tag) => (
                                                        <button
                                                            key={tag}
                                                            onClick={() => {
                                                                setExpertiseTags([
                                                                    ...expertiseTags,
                                                                    {
                                                                        id: Date.now().toString(),
                                                                        label: tag,
                                                                    },
                                                                ]);
                                                                setTagInput('');
                                                                setShowTagSuggestions(false);
                                                            }}
                                                            className="w-full px-4 py-2 text-left hover:bg-purple-50 text-sm text-gray-700 hover:text-purple-700 transition-colors"
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {expertiseTags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm group hover:bg-purple-100 transition-colors"
                                        >
                                            <Tag className="w-3 h-3" />
                                            {tag.label}
                                            {isEditingProfile && (
                                                <button
                                                    onClick={() =>
                                                        setExpertiseTags(
                                                            expertiseTags.filter(
                                                                (t) => t.id !== tag.id
                                                            )
                                                        )
                                                    }
                                                    className="ml-1 p-0.5 rounded-full hover:bg-purple-200 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                    {!expertiseTags.length && (
                                        <p className="text-gray-500 text-sm italic">
                                            {isEditingProfile
                                                ? 'Start typing to add your areas of expertise'
                                                : 'No expertise tags added yet'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Social Links Section */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-700">
                                Social Links
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(socialPlatforms).map(
                                    ([platform, { icon: Icon, label, placeholder }]) => (
                                        <div key={platform} className="group relative">
                                            {editingSocialPlatform === platform ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="relative flex-1">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Icon className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                        <input
                                                            type="url"
                                                            value={
                                                                profile.socialLinks[
                                                                    platform as keyof SocialLinks
                                                                ] || ''
                                                            }
                                                            onChange={(e) =>
                                                                setProfile({
                                                                    ...profile,
                                                                    socialLinks: {
                                                                        ...profile.socialLinks,
                                                                        [platform]: e.target.value,
                                                                    },
                                                                })
                                                            }
                                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                                            placeholder={placeholder}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={handleSocialLinkSave}
                                                            className="p-1.5 hover:bg-purple-50 rounded-full transition-colors"
                                                            title="Save"
                                                        >
                                                            <Save className="w-4 h-4 text-purple-600" />
                                                        </button>
                                                        <button
                                                            onClick={handleSocialLinkCancel}
                                                            className="p-1.5 hover:bg-red-50 rounded-full transition-colors"
                                                            title="Cancel"
                                                        >
                                                            <XCircle className="w-4 h-4 text-red-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 group-hover:border-purple-200 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Icon className="w-4 h-4 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {label}
                                                            </p>
                                                            {profile.socialLinks[
                                                                platform as keyof SocialLinks
                                                            ] ? (
                                                                <a
                                                                    href={
                                                                        profile.socialLinks[
                                                                            platform as keyof SocialLinks
                                                                        ]
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1"
                                                                >
                                                                    View Profile
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            ) : (
                                                                <p className="text-xs text-gray-500">
                                                                    Not connected
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {isEditingProfile && (
                                                        <button
                                                            onClick={() =>
                                                                handleSocialLinkEdit(
                                                                    platform as keyof SocialLinks
                                                                )
                                                            }
                                                            className="p-1.5 hover:bg-purple-50 rounded-full transition-colors"
                                                            title={`Edit ${label}`}
                                                        >
                                                            <Edit3 className="w-4 h-4 text-purple-600" />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Start Creating Content Section */}
                <div className="space-y-8">
                    {/* File-Based Content */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-purple-600" />
                                File-Based Content
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Upload and share your educational materials with the community
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contentTypes
                                .filter((content) => content.category === 'file')
                                .map((content) => (
                                    <button
                                        key={content.id}
                                        onClick={() => handleContentCreate(content.route)}
                                        className="group relative bg-white rounded-xl p-6 text-left border border-gray-200 hover:border-purple-200 transition-all hover:shadow-lg hover:-translate-y-0.5 overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    >
                                        {/* Gradient background */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                                        />

                                        {/* Content */}
                                        <div className="relative">
                                            <div
                                                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${content.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform`}
                                            >
                                                <div className="w-full h-full rounded-lg bg-white flex items-center justify-center">
                                                    <content.icon className="w-6 h-6 text-gray-900" />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                {content.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                {content.description}
                                            </p>
                                            <div className="flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-700">
                                                Start Now
                                                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Decorative corner */}
                                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full opacity-0 group-hover:opacity-50 transition-all transform translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0" />
                                    </button>
                                ))}
                        </div>
                    </div>

                    {/* Interactive Content */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-purple-600" />
                                Interactive Content
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Create engaging learning experiences with interactive content
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {contentTypes
                                .filter((content) => content.category === 'interactive')
                                .map((content) => (
                                    <button
                                        key={content.id}
                                        onClick={() => handleContentCreate(content.route)}
                                        className="group relative bg-white rounded-xl p-6 text-left border border-gray-200 hover:border-purple-200 transition-all hover:shadow-lg hover:-translate-y-0.5 overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    >
                                        {/* Gradient background */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                                        />

                                        {/* Content */}
                                        <div className="relative">
                                            <div
                                                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${content.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform`}
                                            >
                                                <div className="w-full h-full rounded-lg bg-white flex items-center justify-center">
                                                    <content.icon className="w-6 h-6 text-gray-900" />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                {content.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                {content.description}
                                            </p>
                                            <div className="flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-700">
                                                Start Now
                                                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Decorative corner */}
                                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full opacity-0 group-hover:opacity-50 transition-all transform translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0" />
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Disconnect Confirmation Modal */}
                <ConfirmationModal
                    isOpen={showDisconnectModal}
                    onClose={() => setShowDisconnectModal(false)}
                    onConfirm={() => {
                        setShowDisconnectModal(false);
                        logout();
                    }}
                    title="Disconnect Wallet"
                    message="Are you sure you want to disconnect your wallet? You will need to reconnect it to access your profile again."
                />

                {/* Settings Modal */}
                {showSettings && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                            {/* Add settings content here */}
                            <button
                                onClick={() => setShowSettings(false)}
                                className="mt-4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200">
                        Address copied to clipboard!
                    </div>
                )}
            </div>
        </main>
    );
}
