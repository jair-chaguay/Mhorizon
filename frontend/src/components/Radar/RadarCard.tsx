import React from 'react';

interface NoticiaProps {
    id?: string;
    titulo: string;
    categoria: string;
    noticia: string;
    content: string;
    image: string; 
    url: string;
}

export const RadarCard: React.FC<NoticiaProps> = ({ titulo, categoria, noticia, content, image, url }) => {
    return (
        <div className="w-75 sm:w-100 h-full"> 
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 hover:border-orange-500/50 transition-all group h-full"
            >
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden relative">
                    <img 
                        src={image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        alt={categoria} 
                    />
                </div>
                <div className="flex-1 py-1 pr-2">
                    <span className="text-orange-500 text-[0.60rem] font-bold uppercase tracking-widest mb-1 block">
                        {titulo} • {categoria}
                    </span>
                    <h3 className="text-white font-bold text-[0.80rem] sm:text-[0.90rem] leading-tight mb-1 line-clamp-2">
                        {noticia}
                    </h3>
                    <p className="text-gray-400 text-[0.70rem] font-light line-clamp-1">
                        {content}
                    </p>
                </div>
            </a>
        </div>
    );
};