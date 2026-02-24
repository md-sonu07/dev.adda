import { useState, useCallback, useEffect, useRef } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatStrikethrough,
    MdCode,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdKeyboardArrowDown,
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdHorizontalRule,
    MdUndo,
    MdRedo,
} from "react-icons/md"
import {
    HiOutlineLink,
    HiOutlinePhoto,
    HiOutlineEye,
    HiOutlineEyeSlash,
    HiOutlineCodeBracket,
} from "react-icons/hi2"
import InputModal from "../../common/InputModal"

import "./TextEditor.css"

// Moving extensions outside the component ensures they are static 
// and created only once, which prevents the "Duplicate extension" warning.
const extensions = [
    StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: false,
    }),
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    Link.extend({
        name: 'customLink',
    }).configure({
        openOnClick: false,
        HTMLAttributes: { class: "editor-link" },
    }),
    Image.configure({
        HTMLAttributes: { class: "editor-image" },
    }),
];

function TextEditor({ content, updatePostData }) {
    const [headingOpen, setHeadingOpen] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [linkModal, setLinkModal] = useState({ isOpen: false, initialValue: "" })
    const [imageModal, setImageModal] = useState({ isOpen: false })
    const headingRef = useRef(null)

    // useEditor handles its own lifecycle. 
    // Passing an empty dependency array ensures it only initializes once.
    // Forcing re-render on every transaction to ensure the toolbar reflects active states immediately
    const [, forceUpdate] = useState({});

    const editor = useEditor({
        extensions,
        content: content || "",
        onUpdate: ({ editor }) => {
            updatePostData({ content: editor.getHTML() })
        },
        onSelectionUpdate: () => forceUpdate({}),
        onTransaction: () => forceUpdate({}),
    }, [])

    // Close heading dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (headingRef.current && !headingRef.current.contains(e.target)) {
                setHeadingOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleSetLink = useCallback(() => {
        if (!editor) return
        const previousUrl = editor.getAttributes("customLink").href
        setLinkModal({ isOpen: true, initialValue: previousUrl || "" })
    }, [editor])

    const onLinkConfirm = (url) => {
        if (!editor) return
        if (url === "") {
            editor.chain().focus().extendMarkRange("customLink").unsetLink().run()
        } else {
            editor.chain().focus().extendMarkRange("customLink").setLink({ href: url }).run()
        }
        setLinkModal({ isOpen: false, initialValue: "" })
    }

    const handleInsertImage = useCallback(() => {
        if (!editor) return
        setImageModal({ isOpen: true })
    }, [editor])

    const onImageConfirm = (url) => {
        if (!editor) return
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
        setImageModal({ isOpen: false })
    }

    if (!editor) return null

    const currentHeadingLevel = [1, 2, 3, 4].find((level) =>
        editor.isActive("heading", { level })
    )
    const headingLabel = currentHeadingLevel ? `H${currentHeadingLevel}` : "¶"

    const headingOptions = [
        { level: 1, label: "Heading 1", shortLabel: "H1", fontSize: "text-xl", fontWeight: "font-black" },
        { level: 2, label: "Heading 2", shortLabel: "H2", fontSize: "text-lg", fontWeight: "font-bold" },
        { level: 3, label: "Heading 3", shortLabel: "H3", fontSize: "text-base", fontWeight: "font-semibold" },
        { level: 4, label: "Heading 4", shortLabel: "H4", fontSize: "text-sm", fontWeight: "font-semibold" },
        { level: 0, label: "Paragraph", shortLabel: "¶", fontSize: "text-sm", fontWeight: "font-normal" },
    ]

    return (
        <section className="te-container">
            {/* Live Preview Panel */}
            {showPreview && (
                <div className="te-preview-panel">
                    <div className="te-preview-header">
                        <div className="te-preview-dot te-dot-red" />
                        <div className="te-preview-dot te-dot-yellow" />
                        <div className="te-preview-dot te-dot-green" />
                        <span className="te-preview-title">Live Preview</span>
                    </div>
                    <div
                        className="te-preview-content"
                        dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                    />
                </div>
            )}
            {/* Toolbar */}
            <div className="te-toolbar-wrapper">
                <div className="te-toolbar">

                    {/* Undo / Redo */}
                    <div className="te-toolbar-group">
                        <button
                            className="te-btn"
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            title="Undo (Ctrl+Z)"
                        >
                            <MdUndo />
                        </button>
                        <button
                            className="te-btn"
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            title="Redo (Ctrl+Shift+Z)"
                        >
                            <MdRedo />
                        </button>
                    </div>

                    <div className="te-divider" />

                    {/* Heading Dropdown */}
                    <div className="te-toolbar-group">
                        <div className="te-heading-wrapper" ref={headingRef}>
                            <button
                                className={`te-btn te-heading-trigger ${currentHeadingLevel ? "te-btn-active" : ""}`}
                                onClick={() => setHeadingOpen(!headingOpen)}
                                title="Heading Level"
                            >
                                <span className="te-heading-label">{headingLabel}</span>
                                <MdKeyboardArrowDown className={`te-heading-arrow ${headingOpen ? "te-arrow-open" : ""}`} />
                            </button>

                            {headingOpen && (
                                <div className="te-heading-dropdown">
                                    {headingOptions.map((opt) => (
                                        <button
                                            key={opt.level}
                                            className={`te-heading-option ${opt.level === 0
                                                ? editor.isActive("paragraph") && !currentHeadingLevel
                                                    ? "te-heading-option-active"
                                                    : ""
                                                : editor.isActive("heading", { level: opt.level })
                                                    ? "te-heading-option-active"
                                                    : ""
                                                }`}
                                            onClick={() => {
                                                if (opt.level === 0) {
                                                    editor.chain().focus().setParagraph().run()
                                                } else {
                                                    editor.chain().focus().toggleHeading({ level: opt.level }).run()
                                                }
                                                setHeadingOpen(false)
                                            }}
                                        >
                                            <span className={`te-heading-option-badge`}>{opt.shortLabel}</span>
                                            <span className={`${opt.fontSize} ${opt.fontWeight}`}>{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="te-divider" />

                    {/* Text Formatting */}
                    <div className="te-toolbar-group">
                        <button
                            className={`te-btn ${editor.isActive("bold") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            title="Bold (Ctrl+B)"
                        >
                            <MdFormatBold />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive("italic") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            title="Italic (Ctrl+I)"
                        >
                            <MdFormatItalic />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive("strike") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            title="Strikethrough (Ctrl+Shift+S)"
                        >
                            <MdFormatStrikethrough />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive("code") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            title="Inline Code (Ctrl+E)"
                        >
                            <HiOutlineCodeBracket />
                        </button>
                    </div>

                    <div className="te-divider" />

                    {/* Lists & Structure */}
                    <div className="te-toolbar-group">
                        <button
                            className={`te-btn ${editor.isActive("bulletList") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            title="Bullet List"
                        >
                            <MdFormatListBulleted />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive("orderedList") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            title="Ordered List"
                        >
                            <MdFormatListNumbered />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive("blockquote") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            title="Blockquote"
                        >
                            <MdFormatQuote />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive("codeBlock") ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            title="Code Block"
                        >
                            <MdCode />
                        </button>
                    </div>

                    <div className="te-divider" />

                    {/* Text Alignment */}
                    <div className="te-toolbar-group">
                        <button
                            className={`te-btn ${editor.isActive({ textAlign: "left" }) ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().setTextAlign("left").run()}
                            title="Align Left"
                        >
                            <MdFormatAlignLeft />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive({ textAlign: "center" }) ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().setTextAlign("center").run()}
                            title="Align Center"
                        >
                            <MdFormatAlignCenter />
                        </button>
                        <button
                            className={`te-btn ${editor.isActive({ textAlign: "right" }) ? "te-btn-active" : ""}`}
                            onClick={() => editor.chain().focus().setTextAlign("right").run()}
                            title="Align Right"
                        >
                            <MdFormatAlignRight />
                        </button>
                    </div>

                    <div className="te-divider" />

                    {/* Insert */}
                    <div className="te-toolbar-group">
                        <button
                            className={`te-btn ${editor.isActive("customLink") ? "te-btn-active" : ""}`}
                            onClick={handleSetLink}
                            title="Insert Link (Ctrl+K)"
                        >
                            <HiOutlineLink />
                        </button>
                        <button
                            className="te-btn"
                            onClick={handleInsertImage}
                            title="Insert Image"
                        >
                            <HiOutlinePhoto />
                        </button>
                        <button
                            className="te-btn"
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            title="Horizontal Rule"
                        >
                            <MdHorizontalRule />
                        </button>
                    </div>

                    {/* Spacer */}
                    <div className="te-toolbar-spacer" />

                    {/* Preview Toggle */}
                    <button
                        className={`te-preview-toggle ${showPreview ? "te-preview-toggle-active" : ""}`}
                        onClick={() => setShowPreview(!showPreview)}
                        title={showPreview ? "Hide Preview" : "Show Preview"}
                    >
                        {showPreview ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                        <span>{showPreview ? "Hide" : "Preview"}</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="te-content-layout">
                {/* Editor Area */}
                <div className={`te-editor-area ${showPreview ? "te-editor-split" : ""}`}>
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* Custom Modals */}
            <InputModal
                isOpen={linkModal.isOpen}
                onClose={() => setLinkModal({ isOpen: false, initialValue: "" })}
                onConfirm={onLinkConfirm}
                title="Insert Web Link"
                label="Destination URL"
                placeholder="https://example.com"
                initialValue={linkModal.initialValue}
            />
            <InputModal
                isOpen={imageModal.isOpen}
                onClose={() => setImageModal({ isOpen: false })}
                onConfirm={onImageConfirm}
                title="Insert Content Image"
                label="Image Source URL"
                placeholder="https://images.unsplash.com/photo-..."
            />
        </section>
    )
}

export default TextEditor
