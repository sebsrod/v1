import { useState, useEffect } from 'react'
import { generatePostContent } from '../api/claude'

const SUGGESTIONS = [
  'Promocion 2x1 para el fin de semana',
  'Lanzamiento de nuevo sabor pistacho',
  'Receta saludable con crema de mani',
  'Post motivacional sobre snacks naturales',
  'Sorteo para ganar un pack completo',
  'Dato curioso sobre las avellanas',
]

export default function AIPanel({ template, onApply }) {
  const [apiKey, setApiKey] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [keyVisible, setKeyVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('evenuts_api_key')
    if (saved) setApiKey(saved)
  }, [])

  const saveKey = (key) => {
    setApiKey(key)
    if (key) localStorage.setItem('evenuts_api_key', key)
    else localStorage.removeItem('evenuts_api_key')
  }

  const handleGenerate = async () => {
    if (!apiKey) { setError('Ingresa tu API key de Anthropic'); return }
    if (!prompt) { setError('Escribe que tipo de post quieres'); return }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const data = await generatePostContent(apiKey, prompt)
      setResult(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  const handleApply = () => {
    if (!result) return
    onApply({
      ...template,
      headline: result.headline || template.headline,
      subtitle: result.subtitle || template.subtitle,
      cta: result.cta || template.cta,
      badge: result.badge || template.badge,
      showBadge: !!result.badge,
    })
    setResult(null)
    setPrompt('')
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">
        Generar con IA
      </h3>

      {/* API Key */}
      <div>
        <label className="text-xs text-white/40 block mb-1">API Key de Anthropic</label>
        <div className="flex gap-2">
          <input
            type={keyVisible ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => saveKey(e.target.value)}
            placeholder="sk-ant-..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C66D0F] transition-colors"
            style={{ fontFamily: 'monospace' }}
          />
          <button
            onClick={() => setKeyVisible(!keyVisible)}
            className="px-2 rounded-lg bg-white/5 text-white/40 text-xs"
          >
            {keyVisible ? 'Ocultar' : 'Ver'}
          </button>
        </div>
        <p className="text-[10px] text-white/25 mt-1">Se guarda solo en tu navegador</p>
      </div>

      {/* Prompt */}
      <div>
        <label className="text-xs text-white/40 block mb-1">Describe tu post</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: Promocion de verano con 30% de descuento en todas las cremas..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#C66D0F] transition-colors resize-none"
          style={{ fontFamily: 'Comfortaa' }}
        />
      </div>

      {/* Suggestions */}
      <div>
        <label className="text-xs text-white/40 block mb-2">Ideas rapidas</label>
        <div className="flex gap-1.5 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="px-2.5 py-1.5 rounded-full text-[10px] bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 transition-all active:scale-95"
              style={{ fontFamily: 'Comfortaa' }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        style={{ background: '#C66D0F', color: '#fff', fontFamily: 'Comfortaa' }}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            Generar contenido
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white/5 rounded-xl p-4 space-y-3 border border-white/10">
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Resultado</p>

          <div>
            <span className="text-[10px] text-white/30">Titular</span>
            <p className="text-white text-sm font-bold" style={{ fontFamily: 'Comfortaa' }}>{result.headline}</p>
          </div>
          <div>
            <span className="text-[10px] text-white/30">Subtitulo</span>
            <p className="text-white/80 text-xs" style={{ fontFamily: 'Comfortaa' }}>{result.subtitle}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="text-[10px] text-white/30">Boton</span>
              <p className="text-white/80 text-xs" style={{ fontFamily: 'Comfortaa' }}>{result.cta}</p>
            </div>
            {result.badge && (
              <div>
                <span className="text-[10px] text-white/30">Badge</span>
                <p className="text-white/80 text-xs" style={{ fontFamily: 'Comfortaa' }}>{result.badge}</p>
              </div>
            )}
          </div>
          {result.caption && (
            <div>
              <span className="text-[10px] text-white/30">Caption para Instagram</span>
              <p className="text-white/60 text-xs whitespace-pre-line mt-1" style={{ fontFamily: 'Comfortaa' }}>{result.caption}</p>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleApply}
              className="flex-1 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-95"
              style={{ background: '#C66D0F', color: '#fff', fontFamily: 'Comfortaa' }}
            >
              Aplicar al diseno
            </button>
            <button
              onClick={handleGenerate}
              className="px-4 py-2.5 rounded-xl text-xs bg-white/5 text-white/50 hover:bg-white/10 transition-all active:scale-95"
              style={{ fontFamily: 'Comfortaa' }}
            >
              Regenerar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
