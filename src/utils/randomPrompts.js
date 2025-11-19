// Random prompt suggestions
// This file contains a collection of creative prompt suggestions that users can use
// for generating images when they click the "Surprise Me" button.

// Array of creative prompts for image generation
export const randomPrompts = [
  "A serene moonlit forest with glowing fireflies dancing between ancient trees",
  "A futuristic city floating among the clouds during a vibrant sunset",
  "An underwater palace made of coral and pearls with colorful fish swimming around",
  "A magical library with floating books and glowing enchanted scrolls",
  "A cozy cabin in snowy mountains with northern lights illuminating the sky",
  "A steampunk airship sailing through a sky full of colorful hot air balloons",
  "A mystical garden with luminescent flowers and a crystal-clear waterfall",
  "A cyberpunk street market with neon signs and holographic advertisements",
  "An ancient temple hidden in a misty jungle with exotic birds",
  "A space station orbiting a colorful nebula with distant planets",
  "A whimsical treehouse village connected by rope bridges and glowing lanterns",
  "A desert oasis at twilight with palm trees and a reflection pool",
  "A Victorian greenhouse filled with exotic plants and butterflies",
  "A medieval castle perched on a cliff overlooking a stormy sea",
  "A carnival at night with colorful lights, ferris wheel, and cotton candy stands",
  "A peaceful zen garden with stone pathways, bamboo, and a koi pond",
  "A fantasy market square with merchants selling magical items and potions",
  "A lighthouse on a rocky shore during a dramatic thunderstorm",
  "An astronaut standing on Mars watching Earth rise above the horizon",
  "A mystical cave with glowing crystals and an underground lake"
];

// Returns a random prompt from the list
export function getRandomPrompt() {
  return randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
}
