import { BRAND_COLORS } from '../data/templates'

export default function EditorPanel({ template, onChange, onImageUpload, productImage }) {
  const update = (key, value) => {
    onChange({ ...template, [key]: value })
  }

  const colorEntries = Object.entries(BRAND_COLORS)

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">
        Editor
      </h3>

      {/* Textos */}
      <div>
        <label className="text-xs text-white/40 block mb-1">Titular</label>
        <input
          type="text"
          value={template.headline}
          onChange={(e) => update('headline', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C66D0F] transition-colors"
          style={{ fontFamily: 'Comfortaa' }}
        />
      </div>

      <div>
        <label className="text-xs text-white/40 block mb-1">Subtitulo</label>
        <textarea
          value={template.subtitle}
          onChange={(e) => update('subtitle', e.target.value)}
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C66D0F] transition-colors resize-none"
          style={{ fontFamily: 'Comfortaa' }}
        />
      </div>

      <div>
        <label className="text-xs text-white/40 block mb-1">Boton / CTA</label>
        <input
          type="text"
          value={template.cta}
          onChange={(e) => update('cta', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C66D0F] transition-colors"
          style={{ fontFamily: 'Comfortaa' }}
        />
      </div>

      <div>
        <label className="text-xs text-white/40 block mb-1">Badge</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={template.badge}
            onChange={(e) => update('badge', e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C66D0F] transition-colors"
            style={{ fontFamily: 'Comfortaa' }}
          />
          <button
            onClick={() => update('showBadge', !template.showBadge)}
            className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{
              background: template.showBadge ? '#C66D0F' : 'rgba(255,255,255,0.08)',
              color: template.showBadge ? '#fff' : 'rgba(255,255,255,0.4)',
            }}
          >
            {template.showBadge ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Colores */}
      <div>
        <label className="text-xs text-white/40 block mb-2">Color de fondo</label>
        <div className="flex gap-2 flex-wrap">
          {colorEntries.map(([name, color]) => (
            <button
              key={`bg-${name}`}
              onClick={() => update('bgColor', color)}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                background: color,
                borderColor:
                  template.bgColor === color ? '#fff' : 'transparent',
              }}
              title={name}
            />
          ))}
          <div className="relative w-8 h-8">
            <input
              type="color"
              value={template.bgColor}
              onChange={(e) => update('bgColor', e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-white/40 text-xs"
              style={{
                background: `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`,
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs text-white/40 block mb-2">Color de texto</label>
        <div className="flex gap-2 flex-wrap">
          {colorEntries.map(([name, color]) => (
            <button
              key={`txt-${name}`}
              onClick={() => update('textColor', color)}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                background: color,
                borderColor:
                  template.textColor === color ? '#fff' : 'transparent',
              }}
              title={name}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-white/40 block mb-2">Color de acento</label>
        <div className="flex gap-2 flex-wrap">
          {colorEntries.map(([name, color]) => (
            <button
              key={`acc-${name}`}
              onClick={() => update('accentColor', color)}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                background: color,
                borderColor:
                  template.accentColor === color ? '#fff' : 'transparent',
              }}
              title={name}
            />
          ))}
        </div>
      </div>

      {/* Imagen de producto */}
      <div>
        <label className="text-xs text-white/40 block mb-2">Imagen de producto</label>
        <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-white/15 cursor-pointer hover:border-[#C66D0F] hover:bg-white/5 transition-all">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="text-white/40"
          >
            <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <span className="text-xs text-white/40" style={{ fontFamily: 'Comfortaa' }}>
            {productImage ? 'Cambiar imagen' : 'Subir imagen'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
        {productImage && (
          <button
            onClick={() => onImageUpload(null)}
            className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Quitar imagen
          </button>
        )}
      </div>

      {/* Toggles */}
      <div className="flex gap-3">
        <button
          onClick={() => update('showLogo', !template.showLogo)}
          className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
          style={{
            background: template.showLogo ? '#C66D0F' : 'rgba(255,255,255,0.08)',
            color: template.showLogo ? '#fff' : 'rgba(255,255,255,0.4)',
            fontFamily: 'Comfortaa',
          }}
        >
          Logo {template.showLogo ? 'ON' : 'OFF'}
        </button>
        <button
          onClick={() => update('showCta', !template.showCta)}
          className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
          style={{
            background: template.showCta ? '#C66D0F' : 'rgba(255,255,255,0.08)',
            color: template.showCta ? '#fff' : 'rgba(255,255,255,0.4)',
            fontFamily: 'Comfortaa',
          }}
        >
          Boton {template.showCta ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  )
}
