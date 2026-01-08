'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { useEffect, useCallback } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-6 my-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-6 my-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'mb-2',
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm prose-ul:list-disc prose-ol:list-decimal prose-li:ml-0 max-w-none focus:outline-none min-h-[300px] p-4 border border-gray-300 rounded-b-md [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-4 [&_li]:mb-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 text-sm font-bold rounded hover:bg-gray-200 ${
              editor.isActive('bold') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 text-sm italic rounded hover:bg-gray-200 ${
              editor.isActive('italic') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 text-sm underline rounded hover:bg-gray-200 ${
              editor.isActive('underline') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Underline (Ctrl+U)"
          >
            U
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 text-sm line-through rounded hover:bg-gray-200 ${
              editor.isActive('strike') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Strikethrough"
          >
            S
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 text-sm font-bold rounded hover:bg-gray-200 ${
              editor.isActive('heading', { level: 1 }) ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 text-sm font-bold rounded hover:bg-gray-200 ${
              editor.isActive('heading', { level: 2 }) ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 text-sm font-bold rounded hover:bg-gray-200 ${
              editor.isActive('heading', { level: 3 }) ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Align Left"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Align Center"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Align Right"
          >
            ➡
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Justify"
          >
            ↔️
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive('bulletList') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive('orderedList') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Numbered List"
          >
            1.
          </button>
        </div>

        {/* Link & Quote */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={setLink}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive('link') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Insert Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-2 py-1 text-sm rounded hover:bg-gray-200 ${
              editor.isActive('blockquote') ? 'bg-blue-200' : 'bg-white'
            }`}
            title="Blockquote"
          >
            "
          </button>
        </div>

        {/* Text Color */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="w-8 h-8 rounded cursor-pointer"
            title="Text Color"
          />
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="px-2 py-1 text-xs bg-white rounded hover:bg-gray-200"
            title="Remove Color"
          >
            ✕
          </button>
        </div>

        {/* Background Highlight */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fbbf24' }).run()}
            className={`px-2 py-1 text-sm rounded ${
              editor.isActive('highlight', { color: '#fbbf24' }) ? 'bg-yellow-300' : 'bg-white hover:bg-gray-200'
            }`}
            title="Highlight Yellow"
          >
            🖍
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            className="px-2 py-1 text-xs bg-white rounded hover:bg-gray-200"
            title="Remove Highlight"
          >
            ✕
          </button>
        </div>

        {/* Formatting */}
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="px-2 py-1 text-sm bg-white rounded hover:bg-gray-200"
            title="Horizontal Line"
          >
            ─
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHardBreak().run()}
            className="px-2 py-1 text-xs bg-white rounded hover:bg-gray-200"
            title="Line Break"
          >
            ↵
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="px-2 py-1 text-sm bg-white rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            ↶
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="px-2 py-1 text-sm bg-white rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Y)"
          >
            ↷
          </button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
