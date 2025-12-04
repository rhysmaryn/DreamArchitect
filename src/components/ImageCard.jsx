// Image card component for displaying generated images
// This component shows a generated image with its details and provides buttons
// for favoriting, downloading, regenerating, and deleting the image.

import { Download, Heart, RefreshCw, Trash2 } from 'lucide-react';

export function ImageCard({ image, onClick, onFavorite, onDelete, onRegenerate }) {
  // Download the image to user's device
  const handleDownload = async () => {
    const link = document.createElement('a');
    link.href = image.image_url;
    link.download = `dream-architect-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-gray-200 dark:border-purple-900 animate-fadeIn">
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div
              onClick={onClick}
              className="cursor-pointer group relative"
              >
              <img
                  src={image.image_url}
                  alt={image.prompt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
          </div>

      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 p-4 space-y-3">
          <p className="text-white text-sm font-medium line-clamp-2">{image.prompt}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">
              {image.style}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 relative z-10">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onFavorite(image.id, !image.is_favorite)}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              image.is_favorite
                ? 'bg-red-500/20 text-red-500'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500/10 hover:text-red-500'
            }`}
            title={image.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${image.is_favorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-500/20 hover:text-purple-500 transition-all duration-300 hover:scale-110"
            title="Download image"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={() => onRegenerate(image.prompt, image.style)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-500/20 hover:text-violet-500 transition-all duration-300 hover:scale-110"
            title="Regenerate with same prompt"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          <button
            onClick={() => onDelete(image.id)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-all duration-300 hover:scale-110"
            title="Delete image"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(image.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
