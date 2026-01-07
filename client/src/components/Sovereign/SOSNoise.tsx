/**
 * SOSNoise - Matte Plastic Texture Filter
 * 
 * Implements procedural noise overlay for the "Ceramic White" aesthetic.
 * Creates subtle grain texture that gives digital surfaces tactile quality.
 * Based on SVG feTurbulence filter for infinite, non-repeating noise.
 */

export function SOSNoise() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id="sos-noise-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.85" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * SOSNoiseOverlay - Global texture overlay component
 * Apply this at the root of your app to add matte finish to entire UI
 */
export function SOSNoiseOverlay() {
  return (
    <>
      <SOSNoise />
      <div 
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05] mix-blend-overlay"
        style={{
          filter: 'url(#sos-noise-filter)',
          width: '100%',
          height: '100%',
        }}
        aria-hidden="true"
      />
    </>
  );
}
