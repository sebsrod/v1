import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import CanvasPreview from './components/CanvasPreview'
import TemplateSelector from './components/TemplateSelector'
import EditorPanel from './components/EditorPanel'
import AIPanel from './components/AIPanel'
import { TEMPLATES } from './data/templates'

function App() {
  const [template, setTemplate] = useState({ ...TEMPLATES[0] })
  const [productImage, setProductImage] = useState(null)
  const [exporting, setExporting] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')
  const canvasRef = useRef(null)

  const handleSelectTemplate = useCallback((t) => {
    setTemplate({ ...t })
    setActiveTab('preview')
  }, [])

  const handleTemplateChange = useCallback((updated) => {
    setTemplate(updated)
  }, [])

  const handleAIApply = useCallback((updated) => {
    setTemplate(updated)
    setActiveTab('preview')
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
        scale: 1080 / canvasRef.current.offsetWidth,
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

  const tabs = [
    { id: 'preview', label: 'Vista previa', icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM12 15a3 3 0 100-6 3 3 0 000 6z' },
    { id: 'ai', label: 'IA', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z' },
    { id: 'templates', label: 'Plantillas', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { id: 'editor', label: 'Editar', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' },
  ]

  const desktopTabs = ['templates', 'editor', 'ai']

  return (
    <div className="h-dvh flex flex-col overflow-hidden" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold text-base md:text-lg"
            style={{ background: '#C66D0F', color: '#fff' }}
          >
            E
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold text-white leading-tight">Eve Nuts</h1>
            <p className="text-[9px] md:text-[10px] text-white/40">Instagram Designer</p>
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-1.5 px-3.5 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: '#C66D0F', color: '#fff' }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="md:w-[18px] md:h-[18px]">
            <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {exporting ? 'Exportando...' : 'Descargar PNG'}
        </button>
      </header>

      {/* Desktop layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <aside className="w-[340px] border-r border-white/10 flex flex-col overflow-hidden shrink-0">
          <div className="flex border-b border-white/10">
            {desktopTabs.map((tabId) => {
              const tab = tabs.find((t) => t.id === tabId)
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className="flex-1 py-3 text-xs font-semibold transition-all"
                  style={{
                    color: activeTab === tabId ? '#C66D0F' : 'rgba(255,255,255,0.4)',
                    borderBottom: activeTab === tabId ? '2px solid #C66D0F' : '2px solid transparent',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'templates' && (
              <TemplateSelector selectedId={template.id} onSelect={handleSelectTemplate} />
            )}
            {activeTab === 'editor' && (
              <EditorPanel template={template} onChange={handleTemplateChange} onImageUpload={handleImageUpload} productImage={productImage} />
            )}
            {activeTab === 'ai' && (
              <AIPanel template={template} onApply={handleAIApply} />
            )}
          </div>
        </aside>
        <main className="flex-1 flex items-center justify-center bg-[#111] p-8 overflow-auto">
          <CanvasPreview ref={canvasRef} template={template} productImage={productImage} />
        </main>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col flex-1 overflow-hidden md:hidden">
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'preview' && (
            <div className="flex items-center justify-center bg-[#111] p-4 min-h-full">
              <CanvasPreview ref={canvasRef} template={template} productImage={productImage} mobile />
            </div>
          )}
          {activeTab === 'templates' && (
            <div className="p-4">
              <TemplateSelector selectedId={template.id} onSelect={handleSelectTemplate} />
            </div>
          )}
          {activeTab === 'editor' && (
            <div className="p-4 pb-24">
              <EditorPanel template={template} onChange={handleTemplateChange} onImageUpload={handleImageUpload} productImage={productImage} />
            </div>
          )}
          {activeTab === 'ai' && (
            <div className="p-4 pb-24">
              <AIPanel template={template} onApply={handleAIApply} />
            </div>
          )}
        </div>

        {/* Mobile bottom nav */}
        <nav className="shrink-0 border-t border-white/10 bg-[#1a1a1a] flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
              style={{
                color: activeTab === tab.id ? '#C66D0F' : 'rgba(255,255,255,0.35)',
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d={tab.icon} />
              </svg>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default App
