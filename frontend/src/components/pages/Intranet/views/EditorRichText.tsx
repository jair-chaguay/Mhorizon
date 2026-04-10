import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${
          editor.isActive('bold') ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded text-sm italic transition-colors ${
          editor.isActive('italic') ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        I
      </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded text-sm transition-colors ${
          editor.isActive('bulletList') ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        Lista
      </button>
    </div>
  );
};

const EditorRichText: React.FC<EditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        // Aquí aplicamos clases de Tailwind directamente al área de texto
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px] p-4 text-gray-700',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Efecto para actualizar el editor si el valor cambia desde fuera (ej. al editar)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-orange-500 transition-colors">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorRichText;