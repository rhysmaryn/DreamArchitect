import { X } from "lucide-react";

export function ImageModal({ image, onClose }) {
    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose} // clicking outside closes
        >
            <div
                className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[90vh]">
                    <img
                        src={image.image_url}
                        alt={image.prompt}
                        className="w-full object-contain rounded-t-2xl"
                    />

                    <div className="p-4">
                        <p className="text-gray-800 dark:text-gray-200 font-medium whitespace-pre-line">
                            {image.prompt}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Style: {image.style}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
