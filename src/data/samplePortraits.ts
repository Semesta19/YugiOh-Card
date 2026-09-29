export interface SamplePortrait {
  id: string;
  name: string;
  tag: string;
  description: string;
  dataUrl: string;
}

// Generate high quality SVG data URLs that represent real human head-and-shoulders portraits
// These serve as immediate zero-friction test inputs for the user
function createSampleSvg(skinTone: string, hairColor: string, shirtColor: string, title: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="600" height="700">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${skinTone}"/>
        <stop offset="100%" stop-color="#9d6746"/>
      </linearGradient>
      <radialGradient id="highlight" cx="45%" cy="35%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="hair" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${hairColor}"/>
        <stop offset="100%" stop-color="#18181b"/>
      </linearGradient>
      <linearGradient id="shirt" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${shirtColor}"/>
        <stop offset="100%" stop-color="#090d16"/>
      </linearGradient>
    </defs>
    <rect width="600" height="700" fill="url(#bg)"/>
    
    <!-- Studio Light Backing -->
    <circle cx="300" cy="270" r="240" fill="#38bdf8" opacity="0.12" filter="blur(40px)"/>
    
    <!-- Torso / Shoulders -->
    <path d="M 120 700 C 130 560, 200 480, 300 480 C 400 480, 470 560, 480 700 Z" fill="url(#shirt)"/>
    <path d="M 230 480 L 300 550 L 370 480 Z" fill="#b9825b" opacity="0.8"/>
    
    <!-- Neck -->
    <rect x="255" y="380" width="90" height="110" rx="15" fill="#a46f4b"/>
    <path d="M 255 420 Q 300 460 345 420 L 345 460 L 255 460 Z" fill="#885536" opacity="0.4"/>
    
    <!-- Head / Face -->
    <ellipse cx="300" cy="280" rx="105" ry="135" fill="url(#skin)"/>
    <ellipse cx="300" cy="280" rx="105" ry="135" fill="url(#highlight)"/>
    
    <!-- Ears -->
    <ellipse cx="190" cy="285" rx="16" ry="30" fill="${skinTone}"/>
    <ellipse cx="410" cy="285" rx="16" ry="30" fill="${skinTone}"/>
    
    <!-- Hair Base -->
    <path d="M 180 270 C 170 160, 240 120, 300 120 C 360 120, 430 160, 420 270 C 400 210, 360 180, 300 180 C 240 180, 200 210, 180 270 Z" fill="url(#hair)"/>
    
    <!-- Eyes -->
    <ellipse cx="260" cy="270" rx="16" ry="10" fill="#ffffff"/>
    <ellipse cx="340" cy="270" rx="16" ry="10" fill="#ffffff"/>
    <circle cx="260" cy="270" r="7" fill="#2d1b0d"/>
    <circle cx="340" cy="270" r="7" fill="#2d1b0d"/>
    <circle cx="258" cy="268" r="2.5" fill="#ffffff"/>
    <circle cx="338" cy="268" r="2.5" fill="#ffffff"/>
    
    <!-- Eyebrows -->
    <path d="M 240 250 Q 260 240 280 250" stroke="#1f1812" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M 320 250 Q 340 240 360 250" stroke="#1f1812" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    
    <!-- Nose -->
    <path d="M 300 265 L 295 310 Q 300 318 308 310" stroke="#7a4625" stroke-width="3" fill="none" stroke-linecap="round"/>
    
    <!-- Mouth / Smile -->
    <path d="M 275 348 Q 300 365 325 348" stroke="#683416" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    
    <!-- Badge -->
    <rect x="20" y="20" width="160" height="34" rx="8" fill="#000000" opacity="0.6"/>
    <text x="100" y="42" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">Sample Portrait: ${title}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_PORTRAITS: SamplePortrait[] = [
  {
    id: 'sample-male-1',
    name: 'Kenzo (Adventurer)',
    tag: 'Realistic Male',
    description: 'Confident natural portrait with dark hair and warm undertones (similar to Articuno sample)',
    dataUrl: createSampleSvg('#c98a58', '#2b2118', '#1e3a8a', 'Kenzo')
  },
  {
    id: 'sample-female-1',
    name: 'Airi (Strategist)',
    tag: 'Realistic Female',
    description: 'Focused studio portrait with soft lighting and natural styling',
    dataUrl: createSampleSvg('#e0a982', '#3f2212', '#701a75', 'Airi')
  },
  {
    id: 'sample-male-2',
    name: 'Damon (Champion)',
    tag: 'Bold Expression',
    description: 'Chiseled charismatic headshot ready for legendary dragon and flame transformations',
    dataUrl: createSampleSvg('#b87d4b', '#171717', '#991b1b', 'Damon')
  }
];
