// Main application component for Dream Architect
// This component handles the AI image generation interface, displays the user's gallery,
// and manages the overall application state including image creation, favoriting, and deletion.

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, LogIn } from 'lucide-react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { ImageCard } from './components/ImageCard';
import { StyleSelector } from './components/StyleSelector';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import { getRandomPrompt } from './utils/randomPrompts';
import { ImageModal } from './components/ImageModal';


function App() {
  const { user, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
    if (user) {
      loadImages();
    } else {
      setImages([]);
    }
  }, [user]);

  const loadImages = async () => {
    if (!user) return;

    setLoadingImages(true);
    try {
      const { data, error } = await supabase
        .from('generated_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  const generateImage = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            style,
            apiKey: 'f5fe768fcf387849eea4996b14181b74d7af8397748f9275e709e5a9e1b09ded851ce5f7e0b7a88ab8506ca682226dc4'
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to generate image');
      }

      const { error: insertError } = await supabase
        .from('generated_images')
        .insert({
          user_id: user.id,
          prompt,
          style,
          image_url: result.image,
          is_favorite: false,
        });

      if (insertError) throw insertError;

      await loadImages();
      setPrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleSurpriseMe = () => {
    setPrompt(getRandomPrompt());
  };

  const handleFavorite = async (id, isFavorite) => {
    try {
      const { error } = await supabase
        .from('generated_images')
        .update({ is_favorite: isFavorite })
        .eq('id', id);

      if (error) throw error;
      await loadImages();
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('generated_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleRegenerate = (regeneratePrompt, regenerateStyle) => {
    setPrompt(regeneratePrompt);
    setStyle(regenerateStyle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-700 shadow-lg shadow-purple-500/10">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                AI-Powered Dream Visualization
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 dark:from-purple-400 dark:via-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
                Dreams Into Art
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Describe any dream or cherished memory, and watch as AI transforms it into stunning visual art with breathtaking detail
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-500/10 border border-gray-200 dark:border-purple-900 animate-slideUp">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Your Dream Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your dream or memory... Let your imagination flow freely."
                className="w-full h-32 px-4 py-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 transition-all resize-none shadow-sm focus:shadow-lg focus:shadow-purple-500/20"
                disabled={loading}
              />
            </div>

            <StyleSelector value={style} onChange={setStyle} />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={generateImage}
                disabled={loading || !prompt.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 hover:from-purple-700 hover:via-violet-700 hover:to-fuchsia-700 text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Dream</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSurpriseMe}
                disabled={loading}
                className="px-6 py-4 rounded-xl border-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-semibold hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-fuchsia-500/10 dark:hover:from-purple-400/10 dark:hover:to-fuchsia-400/10 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Surprise Me
              </button>
            </div>

            {!user && (
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex items-center gap-3">
                <LogIn className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                  Sign in to save your generated images and access them later
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap shadow-lg shadow-purple-500/30"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          {user && (
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Gallery</h3>
              </div>

              {loadingImages ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-20">
                  <ImageIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No images generated yet. Start creating your dreams!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {images.map((image) => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      onClick={() => setSelectedImage(image)}
                      onFavorite={handleFavorite}
                      onDelete={handleDelete}
                      onRegenerate={handleRegenerate}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        {selectedImage && (
            <ImageModal
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
                onRegenerate={handleRegenerate}
            />
        )}

    </div>
  );
}

export default App;
