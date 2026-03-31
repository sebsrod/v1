import { useState } from 'react'
import { TEMPLATES, CATEGORIES } from '../data/templates'

export default function TemplateSelector({ selectedId, onSelect }) {
  const [filter, setFilter] = useState('all')

  const filtered =
    filter === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === filter)

  return (
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
        Plantillas
      </h3>

      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: filter === cat.id ? '#C66D0F' : 'rgba(255,255,255,0.08)',
              color: filter === cat.id ? '#fff' : 'rgba(255,255,255,0.5)',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {filtered.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            className="group relative rounded-xl overflow-hidden transition-all aspect-square"
            style={{
              background: t.bgColor,
              outline:
                selectedId === t.id
                  ? '3px solid #C66D0F'
                  : '2px solid transparent',
              outlineOffset: '2px',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
              <span
                className="font-bold text-xs text-center leading-tight"
                style={{ color: t.textColor, fontFamily: 'Comfortaa' }}
              >
                {t.headline}
              </span>
              <span
                className="text-[9px] mt-1 opacity-60 text-center"
                style={{ color: t.textColor, fontFamily: 'Comfortaa' }}
              >
                {t.subtitle}
              </span>
            </div>
            <div
              className="absolute bottom-0 inset-x-0 py-1.5 text-[10px] font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                fontFamily: 'Comfortaa',
              }}
            >
              {t.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
