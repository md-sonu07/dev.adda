import React, { useState, useEffect, useRef } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import { HiOutlineLink, HiXMark, HiPlus, HiOutlineCommandLine, HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineSparkles, HiCheckCircle, HiOutlineClipboardDocument, HiChevronDown } from 'react-icons/hi2';
import TextEditor from './TextEditor';
import InputModal from '../../common/InputModal';
import SkeletonImage from '../../common/SkeletonImage';
import { motion, AnimatePresence } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../../redux/thunks/postThunk';
import { getAllCategoriesAction } from '../../../redux/thunks/categoryThunk';
import { getAllTagsAction } from '../../../redux/thunks/tagThunk';

const PostEditor = ({ postData, updatePostData, handlePublish, handleSaveDraft, loading, isSavingDraft }) => {

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const { tags: availableTags } = useSelector((state) => state.tag);

    const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
    const [jsonInput, setJsonInput] = useState('');
    const [isMarkdownModalOpen, setIsMarkdownModalOpen] = useState(false);
    const [markdownInput, setMarkdownInput] = useState('');
    const [readingTime, setReadingTime] = useState(1);
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [newTagInput, setNewTagInput] = useState('');
    const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
    const [formatTab, setFormatTab] = useState('json');
    const [copiedFormat, setCopiedFormat] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const { title, description, content, category, projectLink, tags, coverImage } = postData;

    useEffect(() => {
        dispatch(getAllCategoriesAction());
        dispatch(getAllTagsAction());
    }, [dispatch]);

    useEffect(() => {
        if (coverImage instanceof File) {
            const url = URL.createObjectURL(coverImage);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        } else if (typeof coverImage === 'string' && coverImage) {
            setImagePreview(coverImage);
        } else {
            setImagePreview('');
        }
    }, [coverImage]);

    useEffect(() => {
        const words = content.trim().split(/\s+/).length;
        setReadingTime(Math.max(1, Math.ceil(words / 200)));
    }, [content]);

    const jsonFormatTemplate = `{
  "title": "Your Article Title",
  "description": "A short summary of the article.",
  "content": "Full markdown content goes here...",
  "category": "Programming",
  "projectLink": "https://github.com/...",
  "tags": ["tag1", "tag2"],
  "coverImage": "https://images.unsplash.com/..."
}`;

    const markdownFormatTemplate = `# Article Title

Write your article content here using markdown syntax.

## Section Heading

Your content with **bold**, *italic*, and \`code\` formatting.

### Subsection

- List item 1
- List item 2
- List item 3

> A meaningful blockquote

\`\`\`javascript
// Code blocks are supported
const hello = "world";
\`\`\`

![Image Alt](https://images.unsplash.com/...)

[Link Text](https://example.com)`;

    const handleCopyFormat = () => {
        const text = formatTab === 'json' ? jsonFormatTemplate : markdownFormatTemplate;
        navigator.clipboard.writeText(text);
        setCopiedFormat(true);
        setTimeout(() => setCopiedFormat(false), 2000);
    };

    const prettifyJson = () => {
        try {
            const obj = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(obj, null, 4));
        } catch (e) {
            alert("Cannot prettify: Invalid JSON");
        }
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            const val = newTagInput.trim().toLowerCase();
            if (val && !tags.includes(val)) {
                updatePostData({ tags: [...tags, val] });
            }
            setNewTagInput('');
            setIsAddingTag(false);
        }
    };

    const handleSelectTag = (tagName) => {
        const val = tagName.trim().toLowerCase();
        if (val && !tags.includes(val)) {
            updatePostData({ tags: [...tags, val] });
        }
        setIsTagDropdownOpen(false);
    };

    const handlePasteJson = () => {
        try {
            const data = JSON.parse(jsonInput);
            const updates = {};
            if (data.title) updates.title = data.title;
            if (data.description) updates.description = data.description;
            if (data.content) updates.content = data.content;
            if (data.category) updates.category = data.category;
            if (data.projectLink) updates.projectLink = data.projectLink;
            if (data.tags && Array.isArray(data.tags)) updates.tags = data.tags;
            if (data.coverImage) updates.coverImage = data.coverImage;

            updatePostData(updates);
            setIsJsonModalOpen(false);
            setJsonInput('');
        } catch (error) {
            alert("Invalid JSON format. Please check your input.");
        }
    };

    const handlePasteMarkdown = () => {
        if (markdownInput.trim()) {
            updatePostData({ content: markdownInput });
            setIsMarkdownModalOpen(false);
            setMarkdownInput('');
        }
    };

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            updatePostData({ coverImage: file });
        }
    };

    const handleLinkConfirm = (url) => {
        if (url) {
            updatePostData({ coverImage: url });
            setIsImageModalOpen(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-background pt-8 pb-32 px-6 md:px-12">
            <div className="editor-container mx-auto max-w-[850px] w-full flex flex-col gap-10">

                {/* Header Section */}
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div
                        onClick={() => {
                            if (!coverImage) fileInputRef.current.click();
                        }}
                        className="relative group h-64 w-full rounded-xl overflow-hidden border-2 border-dashed border-default hover:border-primary/50 transition-all flex flex-col items-center justify-center cursor-pointer shadow-sm"
                    >
                        {imagePreview ? (
                            <SkeletonImage src={imagePreview} alt="Cover" className="w-full h-full" />
                        ) : (
                            <>
                                <div className="p-4 rounded-xl text-muted group-hover:text-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                    <MdAddAPhoto className="text-4xl" />
                                </div>
                                <div className="text-center mt-4 px-6">
                                    <p className="text-sm font-black text-body">Add a high-quality cover image</p>
                                    <div className="flex items-center justify-center gap-4 mt-5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                fileInputRef.current.click();
                                            }}
                                            className="px-5 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                                        >
                                            Upload Image
                                        </button>
                                        <div className="flex items-center gap-3 px-4 py-2.5 bg-background border border-default rounded-xl hover:border-primary/30 group/btn transition-all"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsImageModalOpen(true);
                                            }}
                                        >
                                            <HiOutlineLink className="text-muted group-hover/btn:text-primary transition-colors" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted group-hover/btn:text-primary transition-colors">Paste Link</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted font-bold mt-5 uppercase tracking-[0.2em] opacity-50">1600 x 900px recommended • PNG, JPG, WEBP</p>
                                </div>
                            </>
                        )}
                        {coverImage && (
                            <button
                                onClick={(e) => { e.stopPropagation(); updatePostData({ coverImage: null }); }}
                                className="absolute top-4 right-4 p-2 bg-rose-500/90 text-white rounded-full lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-lg border border-white/20 active:scale-90"
                            >
                                <HiXMark className="text-xl" />
                            </button>
                        )}
                    </div>

                    <div className="w-full space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Article Title</label>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{title.length} / 100</span>
                        </div>
                        <textarea
                            value={title}
                            onChange={(e) => updatePostData({ title: e.target.value })}
                            className="peer w-full no-scrollbar resize-none border-none bg-transparent p-0 text-4xl md:text-6xl font-black tracking-tight placeholder:text-muted/40 text-muted focus:ring-0 focus:outline-none transition-all leading-[1.1]"
                            onInput={(e) => { e.target.style.height = ""; e.target.style.height = e.target.scrollHeight + "px" }}
                            placeholder="Article Title..." rows="1"></textarea>
                        <div className="h-0.5 w-full bg-border relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary -translate-x-full peer-focus:translate-x-0 transition-transform duration-500 ease-out"></div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="w-full space-y-2">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Short Summary</label>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{description.length} / 200</span>
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => updatePostData({ description: e.target.value })}
                            className="peer w-full resize-none border-none bg-transparent p-0 text-lg md:text-xl font-medium leading-relaxed placeholder:text-muted/30 focus:ring-0 focus:outline-none transition-all text-muted"
                            onInput={(e) => { e.target.style.height = ""; e.target.style.height = e.target.scrollHeight + "px" }}
                            placeholder="Write a catchy summary for the article feed..." rows="2"></textarea>
                        <div className="h-px w-full bg-border relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/40 -translate-x-full peer-focus:translate-x-0 transition-transform duration-500 ease-out"></div>
                        </div>
                    </div>
                </div>

                {/* Metadata & Tags Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="flex flex-col gap-3">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Article Category</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                className="w-full flex items-center justify-between p-4 bg-transparent border border-default rounded-xl shadow-sm focus-within:border-primary/50 transition-all text-body font-bold"
                            >
                                <span className={category ? "text-body" : "text-muted/40"}>
                                    {category
                                        ? (categories?.find(cat => cat._id === category)?.categoryName || "Selected Category")
                                        : "Select Category"}
                                </span>
                                <HiChevronDown className={`text-base transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isCategoryDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsCategoryDropdownOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute left-0 top-full mt-2 w-full bg-card border border-default rounded-xl shadow-2xl overflow-hidden z-50 p-1.5"
                                        >
                                            {categories && categories.map((cat) => (
                                                <button
                                                    key={cat._id}
                                                    type="button"
                                                    onClick={() => {
                                                        updatePostData({ category: cat._id });
                                                        setIsCategoryDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 mb-1 rounded-xl text-xs font-bold transition-all ${category === cat._id
                                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                        : 'hover:bg-box text-muted hover:text-body'
                                                        }`}
                                                >
                                                    {cat.categoryName}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Project/External Link (Optional)</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center text-muted group-focus-within:text-primary transition-colors">
                                <HiOutlineLink className="text-lg" />
                            </div>
                            <input
                                type="url"
                                value={projectLink}
                                onChange={(e) => updatePostData({ projectLink: e.target.value })}
                                className="w-full outline-none pl-12 p-4 rounded-xl  border border-default shadow-sm focus:border-primary/50 focus:ring-0 transition-all text-body font-medium placeholder:text-muted/30"
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>
                </div>

                {/* Tags Integration */}
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Article Tags</label>
                    <div className="flex flex-wrap items-center gap-2 p-5 rounded-xl border border-default shadow-sm focus-within:border-primary/50 transition-all relative">
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span key={tag} className="flex items-center gap-1.5 bg-primary/5 text-body px-3.5 py-2 rounded-xl text-xs font-black border border-primary/10 group hover:bg-primary/10 transition-colors cursor-default">
                                    #{tag}
                                    <button
                                        onClick={() => updatePostData({ tags: tags.filter(t => t !== tag) })}
                                        className="text-muted hover:text-red-500 transition-colors"
                                    >
                                        <HiXMark className="text-base" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            {isAddingTag ? (
                                <div className="flex items-center gap-1.5 bg-primary/5 px-3.5 py-2 rounded-xl border border-primary/20 animate-in zoom-in duration-200">
                                    <span className="text-xs font-black text-primary/60">#</span>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newTagInput}
                                        onChange={(e) => setNewTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        onBlur={handleAddTag}
                                        className="min-w-[100px] outline-none text-body bg-transparent border-none focus:ring-0 text-xs font-black p-0"
                                        placeholder="new-tag..."
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsAddingTag(true)}
                                        className="group flex items-center gap-2 px-4 py-2 rounded-xl text-muted hover:text-primary border border-default hover:border-primary/30 transition-all duration-300 active:scale-95"
                                    >
                                        <HiPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Custom</span>
                                    </button>

                                    <div className="relative">
                                        <button
                                            onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                                            className="group flex items-center gap-2 px-4 py-2 rounded-xl text-muted hover:text-primary border border-default hover:border-primary/30 transition-all duration-300 active:scale-95"
                                        >
                                            <HiChevronDown className={`text-sm transition-transform duration-300 ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
                                            <span className="text-[10px] font-black uppercase tracking-wider">Select Tags</span>
                                        </button>

                                        <AnimatePresence>
                                            {isTagDropdownOpen && (
                                                <>
                                                    <div className="fixed inset-0 z-40" onClick={() => setIsTagDropdownOpen(false)} />
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute right-0 bottom-full mb-3 w-64 bg-card border border-default rounded-xl shadow-2xl overflow-hidden z-50 p-1.5"
                                                    >
                                                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted border-b border-default mb-1.5">Available Hashtags</div>
                                                        <div className="max-h-60 overflow-y-auto no-scrollbar">
                                                            {availableTags && availableTags.length > 0 ? (
                                                                availableTags.map((tag) => (
                                                                    <button
                                                                        key={tag._id}
                                                                        type="button"
                                                                        onClick={() => handleSelectTag(tag.tagName)}
                                                                        className={`w-full text-left px-4 py-2.5 mb-1 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${tags.includes(tag.tagName.toLowerCase())
                                                                            ? 'bg-primary/10 text-primary opacity-50 cursor-not-allowed'
                                                                            : 'hover:bg-box text-muted hover:text-body'
                                                                            }`}
                                                                        disabled={tags.includes(tag.tagName.toLowerCase())}
                                                                    >
                                                                        <span className="opacity-40">#</span>
                                                                        {tag.tagName}
                                                                    </button>
                                                                ))
                                                            ) : (
                                                                <div className="px-4 py-6 text-center text-[10px] font-bold text-muted uppercase tracking-widest italic opacity-40">No tags found</div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Import Actions */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-3 ml-1">Quick Import</label>
                    <div className="rounded-lg border border-default shadow-sm overflow-hidden">
                        {/* Action Cards Grid — horizontal row on mobile, vertical cards on sm+ */}
                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-px">
                            <button
                                onClick={() => setIsJsonModalOpen(true)}
                                className="group flex flex-row sm:flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 hover:bg-primary/5 transition-all active:scale-[0.98]"
                            >
                                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                    <HiOutlineCommandLine className="text-base sm:text-2xl" />
                                </div>
                                <div className="text-left sm:text-center">
                                    <p className="text-[9px] sm:text-[11px] font-black text-body uppercase tracking-widest">JSON</p>
                                    <p className="text-[9px] font-medium text-muted mt-0.5 hidden sm:block">Import from JSON data</p>
                                </div>
                            </button>
                            <button
                                onClick={() => setIsMarkdownModalOpen(true)}
                                className="group flex flex-row sm:flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 hover:bg-primary/5 transition-all active:scale-[0.98]"
                            >
                                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                    <HiOutlineDocumentText className="text-base sm:text-2xl" />
                                </div>
                                <div className="text-left sm:text-center">
                                    <p className="text-[9px] sm:text-[11px] font-black text-body uppercase tracking-widest">Markdown</p>
                                    <p className="text-[9px] font-medium text-muted mt-0.5 hidden sm:block">Import markdown content</p>
                                </div>
                            </button>
                            <button
                                onClick={() => setIsFormatModalOpen(true)}
                                className="group flex flex-row sm:flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 hover:bg-primary/5 transition-all active:scale-[0.98]"
                            >
                                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                    <HiOutlineInformationCircle className="text-base sm:text-2xl" />
                                </div>
                                <div className="text-left sm:text-center">
                                    <p className="text-[9px] sm:text-[11px] font-black text-body uppercase tracking-widest">Format</p>
                                    <p className="text-[9px] font-medium text-muted mt-0.5 hidden sm:block">See expected file structure</p>
                                </div>
                            </button>
                        </div>
                        {/* Status Footer */}
                        <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 border-t border-default">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="size-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[8px] sm:text-[9px] font-black text-muted uppercase tracking-widest">Auto-saved</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2.5">
                                <span className="text-[8px] sm:text-[9px] font-black text-muted uppercase tracking-widest">{readingTime} min read</span>
                                <HiCheckCircle className="text-green-500 text-sm sm:text-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar & Editor Area */}
                <TextEditor
                    content={content}
                    updatePostData={updatePostData}
                />

                {/* Bottom Action Footer */}
                <div className="flex flex-col items-center justify-center gap-8 pt-12 border-t border-default animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h4 className="text-2xl font-black leading-none">All set to share?</h4>
                        <p className="text-xs font-medium text-muted uppercase tracking-widest px-4">Review your insights before making them public and sharing with the world</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
                        <button
                            onClick={handleSaveDraft}
                            disabled={loading || isSavingDraft}
                            className="w-full sm:w-auto px-10 py-4 text-muted text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary/10 transition-all border border-default active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isSavingDraft && <div className="size-3 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />}
                            {isSavingDraft ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button
                            onClick={handlePublish}
                            disabled={loading}
                            className="w-full sm:w-auto px-14 py-4 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 group overflow-hidden relative disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            {loading ? (
                                <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <HiOutlineSparkles className="text-lg group-hover:rotate-12 transition-transform" />
                            )}
                            {loading ? 'Publishing...' : 'Publish Your Story'}
                        </button>
                    </div>
                </div>
            </div>

            {/* JSON Modal */}
            {isJsonModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-md transition-all duration-300" onClick={() => setIsJsonModalOpen(false)}></div>
                    <div className="relative w-full max-w-2xl max-h-[90vh] bg-background rounded-xl shadow-2xl border border-default overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                        <div className="p-6 border-b border-default flex items-center justify-between bg-background z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary"><HiOutlineCommandLine className="text-xl" /></div>
                                <div>
                                    <h3 className="text-lg font-black leading-none">Import Article Data</h3>
                                    <p className="text-[10px] text-muted font-black uppercase tracking-[0.15em] mt-1.5">Populate editor from JSON</p>
                                </div>
                            </div>
                            <button onClick={() => setIsJsonModalOpen(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors"><HiXMark className="text-xl text-muted" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-amber-500">
                                    <HiOutlineInformationCircle className="text-lg" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Format: Full Article Instance</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setJsonInput('')} className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted hover:text-red-500 transition-colors">Clear</button>
                                    <button onClick={prettifyJson} className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-all border border-primary/10">Prettify</button>
                                </div>
                            </div>
                            <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} className="w-full h-80 outline-none font-mono text-[13px] leading-relaxed p-6 rounded-xl border-2 border-default focus:border-primary/30 focus:ring-0 transition-all resize-none shadow-inner no-scrollbar text-body" placeholder={`{\n  "title": "Mastering Rust Memory Management: A Deep Dive",\n  "description": "Exploration of Rust memory safety and ownership model.",\n  "content": "Memory management is often the most challenging hurdle for developers...",\n  "category": "Programming",\n  "projectLink": "https://github.com/rust-lang/rust",\n  "tags": ["rust", "programming", "performance"],\n  "coverImage": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"\n}`}></textarea>
                            <div className="mt-8 flex gap-4 sticky bottom-0 bg-background pt-4 pb-2">
                                <button onClick={() => setIsJsonModalOpen(false)} className="flex-1 py-3 text-xs font-black uppercase tracking-[0.2em] text-muted hover:bg-primary/5 rounded-lg transition-all border border-transparent">Cancel</button>
                                <button onClick={handlePasteJson} className="flex-2 py-3 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"><HiOutlineSparkles className="text-lg" />Publish Your Story</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Markdown Modal */}
            {isMarkdownModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-md transition-all duration-300" onClick={() => setIsMarkdownModalOpen(false)}></div>
                    <div className="relative w-full max-w-2xl max-h-[90vh] bg-background rounded-xl shadow-2xl border border-default overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                        <div className="p-6 border-b border-default flex items-center justify-between bg-background z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary"><HiOutlineDocumentText className="text-xl" /></div>
                                <div>
                                    <h3 className="text-lg font-black leading-none">Import Markdown</h3>
                                    <p className="text-[10px] text-muted font-black uppercase tracking-[0.15em] mt-1.5">Paste markdown content into the editor</p>
                                </div>
                            </div>
                            <button onClick={() => setIsMarkdownModalOpen(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors"><HiXMark className="text-xl text-muted" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-amber-500">
                                    <HiOutlineInformationCircle className="text-lg" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider">Format: Markdown Content</span>
                                </div>
                                <button onClick={() => setMarkdownInput('')} className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted hover:text-red-500 transition-colors">Clear</button>
                            </div>
                            <textarea
                                value={markdownInput}
                                onChange={(e) => setMarkdownInput(e.target.value)}
                                className="w-full h-80 outline-none font-mono text-[13px] leading-relaxed p-6 rounded-xl border-2 border-default focus:border-primary/30 focus:ring-0 transition-all resize-none shadow-inner no-scrollbar text-body"
                                placeholder={`# Your Article Title\n\nStart writing your markdown content here...\n\n## Section Heading\n\nYour content with **bold**, *italic*, and \`code\` formatting.\n\n- List item 1\n- List item 2\n\n> A meaningful quote`}
                            ></textarea>
                            <div className="mt-8 flex gap-4 sticky bottom-0 bg-background pt-4 pb-2">
                                <button onClick={() => setIsMarkdownModalOpen(false)} className="flex-1 py-3 text-xs font-black uppercase tracking-[0.2em] text-muted hover:bg-primary/5 rounded-lg transition-all border border-transparent">Cancel</button>
                                <button onClick={handlePasteMarkdown} className="flex-2 py-3 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"><HiOutlineSparkles className="text-lg" />Publish Markdown</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Format Viewer Modal */}
            {isFormatModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-md transition-all duration-300" onClick={() => { setIsFormatModalOpen(false); setCopiedFormat(false); }}></div>
                    <div className="relative w-full max-w-2xl max-h-[90vh] bg-background rounded-xl shadow-2xl border border-default overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                        {/* Header */}
                        <div className="p-6 border-b border-default flex items-center justify-between bg-background z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary"><HiOutlineInformationCircle className="text-xl" /></div>
                                <div>
                                    <h3 className="text-lg font-black leading-none">File Format Reference</h3>
                                    <p className="text-[10px] text-muted font-black uppercase tracking-[0.15em] mt-1.5">Copy & use in the import fields</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Copy Button */}
                                <button
                                    onClick={handleCopyFormat}
                                    className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border active:scale-95 ${copiedFormat
                                        ? 'text-green-600 bg-green-500/10 border-green-500/20'
                                        : 'text-primary bg-primary/5 hover:bg-primary/10 border-primary/20 hover:border-primary/40'
                                        }`}
                                >
                                    {copiedFormat ? (
                                        <><HiCheckCircle className="text-base" /> Copied!</>
                                    ) : (
                                        <><HiOutlineClipboardDocument className="text-base" /> Copy</>
                                    )}
                                </button>
                                <button onClick={() => { setIsFormatModalOpen(false); setCopiedFormat(false); }} className="p-2 hover:bg-primary/5 rounded-full transition-colors">
                                    <HiXMark className="text-xl text-muted" />
                                </button>
                            </div>
                        </div>
                        {/* Tab Buttons */}
                        <div className="flex border-b border-default">
                            <button
                                onClick={() => { setFormatTab('json'); setCopiedFormat(false); }}
                                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${formatTab === 'json'
                                    ? 'text-primary'
                                    : 'text-muted hover:text-body'
                                    }`}
                            >
                                <HiOutlineCommandLine className="text-lg" />
                                JSON Format
                                {formatTab === 'json' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
                            </button>
                            <button
                                onClick={() => { setFormatTab('markdown'); setCopiedFormat(false); }}
                                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${formatTab === 'markdown'
                                    ? 'text-primary'
                                    : 'text-muted hover:text-body'
                                    }`}
                            >
                                <HiOutlineDocumentText className="text-lg" />
                                Markdown Format
                                {formatTab === 'markdown' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>}
                            </button>
                        </div>
                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                            <pre className="w-full font-mono text-[13px] leading-relaxed p-6 rounded-xl border-2 border-default shadow-inner text-body overflow-x-auto whitespace-pre-wrap">
                                {formatTab === 'json' ? jsonFormatTemplate : markdownFormatTemplate}
                            </pre>
                        </div>
                        {/* Footer */}
                        <div className="p-6 pt-0">
                            <button
                                onClick={() => { setIsFormatModalOpen(false); setCopiedFormat(false); }}
                                className="w-full py-3 text-xs font-black uppercase tracking-[0.2em] text-muted hover:bg-primary/5 rounded-lg transition-all border border-default"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <InputModal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                onConfirm={handleLinkConfirm}
                title="Insert Image URL"
                label="Image Source"
                placeholder="https://images.unsplash.com/photo-..."
            />
        </main >
    );
};

export default PostEditor;
