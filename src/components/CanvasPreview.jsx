import { useRef, forwardRef } from 'react'

const EVE_NUTS_LOGO = () => (
  <svg viewBox="0 0 120 50" fill="currentColor" style={{ width: '100%', height: '100%' }}>
    <text
      x="60"
      y="22"
      textAnchor="middle"
      fontFamily="Comfortaa, sans-serif"
      fontWeight="700"
      fontSize="22"
      letterSpacing="1"
    >
      Eve
    </text>
    <text
      x="60"
      y="45"
      textAnchor="middle"
      fontFamily="Comfortaa, sans-serif"
      fontWeight="700"
      fontSize="24"
      letterSpacing="1"
    >
      Nuts
    </text>
  </svg>
)

function getContrastBg(color) {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'
}

const CanvasPreview = forwardRef(({ template, productImage }, ref) => {
  const {
    bgColor,
    textColor,
    accentColor,
    layout,
    headline,
    subtitle,
    cta,
    badge,
    showBadge,
    showLogo,
    showCta,
  } = template

  const patternBg = getContrastBg(bgColor)

  const renderDecoCircles = () => (
    <>
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: '300px',
          height: '300px',
          background: accentColor,
          top: '-80px',
          right: '-80px',
        }}
      />
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: '200px',
          height: '200px',
          background: accentColor,
          bottom: '-60px',
          left: '-40px',
        }}
      />
    </>
  )

  const renderDots = () => {
    const dots = []
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        dots.push(
          <div
            key={`${i}-${j}`}
            className="absolute rounded-full"
            style={{
              width: '4px',
              height: '4px',
              background: patternBg,
              top: `${60 + i * 20}px`,
              right: `${30 + j * 20}px`,
            }}
          />
        )
      }
    }
    return dots
  }

  const renderBadge = () => {
    if (!showBadge || !badge) return null
    return (
      <div
        className="absolute top-6 right-6 font-bold text-sm px-4 py-2 rounded-full shadow-lg z-10"
        style={{
          background: accentColor,
          color: bgColor,
          fontFamily: 'Comfortaa, sans-serif',
          fontSize: '16px',
        }}
      >
        {badge}
      </div>
    )
  }

  const renderLogo = () => {
    if (!showLogo) return null
    return (
      <div
        className="absolute bottom-6 left-6 z-10"
        style={{ color: textColor, width: '80px', height: '36px', opacity: 0.7 }}
      >
        <EVE_NUTS_LOGO />
      </div>
    )
  }

  const renderCta = () => {
    if (!showCta || !cta) return null
    return (
      <div
        className="px-6 py-2.5 rounded-full font-semibold text-sm tracking-wide"
        style={{
          background: accentColor,
          color: bgColor,
          fontFamily: 'Comfortaa, sans-serif',
          fontSize: '14px',
        }}
      >
        {cta}
      </div>
    )
  }

  const renderProductImage = () => {
    if (!productImage) {
      return (
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{
            width: '220px',
            height: '220px',
            background: patternBg,
            border: `2px dashed ${textColor}30`,
          }}
        >
          <div className="text-center opacity-40" style={{ color: textColor }}>
            <svg
              className="mx-auto mb-2"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <span className="text-xs block" style={{ fontFamily: 'Comfortaa' }}>Tu producto</span>
          </div>
        </div>
      )
    }
    return (
      <img
        src={productImage}
        alt="Producto"
        className="rounded-2xl object-cover shadow-lg"
        style={{ width: '220px', height: '220px' }}
        crossOrigin="anonymous"
      />
    )
  }

  const renderLayout = () => {
    switch (layout) {
      case 'product-center':
        return (
          <div className="flex flex-col items-center justify-center h-full px-10 py-12 relative z-[1]">
            {renderProductImage()}
            <h2
              className="mt-6 font-bold text-center leading-tight"
              style={{
                color: textColor,
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '36px',
              }}
            >
              {headline}
            </h2>
            <p
              className="mt-2 text-center opacity-85"
              style={{
                color: textColor,
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '16px',
              }}
            >
              {subtitle}
            </p>
            <div className="mt-5">{renderCta()}</div>
          </div>
        )

      case 'product-side':
        return (
          <div className="flex h-full relative z-[1]">
            <div className="flex-1 flex flex-col justify-center px-8 py-12">
              <h2
                className="font-bold leading-tight"
                style={{
                  color: textColor,
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '32px',
                }}
              >
                {headline}
              </h2>
              <p
                className="mt-3 opacity-85"
                style={{
                  color: textColor,
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                {subtitle}
              </p>
              <div className="mt-5">{renderCta()}</div>
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              {renderProductImage()}
            </div>
          </div>
        )

      case 'quote-center':
        return (
          <div className="flex flex-col items-center justify-center h-full px-14 py-12 relative z-[1]">
            <div
              className="text-6xl mb-4 opacity-20"
              style={{ color: accentColor, fontFamily: 'serif' }}
            >
              "
            </div>
            <h2
              className="font-bold text-center leading-snug"
              style={{
                color: textColor,
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '32px',
              }}
            >
              {headline}
            </h2>
            <div
              className="w-16 h-1 rounded-full my-5"
              style={{ background: accentColor }}
            />
            <p
              className="text-center opacity-80 leading-relaxed"
              style={{
                color: textColor,
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '16px',
              }}
            >
              {subtitle}
            </p>
            <div className="mt-6">{renderCta()}</div>
          </div>
        )

      case 'sale-bold':
        return (
          <div className="flex flex-col items-center justify-center h-full px-10 py-12 relative z-[1]">
            <h2
              className="font-bold text-center leading-none"
              style={{
                color: textColor,
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '56px',
                letterSpacing: '-1px',
              }}
            >
              {headline}
            </h2>
            <div
              className="w-20 h-1.5 rounded-full my-5"
              style={{ background: accentColor }}
            />
            <p
              className="text-center font-medium leading-relaxed"
              style={{
                color: textColor,
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '20px',
                opacity: 0.9,
              }}
            >
              {subtitle}
            </p>
            <div className="mt-6">{renderCta()}</div>
          </div>
        )

      case 'recipe':
        return (
          <div className="flex flex-col h-full relative z-[1]">
            <div className="flex-1 flex items-center justify-center p-6">
              {renderProductImage()}
            </div>
            <div
              className="px-8 pb-10 pt-6 rounded-t-3xl"
              style={{ background: patternBg }}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: accentColor, fontFamily: 'Comfortaa, sans-serif' }}
              >
                {badge}
              </div>
              <h2
                className="font-bold leading-tight"
                style={{
                  color: textColor,
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px',
                }}
              >
                {headline}
              </h2>
              <p
                className="mt-2 opacity-70 leading-relaxed"
                style={{
                  color: textColor,
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                }}
              >
                {subtitle}
              </p>
              <div className="mt-4">{renderCta()}</div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: '480px',
          height: '480px',
          background: bgColor,
          borderRadius: '12px',
        }}
      >
        {renderDecoCircles()}
        {renderDots()}
        {renderBadge()}
        {renderLogo()}
        {renderLayout()}
      </div>
      <p className="text-xs text-white/30 mt-3">1080 x 1080 px (Instagram Post)</p>
    </div>
  )
})

CanvasPreview.displayName = 'CanvasPreview'

export default CanvasPreview
