// Style selector component
// This component displays a grid of art style options for users to choose from
// when generating images (e.g., Realistic, 3D, Anime, etc.).

// Available art styles with their display properties
const styles = [
  { value: 'Realistic', label: 'Realistic', gradient: 'from-emerald-500 to-teal-600' },
  { value: '3D', label: '3D Render', gradient: 'from-purple-500 to-pink-600' },
  { value: 'Digital Art', label: 'Digital Art', gradient: 'from-blue-500 to-cyan-600' },
  { value: 'Oil Painting', label: 'Oil Painting', gradient: 'from-amber-500 to-orange-600' },
  { value: 'Watercolor', label: 'Watercolor', gradient: 'from-rose-500 to-pink-600' },
  { value: 'Anime', label: 'Anime', gradient: 'from-fuchsia-500 to-purple-600' },
  { value: 'Cyberpunk', label: 'Cyberpunk', gradient: 'from-cyan-500 to-blue-600' },
  { value: 'Fantasy', label: 'Fantasy', gradient: 'from-violet-500 to-purple-600' },
];

export function StyleSelector({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Choose Your Style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => onChange(style.value)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              value === style.value
                ? 'border-purple-600 dark:border-purple-500 shadow-xl shadow-purple-500/30 bg-purple-50 dark:bg-purple-950/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-700 hover:shadow-lg hover:shadow-purple-500/10'
            }`}
          >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${style.gradient} opacity-10`} />
            <div className="relative">
              <div className={`w-full h-12 rounded-lg bg-gradient-to-br ${style.gradient} mb-2`} />
              <p className={`text-sm font-medium transition-colors ${
                value === style.value
                  ? 'text-purple-700 dark:text-purple-300 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {style.label}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
