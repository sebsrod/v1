import { forwardRef } from 'react'

const EVE_NUTS_LOGO = () => (
  <svg viewBox="0 0 120 50" fill="currentColor" style={{ width: '100%', height: '100%' }}>
    <text x="60" y="22" textAnchor="middle" fontFamily="Comfortaa, sans-serif" fontWeight="700" fontSize="22" letterSpacing="1">Eve</text>
    <text x="60" y="45" textAnchor="middle" fontFamily="Comfortaa, sans-serif" fontWeight="700" fontSize="24" letterSpacing="1">Nuts</text>
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

const CanvasPreview = forwardRef(({ template, productImage, mobile }, ref) => {
  const { bgColor, textColor, accentColor, layout, headline, subtitle, cta, badge, showBadge, showLogo, showCta } = template
  const patternBg = getContrastBg(bgColor)
  const size = mobile ? 'min(85vw, 480px)' : '480px'

  const renderDecoCircles = () => (
    <>
      <div className="absolute rounded-full opacity-20" style={{ width: '62%', height: '62%', background: accentColor, top: '-16%', right: '-16%' }} />
      <div className="absolute rounded-full opacity-10" style={{ width: '42%', height: '42%', background: accentColor, bottom: '-12%', left: '-8%' }} />
    </>
  )

  const renderDots = () => {
    const dots = []
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        dots.push(
          <div key={`${i}-${j}`} className="absolute rounded-full" style={{ width: '0.8%', height: '0.8%', background: patternBg, top: `${12 + i * 4}%`, right: `${6 + j * 4}%` }} />
        )
      }
    }
    return dots
  }

  const renderBadge = () => {
    if (!showBadge || !badge) return null
    return (
      <div className="absolute top-[5%] right-[5%] font-bold px-[4%] py-[2%] rounded-full shadow-lg z-10" style={{ background: accentColor, color: bgColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(10px, 3.3%, 16px)' }}>
        {badge}
      </div>
    )
  }

  const renderLogo = () => {
    if (!showLogo) return null
    return (
      <div className="absolute bottom-[5%] left-[5%] z-10" style={{ color: textColor, width: '17%', opacity: 0.7 }}>
        <EVE_NUTS_LOGO />
      </div>
    )
  }

  const renderCta = () => {
    if (!showCta || !cta) return null
    return (
      <div className="px-[5%] py-[2%] rounded-full font-semibold tracking-wide inline-block" style={{ background: accentColor, color: bgColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(9px, 2.9%, 14px)' }}>
        {cta}
      </div>
    )
  }

  const renderProductImage = () => {
    if (!productImage) {
      return (
        <div className="rounded-2xl flex items-center justify-center" style={{ width: '46%', aspectRatio: '1', background: patternBg, border: `2px dashed ${textColor}30` }}>
          <div className="text-center opacity-40" style={{ color: textColor }}>
            <svg className="mx-auto mb-1" width="20%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <span style={{ fontFamily: 'Comfortaa', fontSize: 'clamp(8px, 2.2%, 12px)' }}>Tu producto</span>
          </div>
        </div>
      )
    }
    return (
      <img src={productImage} alt="Producto" className="rounded-2xl object-cover shadow-lg" style={{ width: '46%', aspectRatio: '1' }} crossOrigin="anonymous" />
    )
  }

  const renderLayout = () => {
    switch (layout) {
      case 'product-center':
        return (
          <div className="flex flex-col items-center justify-center h-full px-[8%] py-[6%] relative z-[1]">
            {renderProductImage()}
            <h2 className="mt-[4%] font-bold text-center leading-tight" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(18px, 7.5%, 36px)' }}>{headline}</h2>
            <p className="mt-[1.5%] text-center opacity-85" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(10px, 3.3%, 16px)' }}>{subtitle}</p>
            <div className="mt-[4%]">{renderCta()}</div>
          </div>
        )
      case 'product-side':
        return (
          <div className="flex h-full relative z-[1]">
            <div className="flex-1 flex flex-col justify-center px-[6%] py-[6%]">
              <h2 className="font-bold leading-tight" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(16px, 6.6%, 32px)' }}>{headline}</h2>
              <p className="mt-[3%] opacity-85" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(9px, 2.9%, 14px)', lineHeight: '1.6' }}>{subtitle}</p>
              <div className="mt-[4%]">{renderCta()}</div>
            </div>
            <div className="flex-1 flex items-center justify-center p-[4%]">
              {renderProductImage()}
            </div>
          </div>
        )
      case 'quote-center':
        return (
          <div className="flex flex-col items-center justify-center h-full px-[10%] py-[6%] relative z-[1]">
            <div className="opacity-20" style={{ color: accentColor, fontFamily: 'serif', fontSize: 'clamp(30px, 12.5%, 60px)' }}>"</div>
            <h2 className="font-bold text-center leading-snug" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(16px, 6.6%, 32px)' }}>{headline}</h2>
            <div className="rounded-full my-[4%]" style={{ width: '14%', height: '2px', background: accentColor }} />
            <p className="text-center opacity-80 leading-relaxed" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(10px, 3.3%, 16px)' }}>{subtitle}</p>
            <div className="mt-[5%]">{renderCta()}</div>
          </div>
        )
      case 'sale-bold':
        return (
          <div className="flex flex-col items-center justify-center h-full px-[8%] py-[6%] relative z-[1]">
            <h2 className="font-bold text-center leading-none" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(28px, 11.6%, 56px)', letterSpacing: '-1px' }}>{headline}</h2>
            <div className="rounded-full my-[4%]" style={{ width: '17%', height: '3px', background: accentColor }} />
            <p className="text-center font-medium leading-relaxed" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(12px, 4.2%, 20px)', opacity: 0.9 }}>{subtitle}</p>
            <div className="mt-[5%]">{renderCta()}</div>
          </div>
        )
      case 'recipe':
        return (
          <div className="flex flex-col h-full relative z-[1]">
            <div className="flex-1 flex items-center justify-center p-[4%]">
              {renderProductImage()}
            </div>
            <div className="px-[6%] pb-[6%] pt-[4%] rounded-t-3xl" style={{ background: patternBg }}>
              <div className="font-bold uppercase tracking-widest mb-[2%]" style={{ color: accentColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(8px, 2.2%, 12px)' }}>{badge}</div>
              <h2 className="font-bold leading-tight" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(14px, 5%, 24px)' }}>{headline}</h2>
              <p className="mt-[2%] opacity-70 leading-relaxed" style={{ color: textColor, fontFamily: 'Comfortaa, sans-serif', fontSize: 'clamp(9px, 2.9%, 14px)' }}>{subtitle}</p>
              <div className="mt-[3%]">{renderCta()}</div>
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
        style={{ width: size, aspectRatio: '1', background: bgColor, borderRadius: '12px' }}
      >
        {renderDecoCircles()}
        {renderDots()}
        {renderBadge()}
        {renderLogo()}
        {renderLayout()}
      </div>
      <p className="text-[10px] md:text-xs text-white/30 mt-2 md:mt-3">1080 x 1080 px (Instagram Post)</p>
    </div>
  )
})

CanvasPreview.displayName = 'CanvasPreview'

export default CanvasPreview
