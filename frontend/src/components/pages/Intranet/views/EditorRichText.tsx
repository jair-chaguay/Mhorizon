import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Importaciones de extensiones con destructuración (corrigiendo el error de TypeScript)
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Image } from '@tiptap/extension-image';

// IMPORTANTE: Ajusta esta ruta según la ubicación de tu archivo axios
import api from '../../../../api/axios'; 

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) return null;

  // Lógica para subir la imagen desde el dispositivo
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validación básica de tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen no debe superar los 2MB");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('imagen_editor', file);

      // Petición a tu API en Laravel
      const response = await api.post('/informativo/upload-imagen-editor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Construimos la URL final asumiendo que Laravel responde { url: 'storage/...' }
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const imageUrl = `${backendUrl}/${response.data.url}`;

      // Insertamos la imagen en el editor en la posición actual del cursor
      editor.chain().focus().setImage({ src: imageUrl }).run();
      
    } catch (error) {
      console.error("Error subiendo la imagen", error);
      alert("Hubo un error al subir la imagen al servidor. Verifique su conexión o el peso del archivo.");
    } finally {
      setIsUploading(false);
      // Limpiamos el input para poder subir la misma imagen de nuevo si es necesario
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
      
      {/* Botones de Texto Básico */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${editor.isActive('bold') ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded text-sm italic transition-colors ${editor.isActive('italic') ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
      >
        I
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Botones de Títulos y Listas */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded text-sm font-bold transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded text-sm transition-colors ${editor.isActive('bulletList') ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
      >
        Lista
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Botón de Imagen con Input Oculto */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden" 
      />
      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className={`px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-2 ${
          isUploading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
      >
        {isUploading ? (
           <span className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
        ) : "🖼️"} 
        {isUploading ? "Subiendo..." : "Imagen"}
      </button>

      {/* Botón de Insertar Tabla Básica */}
      <button
        type="button"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className="px-3 py-1.5 rounded text-sm transition-colors bg-white text-gray-600 hover:bg-gray-100"
      >
        📊 Tabla
      </button>
      
      {/* Controles Dinámicos de Tabla (Solo aparecen si el cursor está dentro de una tabla) */}
      {editor.can().addColumnBefore() && (
        <div className="flex gap-1 ml-auto bg-gray-200 p-1 rounded">
           <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="px-2 py-1 rounded text-[0.7rem] bg-white text-gray-700 hover:bg-gray-50">+ Col</button>
           <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="px-2 py-1 rounded text-[0.7rem] bg-white text-gray-700 hover:bg-gray-50">+ Fila</button>
           <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="px-2 py-1 rounded text-[0.7rem] bg-red-100 text-red-600 hover:bg-red-200">- Col</button>
           <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="px-2 py-1 rounded text-[0.7rem] bg-red-100 text-red-600 hover:bg-red-200">- Fila</button>
           <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="px-2 py-1 rounded text-[0.7rem] bg-red-500 text-white hover:bg-red-600">Borrar Tabla</button>
        </div>
      )}
    </div>
  );
};

const EditorRichText: React.FC<EditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({
        resizable: true, 
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: {
        // Clases de Tailwind 'prose' para darle formato automático al texto y tablas
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px] p-4 text-gray-700',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Efecto para sincronizar el estado externo con el editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-orange-500 transition-colors tiptap-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorRichText;