import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const parts = [
  { title: 'Tela', detail: 'A camada de vidro e o painel de imagem são desenhados separadamente para mostrar a superfície de interação.' },
  { title: 'Estrutura', detail: 'A armação esquemática dá forma ao aparelho e posiciona os componentes. Não representa uma engenharia real.' },
  { title: 'Bateria', detail: 'O bloco central ilustra onde uma fonte de energia poderia ficar no conjunto.' },
  { title: 'Câmeras', detail: 'Os círculos mostram um conjunto de lentes conceitual. Quantidade e posição não descrevem um produto à venda.' },
  { title: 'Tampa traseira', detail: 'A última placa fecha a composição visual do aparelho fictício.' },
] as const

function LayerArtwork({ index }: { index: number }) {
  const common = <rect x="16" y="12" width="148" height="300" rx="26" />
  if (index === 0) return <svg viewBox="0 0 180 324" aria-hidden="true"><defs><linearGradient id="screenFill" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#071a4f" /><stop offset=".58" stopColor="#214de0" /><stop offset="1" stopColor="#060b17" /></linearGradient></defs><g fill="#090e19" stroke="#9bb4ff" strokeWidth="2">{common}</g><rect x="23" y="19" width="134" height="286" rx="21" fill="url(#screenFill)" /><path d="M24 222C74 118 107 211 157 79" fill="none" stroke="#93b0ff" strokeWidth="2" opacity=".8" /><circle cx="90" cy="31" r="3" fill="#091122" /></svg>
  if (index === 1) return <svg viewBox="0 0 180 324" aria-hidden="true"><g fill="#353c46" stroke="#a6b2bf" strokeWidth="3">{common}</g><rect x="29" y="27" width="122" height="270" rx="16" fill="#202832" stroke="#667382" /><path d="M23 78h9m-9 17h9m116 73h9" stroke="#d8e0e8" strokeWidth="3" /></svg>
  if (index === 2) return <svg viewBox="0 0 180 324" aria-hidden="true"><g fill="#202833" stroke="#7b8ca4" strokeWidth="2">{common}</g><rect x="40" y="65" width="100" height="196" rx="9" fill="#353f4e" stroke="#9eb3d9" strokeWidth="2" /><rect x="69" y="57" width="42" height="8" rx="2" fill="#758aa9" /><path d="M60 163h60" stroke="#657a9a" strokeWidth="2" /><path d="M88 146l-9 20h12l-5 16 18-26H92l6-10" fill="#b7c8ec" /></svg>
  if (index === 3) return <svg viewBox="0 0 180 324" aria-hidden="true"><g fill="#141b26" stroke="#7789a1" strokeWidth="2">{common}</g><path d="M27 125h126M27 205h126M60 25v274M123 25v274" fill="none" stroke="#425269" strokeWidth="3" /><rect x="32" y="30" width="89" height="94" rx="17" fill="#2c3544" stroke="#a1b2c9" /><circle cx="57" cy="57" r="18" fill="#0b1018" stroke="#8fa8d5" strokeWidth="4" /><circle cx="96" cy="57" r="18" fill="#0b1018" stroke="#8fa8d5" strokeWidth="4" /><circle cx="57" cy="98" r="18" fill="#0b1018" stroke="#8fa8d5" strokeWidth="4" /><circle cx="96" cy="98" r="6" fill="#ccd8eb" /><rect x="73" y="148" width="37" height="31" rx="4" fill="#536580" /><path d="M73 155H50m60 8h28m-65 6H48" stroke="#416bd3" strokeWidth="3" /></svg>
  return <svg viewBox="0 0 180 324" aria-hidden="true"><defs><linearGradient id="backFill" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#5e6570" /><stop offset=".48" stopColor="#303842" /><stop offset="1" stopColor="#161c25" /></linearGradient></defs><g fill="url(#backFill)" stroke="#9ba7b9" strokeWidth="2">{common}</g><rect x="29" y="28" width="81" height="89" rx="17" fill="#29313d" stroke="#a4b1c0" /><circle cx="53" cy="54" r="15" fill="#090f18" stroke="#9faec5" strokeWidth="3" /><circle cx="88" cy="54" r="15" fill="#090f18" stroke="#9faec5" strokeWidth="3" /><circle cx="53" cy="91" r="15" fill="#090f18" stroke="#9faec5" strokeWidth="3" /><circle cx="87" cy="91" r="5" fill="#c3cfdd" /></svg>
}

export function ExplodedPhone() {
  const root = useRef<HTMLElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const progressText = useRef<HTMLSpanElement>(null)
  const [selected, setSelected] = useState(0)

  useGSAP(() => {
    const section = root.current
    if (!section) return
    const layers = gsap.utils.toArray<HTMLElement>('.exploded-layer')
    const media = gsap.matchMedia()
    media.add('(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
      if (progress.current) {
        progress.current.style.width = '0%'
        progress.current.parentElement?.setAttribute('aria-valuenow', '0')
      }
      if (progressText.current) progressText.current.textContent = '0%'
      gsap.set(layers, { x: 0, y: 0, opacity: 1 })
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=620',
          pin: true,
          anticipatePin: 1,
          refreshPriority: 1,
          scrub: 0.45,
          onUpdate: (self) => {
            // A separação termina antes de liberar a seção, deixando a vista completa à mostra.
            const amount = Math.min(100, Math.round((self.progress / 0.68) * 100))
            if (progress.current) {
              progress.current.style.width = `${amount}%`
              progress.current.parentElement?.setAttribute('aria-valuenow', String(amount))
            }
            if (progressText.current) progressText.current.textContent = `${amount}%`
          },
        },
      })
      timeline.to(layers, {
        x: (index) => (index - 2) * Math.min(122, Math.max(85, section.clientWidth * 0.09)),
        y: (index) => (index - 2) * -10,
        opacity: 1,
        ease: 'none',
        duration: 0.68,
      }).to({}, { duration: 0.32 })
      return () => { timeline.kill() }
    })
    return () => media.revert()
  }, { scope: root })

  return <section className="anatomy-section" id="por-dentro" ref={root} aria-labelledby="anatomy-title">
    <div className="container anatomy-layout">
      <div className="anatomy-copy">
        <p className="eyebrow light">Um aparelho, cinco camadas</p>
        <h2 id="anatomy-title">Por dentro,<br />{' '}<em>sem complicar.</em></h2>
        <p>Uma ilustração separa as partes de um celular fictício. Explore cada camada para entender sua função no conjunto.</p>
        <p className="anatomy-note">Ilustração conceitual. Não mostra a estrutura técnica de um modelo real.</p>
        <div className="progress-label"><span>Separação das camadas</span><span ref={progressText}>100%</span></div>
        <div className="progress-track" role="progressbar" aria-label="Progresso da vista explodida" aria-valuemin={0} aria-valuemax={100} aria-valuenow={100}><div ref={progress} /></div>
      </div>
      <div className="anatomy-visual">
        <div className="exploded-stage" role="img" aria-label="Ilustração em camadas separadas de tela, estrutura, bateria, câmeras e tampa traseira de um celular fictício">
          {parts.map((part, index) => <div className={`exploded-layer layer-${index}`} key={part.title}><LayerArtwork index={index} /></div>)}
        </div>
        <div className="anatomy-selector" aria-label="Partes do celular">
          {parts.map((part, index) => <button key={part.title} type="button" className={selected === index ? 'active' : ''} onClick={() => setSelected(index)} aria-pressed={selected === index}>{part.title}</button>)}
        </div>
        <div className="anatomy-detail" aria-live="polite"><strong>{parts[selected].title}</strong><p>{parts[selected].detail}</p></div>
      </div>
    </div>
  </section>
}
