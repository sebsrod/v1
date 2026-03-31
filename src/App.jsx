import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import CanvasPreview from './components/CanvasPreview'
import TemplateSelector from './components/TemplateSelector'
import EditorPanel from './components/EditorPanel'
import { TEMPLATES } from './data/templates'

function App() {
  const [template, setTemplate] = useState({ ...TEMPLATES[0] })
  const [productImage, setProductImage] = useState(null)
  const [exporting, setExporting] = useState(false)
  const [activeTab, setActiveTab] = useState('templates')
  const canvasRef = useRef(null)

  const handleSelectTemplate = useCallback((t) => {
    setTemplate({ ...t })
  }, [])

  const handleTemplateChange = useCallback((updated) => {
    setTemplate(updated)
  }, [])

  const handleImageUpload = useCallback((e) => {
    if (e === null) {
      setProductImage(null)
      return
    }
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setProductImage(ev.target.result)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return
    setExporting(true)
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 1080 / 480,
        useCORS: true,
        backgroundColor: null,
      })
      const link = document.createElement('a')
      link.download = `evenuts-${template.id}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    }
    setExporting(false)
  }, [template.id])

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
            style={{ background: '#C66D0F', color: '#fff' }}
          >
            E
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">Eve Nuts</h1>
            <p className="text-[10px] text-white/40">Instagram Designer</p>
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: '#C66D0F', color: '#fff' }}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {exporting ? 'Exportando...' : 'Descargar PNG'}
        </button>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[320px] border-r border-white/10 flex flex-col overflow-hidden shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('templates')}
              className="flex-1 py-3 text-xs font-semibold transition-all"
              style={{
                color: activeTab === 'templates' ? '#C66D0F' : 'rgba(255,255,255,0.4)',
                borderBottom: activeTab === 'templates' ? '2px solid #C66D0F' : '2px solid transparent',
                fontFamily: 'Comfortaa',
              }}
            >
              Plantillas
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className="flex-1 py-3 text-xs font-semibold transition-all"
              style={{
                color: activeTab === 'editor' ? '#C66D0F' : 'rgba(255,255,255,0.4)',
                borderBottom: activeTab === 'editor' ? '2px solid #C66D0F' : '2px solid transparent',
                fontFamily: 'Comfortaa',
              }}
            >
              Personalizar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'templates' ? (
              <TemplateSelector
                selectedId={template.id}
                onSelect={handleSelectTemplate}
              />
            ) : (
              <EditorPanel
                template={template}
                onChange={handleTemplateChange}
                onImageUpload={handleImageUpload}
                productImage={productImage}
              />
            )}
          </div>
        </aside>

        {/* Canvas area */}
        <main className="flex-1 flex items-center justify-center bg-[#111] p-8 overflow-auto">
          <CanvasPreview
            ref={canvasRef}
            template={template}
            productImage={productImage}
          />
        </main>
      </div>
    </div>
  )
}

export default App
