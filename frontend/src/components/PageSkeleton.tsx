// components/Loaders.jsx

export const PageSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 animate-pulse space-y-8 min-h-[60vh]">
      <div className="h-10 bg-gray-200 rounded-md w-1/3"></div>
      
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
      </div>

      {/* Simula unas tarjetas o imágenes (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-40 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};