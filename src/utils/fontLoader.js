/**
 * Optimized font loading utility
 * - Uses Font Loading API when available
 * - Falls back to simple preloads
 * - Implements font-display: swap for better performance
 */

// Font definitions with display swap
const fontDefinitions = [
  {
    family: 'CustomFont',
    url: '/fonts/custom-font.woff2',
    weight: '400',
    style: 'normal',
    display: 'swap'
  },
  {
    family: 'CustomFont',
    url: '/fonts/custom-font-bold.woff2',
    weight: '700',
    style: 'normal',
    display: 'swap'
  }
];

// Load fonts using modern Font Loading API
export function loadFonts() {
  // Check if Font Loading API is available
  if ('fonts' in document) {
    Promise.all(
      fontDefinitions.map(font => {
        // Create a new FontFace object
        const fontFace = new FontFace(
          font.family,
          `url(${font.url}) format('woff2')`,
          {
            weight: font.weight,
            style: font.style,
            display: font.display
          }
        );
        
        // Add font to document fonts collection
        return fontFace.load().then(loadedFace => {
          document.fonts.add(loadedFace);
          return loadedFace;
        });
      })
    ).then(
      () => {
        document.documentElement.classList.add('fonts-loaded');
        console.log('All fonts loaded successfully');
      },
      error => {
        console.error('Font loading failed:', error);
        // Add class to use system fonts as fallback
        document.documentElement.classList.add('fonts-failed');
      }
    );
  } else {
    // Fallback for browsers without Font Loading API
    const fontStylesheet = document.createElement('style');
    const fontFaceDeclarations = fontDefinitions.map(font => `
      @font-face {
        font-family: '${font.family}';
        src: url(${font.url}) format('woff2');
        font-weight: ${font.weight};
        font-style: ${font.style};
        font-display: ${font.display};
      }
    `).join('\n');
    
    fontStylesheet.textContent = fontFaceDeclarations;
    document.head.appendChild(fontStylesheet);
    
    // Mark fonts as being loaded
    // This happens immediately regardless of actual loading status
    document.documentElement.classList.add('fonts-loading');
  }
}

// Export a function to set CSS variables
export function setFontVariables() {
  document.documentElement.style.setProperty('--font-sans', '"CustomFont", system-ui, sans-serif');
}
