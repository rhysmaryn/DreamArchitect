// Image modal component for displaying generated images larger
// Buttons to favorite, delete, regenerate
// Ability to edit prompt and iterate on design

import { useState } from "react";
import { X, Heart, Trash2, RefreshCcw } from "lucide-react";

export function ImageModal({
                               image,
                               onClose,
                               onFavorite,
                               onDelete,
                               onRegenerate
                           }) {
    if (!image) return null;

    // local editable fields
    const [editPrompt, setEditPrompt] = useState(image.prompt);
    const [editStyle, setEditStyle] = useState(image.style);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
                onClick={(e) => e.stopPropagation()}
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

                    <div className="p-5 space-y-4">
                        {/* Editable Prompt */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Edit Prompt
                            </label>
                            <textarea
                                value={editPrompt}
                                onChange={(e) => setEditPrompt(e.target.value)}
                                className="w-full mt-2 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                rows={4}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            {/* Favorite */}
                            <button
                                onClick={() =>
                                    onFavorite(image.id, !image.is_favorite)
                                }
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl transition ${
                                    image.is_favorite
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                <Heart
                                    className={`w-5 h-5 ${
                                        image.is_favorite ? "fill-white" : ""
                                    }`}
                                />
                                {image.is_favorite ? "Unfavorite" : "Favorite"}
                            </button>

                            {/* Regenerate */}
                            <button
                                onClick={() => {
                                    onRegenerate(editPrompt, editStyle);
                                    onClose();
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                            >
                                <RefreshCcw className="w-5 h-5" />
                                Regenerate
                            </button>

                            {/* Delete */}
                            <button
                                onClick={() => {
                                    onDelete(image.id);
                                    onClose();
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
                            >
                                <Trash2 className="w-5 h-5" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

