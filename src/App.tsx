import { Component, useEffect, useMemo, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import { ExplodedPhone } from './ExplodedPhone'
import { HomeMotion } from './HomeMotion'
import { focusedSpec, isFocusedCriterion, priorityDescriptions, priorityOptions } from './choice'
import { byId, categories, formatPrice, products, type Category, type Priority, type Product, type Routine } from './products'
import { recommend, toggleCompare, type Answers } from './recommend'

type IconName = 'arrow' | 'bag' | 'heart' | 'compare' | 'search' | 'close' | 'minus' | 'plus'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M4 10h12" /><path d="m11 5 5 5-5 5" /></>,
    bag: <><path d="M4 7h12l-1 11H5L4 7Z" /><path d="M7 8V6a3 3 0 0 1 6 0v2" /></>,
    heart: <path d="M10 17s-6-3.7-7.4-7.2C1.4 6.7 3.2 4 6.1 4c1.7 0 3 .9 3.9 2.1C10.9 4.9 12.2 4 13.9 4c2.9 0 4.7 2.7 3.5 5.8C16 13.3 10 17 10 17Z" />,
    compare: <><rect x="2.5" y="4" width="6" height="12" rx="1" /><rect x="11.5" y="4" width="6" height="12" rx="1" /></>,
    search: <><circle cx="8.8" cy="8.8" r="5.8" /><path d="m13.2 13.2 4.3 4.3" /></>,
    close: <><path d="M4 4 16 16M16 4 4 16" /></>,
    minus: <path d="M4 10h12" />,
    plus: <path d="M4 10h12M10 4v12" />,
  }
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : fallback
  } catch {
    return fallback
  }
}

function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`image-fallback ${className}`} role="img" aria-label={`Imagem indisponível para ${product.name}`}><span>Imagem indisponível</span></div>
  return <img className={className} src={product.image} alt={product.imageAlt} loading="lazy" onError={() => setFailed(true)} />
}

function EmptyState({ title, text, href, action }: { title: string; text: string; href?: string; action?: string }) {
  return <div className="empty-state"><span className="empty-mark" aria-hidden="true">/</span><h2>{title}</h2><p>{text}</p>{href && <a className="button button-primary" href={href}>{action ?? 'Explorar catálogo'} <Icon name="arrow" /></a>}</div>
}

type Actions = {
  favorites: string[]
  compare: string[]
  cart: Record<string, number>
  toggleFavorite: (id: string) => void
  toggleComparison: (id: string) => void
  addCart: (id: string) => void
  changeQuantity: (id: string, amount: number) => void
  removeCart: (id: string) => void
}

function ProductCard({ product, actions, priority = null }: { product: Product; actions: Actions; priority?: Priority | null }) {
  const saved = actions.favorites.includes(product.id)
  const compared = actions.compare.includes(product.id)
  const focus = priority ? focusedSpec(product, priority) : null

  return <article className={'product-card' + (priority ? ' product-card-focused' : '')}>
    <div className="product-media">
      <a href={'/produto/' + product.id} aria-label={'Ver detalhes de ' + product.name}><ProductImage product={product} /></a>
      <span className="media-tag">Produto demonstrativo</span>
      <button className={'icon-button favorite-button' + (saved ? ' selected' : '')} type="button" onClick={() => actions.toggleFavorite(product.id)} aria-label={(saved ? 'Remover ' : 'Salvar ') + product.name + (saved ? ' dos favoritos' : ' nos favoritos')} aria-pressed={saved}><Icon name="heart" /></button>
    </div>
    <div className="product-card-body">
      <div className="product-topline"><span>{product.category}</span><span>Valor ilustrativo</span></div>
      <h3><a href={'/produto/' + product.id}>{product.name}</a></h3>
      <p>{product.line}</p>
      {priority && <div className="product-focus">
        <span>{focus && focus.label !== priority ? priority + ' / ' + focus.label : priority}</span>
        {focus ? <strong>{focus.value}</strong> : <small>Este atributo não está descrito na ficha deste item.</small>}
      </div>}
      <ul className="mini-specs">{product.shortSpecs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
      <div className="product-card-bottom"><strong>{formatPrice(product.price)}</strong><a href={'/produto/' + product.id} aria-label={'Ver detalhes de ' + product.name} className="round-arrow"><Icon name="arrow" /></a></div>
      <div className="product-card-actions">
        <button type="button" onClick={() => actions.toggleComparison(product.id)} aria-pressed={compared}>{compared ? 'Remover da comparação' : 'Comparar'}</button>
        <button type="button" onClick={() => actions.addCart(product.id)}>Adicionar à seleção</button>
      </div>
    </div>
  </article>
}

function Header({ actions }: { actions: Actions }) {
  const count = Object.values(actions.cart).reduce((sum, quantity) => sum + quantity, 0)
  const path = location.pathname
  return <>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <div className="announcement"><div className="container"><span>Projeto conceitual</span><span>Produtos e valores ilustrativos · nenhuma compra é realizada</span></div></div>
    <header className="site-header"><div className="container header-inner">
      <a className="wordmark" href="/" aria-label="FIO / tech, início">FIO<span>/</span><small>tech</small></a>
      <nav className="main-nav" aria-label="Navegação principal">
        <a href="/catalogo" aria-current={path === '/catalogo' ? 'page' : undefined}>Produtos</a>
        <a href="/comparar" aria-current={path === '/comparar' ? 'page' : undefined}>Comparar</a>
        <a href="/monte-seu-setup" aria-current={path === '/monte-seu-setup' ? 'page' : undefined}>Monte seu setup</a>
        <a href="/#por-dentro">Por dentro</a>
      </nav>
      <div className="header-tools">
        <a href="/favoritos" aria-current={path === '/favoritos' ? 'page' : undefined} aria-label={'Favoritos, ' + actions.favorites.length + (actions.favorites.length === 1 ? ' item' : ' itens')}><Icon name="heart" /><span className="tool-count">{actions.favorites.length}</span></a>
        <a href="/carrinho" aria-current={path === '/carrinho' ? 'page' : undefined} aria-label={'Seleção demonstrativa, ' + count + (count === 1 ? ' item' : ' itens')}><Icon name="bag" /><span className="tool-count">{count}</span></a>
      </div>
    </div></header>
  </>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner">
    <div><a className="wordmark" href="/" aria-label="FIO / tech, início">FIO<span>/</span><small>tech</small></a><p>Ver. Entender. Escolher.</p></div>
    <nav aria-label="Links do rodapé"><a href="/catalogo">Catálogo</a><a href="/comparar">Comparar</a><a href="/monte-seu-setup">Seu setup</a><a href="/#por-dentro">Por dentro</a></nav>
    <p className="footer-disclaimer">Projeto de portfólio. Marca, imagens, produtos, especificações e valores são demonstrativos. Não há vendas, conta ou coleta de dados pessoais.</p>
  </div></footer>
}

function Home({ actions }: { actions: Actions }) {
  return <HomeMotion>
    <section className="home-hero editorial-hero" aria-labelledby="home-title">
      <picture className="hero-backdrop">
        <source media="(max-width: 600px)" srcSet="/images/hero-full-mobile.png" />
        <img src="/images/hero-full-desktop.png" alt="Celular, notebook e fones fictícios conectados por um fio de luz azul em cenário grafite" width="1672" height="940" fetchPriority="high" />
      </picture>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">FIO / tech · uma loja para entender</p>
          <h1 id="home-title">Tecnologia<br />que faz <em>sentido.</em></h1>
          <p>Entenda os detalhes, compare critérios e escolha o que combina com a sua rotina.</p>
          <div className="hero-actions">
            <a className="button button-blue" href="/catalogo">Explorar o catálogo <Icon name="arrow" /></a>
            <a className="button button-outline" href="/monte-seu-setup">Começar pela rotina <Icon name="arrow" /></a>
          </div>
        </div>
      </div>
    </section>

    <section className="method-strip" aria-label="O jeito FIO de escolher">
      <div className="container method-grid">
        <p>O critério<br /><em>é seu.</em></p>
        <div><strong>Encontre o que importa</strong><span>Filtre o catálogo e destaque o atributo que faz diferença para você.</span></div>
        <div><strong>Compare com contexto</strong><span>Veja até três produtos sem transformar preferência em vencedor.</span></div>
      </div>
    </section>

    <section className="feature-section container" aria-labelledby="feature-title">
      <div className="section-heading">
        <div><p className="eyebrow">Uma vitrine mais clara</p><h2 id="feature-title">Produtos que convidam<br />a olhar de perto.</h2></div>
        <div className="section-heading-side"><p>Detalhes objetivos, imagens próprias e espaço para decidir no seu ritmo.</p><a className="text-link" href="/catalogo">Ver todos os produtos <Icon name="arrow" /></a></div>
      </div>
      <div className="featured-grid">{[products[0], products[3], products[6]].map((product) => <ProductCard key={product.id} product={product} actions={actions} />)}</div>
    </section>

    <ExplodedPhone />

    <section className="decision-section container" aria-labelledby="decision-title">
      <div className="decision-text"><p className="eyebrow">Sem resposta pronta</p><h2 id="decision-title">Compare aquilo que<br /><em>muda para você.</em></h2><p>Escolha um critério e veja as diferenças lado a lado. As outras informações continuam à vista para você decidir.</p><a className="button button-primary" href="/comparar">Abrir comparação <Icon name="arrow" /></a></div>
      <div className="decision-preview" aria-hidden="true"><div className="preview-head"><span>Critério</span><span>Atlas 6</span><span>Linha 14</span></div><div><span>Tela</span><strong>6,5″</strong><strong>14″</strong></div><div><span>Memória</span><strong>8 GB</strong><strong>16 GB</strong></div><div><span>Rotina</span><strong>Mobilidade</strong><strong>Produtividade</strong></div><p>O que pesa mais na sua escolha?</p></div>
    </section>

    <section className="setup-banner">
      <picture className="setup-backdrop" aria-hidden="true"><source media="(max-width: 600px)" srcSet="/images/setup-banner-mobile.png" /><img src="/images/setup-banner-desktop.png" alt="" loading="lazy" /></picture>
      <div className="container setup-inner"><div className="setup-copy"><p className="eyebrow light">Um ponto de partida</p><h2>Seu próximo setup começa<br />pela sua rotina.</h2><p>Três escolhas, uma sugestão demonstrativa e regras que você pode conferir.</p><a className="button button-blue" href="/monte-seu-setup">Montar meu setup <Icon name="arrow" /></a></div></div>
    </section>
  </HomeMotion>
}

function Catalog({ actions }: { actions: Actions }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'Todos'>('Todos')
  const [routine, setRoutine] = useState<Routine | 'Todas'>('Todas')
  const [maxPrice, setMaxPrice] = useState(8000)
  const [order, setOrder] = useState('relevancia')
  const [priority, setPriority] = useState<Priority | null>(null)
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const content = product.name + ' ' + product.category + ' ' + product.line + ' ' + product.description + ' ' + product.shortSpecs.join(' ')
      const matchSearch = normalize(content).includes(normalize(search.trim()))
      return matchSearch && (category === 'Todos' || product.category === category) && (routine === 'Todas' || product.routines.includes(routine)) && product.price <= maxPrice
    })
    if (order === 'menor') result.sort((a, b) => a.price - b.price)
    if (order === 'maior') result.sort((a, b) => b.price - a.price)
    if (order === 'nome') result.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    return result
  }, [search, category, routine, maxPrice, order])

  const clear = () => { setSearch(''); setCategory('Todos'); setRoutine('Todas'); setMaxPrice(8000); setOrder('relevancia'); setPriority(null) }

  return <div className="page-shell container catalog-page" id="conteudo">
    <div className="page-intro"><p className="eyebrow">Catálogo demonstrativo</p><h1>Encontre pelo que<br /><em>importa para você.</em></h1><p>Comece por uma categoria ou rotina. Depois destaque um critério para ler cada ficha com mais contexto.</p></div>
    <div className="catalog-toolbar">
      <div className="search-field"><Icon name="search" /><label className="sr-only" htmlFor="catalog-search">Buscar produtos</label><input id="catalog-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar produto, categoria ou recurso" type="search" /></div>
      <label className="sort-field">Ordenar por <select value={order} onChange={(event) => setOrder(event.target.value)}><option value="relevancia">Ordem do catálogo</option><option value="menor">Menor valor</option><option value="maior">Maior valor</option><option value="nome">Nome</option></select></label>
    </div>
    <div className="category-tabs" aria-label="Categorias"><button type="button" className={category === 'Todos' ? 'active' : ''} aria-pressed={category === 'Todos'} onClick={() => setCategory('Todos')}>Todos</button>{categories.map((item) => <button type="button" key={item} className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>

    <section className="priority-lens" aria-labelledby="lens-title">
      <div className="priority-lens-intro"><span>Uma lente de leitura</span><h2 id="lens-title">O que pesa na sua escolha?</h2><p>O destaque muda a leitura das fichas, sem mudar a ordem dos produtos.</p></div>
      <div className="priority-lens-controls" aria-label="Destacar critério">
        <button type="button" aria-pressed={priority === null} className={priority === null ? 'active' : ''} onClick={() => setPriority(null)}>Visão geral</button>
        {priorityOptions.map((item) => <button type="button" key={item} aria-pressed={priority === item} className={priority === item ? 'active' : ''} onClick={() => setPriority(item)}>{item}</button>)}
      </div>
      <p className="priority-lens-explainer" aria-live="polite">{priority ? priorityDescriptions[priority] : 'Escolha um critério para ver informações existentes nas fichas.'}</p>
    </section>

    <div className="catalog-layout">
      <aside className="filters" aria-label="Filtros do catálogo">
        <div className="filter-heading"><h2>Refine a lista</h2><button type="button" onClick={clear}>Limpar tudo</button></div>
        <div className="filter-group"><label htmlFor="price-filter">Valor ilustrativo até <strong>{formatPrice(maxPrice)}</strong></label><input id="price-filter" type="range" min="500" max="8000" step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="range-labels"><span>R$ 500</span><span>R$ 8.000</span></div></div>
        <div className="filter-group"><label htmlFor="routine-filter">Rotina</label><select id="routine-filter" value={routine} onChange={(event) => setRoutine(event.target.value as Routine | 'Todas')}><option value="Todas">Todas as rotinas</option><option>Estudo</option><option>Trabalho</option><option>Criação</option><option>Jogos</option></select></div>
        <p className="filter-note">Atributos, valores e usos são fictícios. Esta vitrine não representa uma loja real.</p>
      </aside>
      <div className="catalog-results">
        <div className="result-count"><strong aria-live="polite">{filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'}</strong><span>Produto demonstrativo · valor ilustrativo</span></div>
        {actions.compare.length > 0 && <div className="catalog-compare-strip"><span>{actions.compare.length} de 3 na comparação</span><a href="/comparar">Examinar lado a lado <Icon name="arrow" size={16} /></a></div>}
        {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} actions={actions} priority={priority} />)}</div> : <><EmptyState title="Nenhum produto encontrado." text="Tente outra busca ou ajuste os filtros para explorar mais opções." /><button type="button" className="empty-reset" onClick={clear}>Limpar busca e filtros</button></>}
      </div>
    </div>
  </div>
}

function ProductDetail({ product, actions }: { product: Product; actions: Actions }) {
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 2)
  const saved = actions.favorites.includes(product.id)
  const compared = actions.compare.includes(product.id)
  return <div id="conteudo"><div className="container detail-breadcrumb"><a href="/catalogo">Catálogo</a><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong></div><section className="container detail-hero"><div className="detail-image"><ProductImage product={product} /><span>PRODUTO DEMONSTRATIVO</span></div><div className="detail-copy"><p className="eyebrow">{product.category.toUpperCase()} · CONCEITO FIO</p><h1>{product.name}</h1><p className="detail-line">{product.line}</p><p>{product.description}</p><div className="detail-price"><strong>{formatPrice(product.price)}</strong><span>Valor ilustrativo</span></div><div className="detail-actions"><button className="button button-blue" type="button" onClick={() => actions.addCart(product.id)}>Adicionar à seleção <Icon name="bag" /></button><button className="button button-outline" type="button" onClick={() => actions.toggleComparison(product.id)} aria-pressed={compared}>{compared ? 'Remover da comparação' : 'Comparar'} <Icon name="compare" /></button></div><button className="save-inline" type="button" aria-pressed={saved} onClick={() => actions.toggleFavorite(product.id)}><Icon name="heart" />{saved ? 'Salvo nos favoritos' : 'Salvar nos favoritos'}</button><p className="detail-clarity">Esta é uma interface demonstrativa. Adicionar à seleção não reserva nem compra o produto.</p></div></section><section className="container specs-section" aria-labelledby="specs-title"><div><p className="eyebrow">OLHE ALÉM DA FOTO</p><h2 id="specs-title">Especificações,<br /><em>sem ruído.</em></h2><p>Valores criados para demonstrar como os critérios de escolha podem ser apresentados.</p></div><dl>{Object.entries(product.specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section>{related.length > 0 && <section className="container related-section"><div className="section-heading"><h2>Continue explorando</h2><a className="text-link" href="/catalogo">Ver todos <Icon name="arrow" /></a></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} actions={actions} />)}</div></section>}</div>
}

function Compare({ actions }: { actions: Actions }) {
  const [focus, setFocus] = useState<Priority | null>(null)
  const selected = actions.compare.map(byId).filter((item): item is Product => Boolean(item))
  if (!selected.length) return <div className="page-shell container" id="conteudo"><div className="page-intro"><p className="eyebrow">Comparar com contexto</p><h1>O que muda<br /><em>de verdade?</em></h1><p>Adicione até três itens do catálogo para colocar critérios lado a lado.</p></div><EmptyState title="Sua comparação está vazia." text="Escolha produtos no catálogo e volte para enxergar as diferenças com calma." href="/catalogo" action="Explorar produtos" /></div>

  const keys = Array.from(new Set(selected.flatMap((product) => Object.keys(product.specs))))
  const focusDescription = !focus ? 'Destaque uma família de atributos. Todas as linhas continuam disponíveis.' : keys.some((key) => isFocusedCriterion(key, focus)) ? priorityDescriptions[focus] : 'As fichas selecionadas não descrevem este critério; todas as linhas continuam disponíveis.'
  return <div className="page-shell container compare-page" id="conteudo">
    <div className="page-intro"><p className="eyebrow">Comparar com contexto</p><h1>Diferenças à vista.<br /><em>A escolha é sua.</em></h1><p>Até três produtos, sem vencedor universal. Escolha um critério para dar atenção a ele sem perder o quadro completo.</p></div>
    <div className="compare-toolbar"><span>{selected.length} de 3 produtos</span><a className="text-link" href="/catalogo">Adicionar outro item <Icon name="arrow" /></a></div>
    <section className="compare-focus" aria-labelledby="compare-focus-title">
      <div><span>Leitura guiada</span><h2 id="compare-focus-title">Qual critério olhar primeiro?</h2><p aria-live="polite">{focusDescription}</p></div>
      <div className="compare-focus-controls" aria-label="Destacar critério da tabela">
        <button type="button" aria-pressed={focus === null} className={focus === null ? 'active' : ''} onClick={() => setFocus(null)}>Todos</button>
        {priorityOptions.map((item) => <button type="button" key={item} aria-pressed={focus === item} className={focus === item ? 'active' : ''} onClick={() => setFocus(item)}>{item}</button>)}
      </div>
    </section>
    <p className="compare-scroll-hint">Deslize a tabela para ver todos os produtos <span aria-hidden="true">→</span></p>
    <div className="compare-scroll" role="region" aria-label="Tabela de comparação. Deslize para os lados no celular." tabIndex={0}>
      <table className={'compare-table compare-count-' + selected.length}>
        <caption className="sr-only">Características ilustrativas dos produtos escolhidos</caption>
        <thead><tr><th scope="col">Critério</th>{selected.map((product) => <th scope="col" key={product.id}><ProductImage product={product} /><strong>{product.name}</strong><span>{product.category}</span><small>{formatPrice(product.price)} · valor ilustrativo</small><button type="button" onClick={() => actions.toggleComparison(product.id)} aria-label={'Remover ' + product.name + ' da comparação'}><Icon name="close" size={15} /> Remover</button></th>)}</tr></thead>
        <tbody>
          <tr><th scope="row">Indicado para</th>{selected.map((product) => <td key={product.id}>{product.routines.join(', ')}</td>)}</tr>
          {keys.map((key) => <tr key={key} className={focus && isFocusedCriterion(key, focus) ? 'criterion-highlight' : ''}><th scope="row">{key}</th>{selected.map((product) => <td key={product.id}>{product.specs[key] ?? 'Não se aplica à ficha deste item'}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
    <p className="compare-footnote">Todos os dados são ilustrativos. Critérios ausentes não foram presumidos para completar a tabela.</p>
  </div>
}

const routines: Routine[] = ['Estudo', 'Trabalho', 'Criação', 'Jogos']
const priorities: Priority[] = ['Portabilidade', 'Tela', 'Autonomia', 'Som']
const budgetOptions = [{ label: 'Até R$ 2.500', value: 2500 }, { label: 'Até R$ 5.000', value: 5000 }, { label: 'Até R$ 9.000', value: 9000 }]

function Quiz({ actions }: { actions: Actions }) {
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [step, setStep] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const previousStep = useRef(step)
  useEffect(() => {
    if (previousStep.current !== step) headingRef.current?.focus()
    previousStep.current = step
  }, [step])

  const choice = step === 0 ? answers.routine : step === 1 ? answers.priority : answers.budget
  const suggestion = step === 3 && answers.routine && answers.priority && answers.budget ? recommend(answers as Answers) : null
  const headings = ['Qual é sua rotina?', 'O que pesa mais?', 'Qual faixa faz sentido?']
  const help = ['Pense no uso principal do seu próximo aparelho.', 'Escolha um critério para orientar a sugestão.', 'Usamos apenas produtos demonstrativos dentro desta faixa.']

  return <div className="page-shell container quiz-page" id="conteudo">
    <div className="page-intro quiz-intro"><p className="eyebrow">Monte seu setup</p><h1>Comece pelo seu jeito<br /><em>de usar tecnologia.</em></h1><p>Três escolhas curtas. O resultado mostra as regras usadas, sem IA ou recomendação pessoal.</p></div>
    <div className="quiz-layout">
      <div className="quiz-main">
        <div className="quiz-progress"><span>{step === 3 ? 'Resultado' : 'Etapa ' + (step + 1) + ' de 3'}</span><progress value={step === 3 ? 3 : step + 1} max={3} aria-label="Progresso do questionário" /></div>
        {step < 3 ? <form className="quiz-form" onSubmit={(event) => { event.preventDefault(); if (!choice) return; setStep((current) => current + 1) }}>
          <h2 ref={headingRef} tabIndex={-1}>{headings[step]}</h2><p className="quiz-step-help">{help[step]}</p>
          {step === 0 && <fieldset aria-label="Rotina principal"><div className="choice-grid">{routines.map((item) => <label className={answers.routine === item ? 'choice active' : 'choice'} key={item}><input type="radio" name="routine" value={item} checked={answers.routine === item} onChange={() => setAnswers((current) => ({ ...current, routine: item }))} /><span>{item}</span></label>)}</div></fieldset>}
          {step === 1 && <fieldset aria-label="Prioridade principal"><div className="choice-grid">{priorities.map((item) => <label className={answers.priority === item ? 'choice active' : 'choice'} key={item}><input type="radio" name="priority" value={item} checked={answers.priority === item} onChange={() => setAnswers((current) => ({ ...current, priority: item }))} /><span>{item}</span></label>)}</div></fieldset>}
          {step === 2 && <fieldset aria-label="Faixa de investimento"><div className="choice-grid budget-choices">{budgetOptions.map((item) => <label className={answers.budget === item.value ? 'choice active' : 'choice'} key={item.value}><input type="radio" name="budget" value={item.value} checked={answers.budget === item.value} onChange={() => setAnswers((current) => ({ ...current, budget: item.value }))} /><span>{item.label}</span></label>)}</div></fieldset>}
          <div className="quiz-navigation">{step > 0 && <button className="button button-outline" type="button" onClick={() => setStep((current) => current - 1)}>Voltar</button>}<button className="button button-blue" type="submit" disabled={!choice}>{step === 2 ? 'Ver sugestão' : 'Continuar'} <Icon name="arrow" /></button></div>
        </form> : <section className="quiz-result" aria-live="polite">
          <p className="eyebrow">Sugestão demonstrativa</p>
          <h2 ref={headingRef} tabIndex={-1}>{suggestion ? 'Um ponto de partida.' : 'Ainda não há opção nesta faixa.'}</h2>
          <p className="quiz-answers">Sua escolha: {answers.routine} · {answers.priority} · até {formatPrice(answers.budget!)}</p>
          {suggestion ? <>
            <p className="result-total">Total ilustrativo <strong>{formatPrice(suggestion.total)}</strong></p>
            <div className="result-products">{suggestion.items.map((product) => <div className="result-product" key={product.id}><ProductImage product={product} /><div><span>{product.role === 'principal' ? 'Item principal' : 'Complemento'}</span><h3>{product.name}</h3><p>{product.line}</p><a href={'/produto/' + product.id}>Ver detalhes <Icon name="arrow" size={16} /></a></div><button type="button" onClick={() => actions.addCart(product.id)}>Adicionar à seleção</button></div>)}</div>
            <div className="result-reasons"><h3>Por que estes itens?</h3><ul>{suggestion.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></div>
          </> : <p>O catálogo demonstrativo não tem item principal dentro desse limite. Você pode rever a faixa ou explorar todos os produtos.</p>}
          <div className="quiz-navigation"><button className="button button-outline" type="button" onClick={() => setStep(0)}>Rever respostas</button>{!suggestion && <a className="button button-primary" href="/catalogo">Explorar catálogo <Icon name="arrow" /></a>}</div>
        </section>}
      </div>
      <aside className="quiz-side"><span>Como funciona</span><h2>Uma regra clara.<br />Uma escolha sua.</h2><p>Produtos ligados à rotina recebem 3 pontos. A prioridade soma mais 2 pontos. Itens principais recebem 1 ponto.</p><p>Em empate, aparece primeiro o menor valor ilustrativo. A sugestão só usa itens dentro da faixa escolhida.</p></aside>
    </div>
  </div>
}

function Favorites({ actions }: { actions: Actions }) {
  const saved = actions.favorites.map(byId).filter((item): item is Product => Boolean(item))
  return <div className="page-shell container" id="conteudo"><div className="page-intro"><p className="eyebrow">SUA LISTA</p><h1>Favoritos para rever.</h1><p>Itens guardados apenas neste navegador para facilitar a comparação depois.</p></div>{saved.length ? <div className="product-grid saved-grid">{saved.map((item) => <ProductCard key={item.id} product={item} actions={actions} />)}</div> : <EmptyState title="Nenhum favorito ainda." text="Salve produtos do catálogo para voltar a eles quando quiser." href="/catalogo" />}</div>
}

function Cart({ actions }: { actions: Actions }) {
  const items = Object.entries(actions.cart).map(([id, quantity]) => ({ product: byId(id), quantity })).filter((entry): entry is { product: Product; quantity: number } => Boolean(entry.product) && entry.quantity > 0)
  const total = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return <div className="page-shell container" id="conteudo"><div className="page-intro"><p className="eyebrow">SELEÇÃO DEMONSTRATIVA</p><h1>Sua seleção, com tudo claro.</h1><p>Adicione, ajuste e remova itens para experimentar a interface. Nenhuma compra é realizada.</p></div>{items.length ? <div className="cart-layout"><div className="cart-list">{items.map(({ product, quantity }) => <article className="cart-item" key={product.id}><a className="cart-image" href={`/produto/${product.id}`}><ProductImage product={product} /></a><div className="cart-item-main"><span>{product.category} · produto demonstrativo</span><h2><a href={`/produto/${product.id}`}>{product.name}</a></h2><p>{product.line}</p><button className="remove-link" type="button" onClick={() => actions.removeCart(product.id)}>Remover item</button></div><div className="cart-item-end"><strong>{formatPrice(product.price * quantity)}</strong><small>Valor ilustrativo</small><div className="quantity-control" aria-label={`Quantidade de ${product.name}`}><button type="button" aria-label={`Diminuir quantidade de ${product.name}`} onClick={() => actions.changeQuantity(product.id, -1)} disabled={quantity <= 1}><Icon name="minus" size={16} /></button><output aria-label={`${quantity} ${quantity === 1 ? 'unidade' : 'unidades'}`}>{quantity}</output><button type="button" aria-label={`Aumentar quantidade de ${product.name}`} onClick={() => actions.changeQuantity(product.id, 1)}><Icon name="plus" size={16} /></button></div></div></article>)}</div><aside className="cart-summary"><span>RESUMO ILUSTRATIVO</span><div><span>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span><strong>{formatPrice(total)}</strong></div><p>Valores fictícios. Não calculamos entrega, disponibilidade ou pagamento.</p><div className="demo-stop">Demonstração termina aqui. Não há checkout.</div><a className="text-link" href="/catalogo">Continuar explorando <Icon name="arrow" /></a></aside></div> : <EmptyState title="Sua seleção está vazia." text="Inclua produtos para testar quantidades e remoção, sem finalizar uma compra." href="/catalogo" />}</div>
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Falha na interface demonstrativa', error, info) }
  render() {
    if (this.state.hasError) return <main className="container page-shell" id="conteudo"><EmptyState title="Algo não saiu como esperado." text="A interface encontrou um erro. Recarregue a página para tentar novamente." /><button className="button button-primary" type="button" onClick={() => location.reload()}>Recarregar página</button></main>
    return this.props.children
  }
}

function AppContent() {
  const [favorites, setFavorites] = useState<string[]>(() => readStored('fio-tech-favorites', []))
  const [compare, setCompare] = useState<string[]>(() => readStored('fio-tech-compare', []))
  const [cart, setCart] = useState<Record<string, number>>(() => readStored('fio-tech-cart', {}))
  const [notice, setNotice] = useState('')
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('fio-tech-favorites', JSON.stringify(favorites))
      localStorage.setItem('fio-tech-compare', JSON.stringify(compare))
      localStorage.setItem('fio-tech-cart', JSON.stringify(cart))
    } catch {
      window.setTimeout(() => setStorageError(true), 0)
    }
  }, [favorites, compare, cart])

  useEffect(() => {
    if (location.hash) window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 100)
  }, [])

  const actions: Actions = {
    favorites, compare, cart,
    toggleFavorite: (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    toggleComparison: (id) => { const result = toggleCompare(compare, id); setCompare(result.ids); if (result.error) setNotice(result.error) },
    addCart: (id) => { setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 })); setNotice('Item adicionado à seleção demonstrativa.') },
    changeQuantity: (id, amount) => setCart((current) => ({ ...current, [id]: Math.max(1, (current[id] ?? 1) + amount) })),
    removeCart: (id) => setCart((current) => { const next = { ...current }; delete next[id]; return next }),
  }

  const path = decodeURI(location.pathname).replace(/\/$/, '') || '/'
  let page: ReactNode
  if (path === '/') page = <Home actions={actions} />
  else if (path === '/catalogo') page = <Catalog actions={actions} />
  else if (path === '/comparar') page = <Compare actions={actions} />
  else if (path === '/monte-seu-setup') page = <Quiz actions={actions} />
  else if (path === '/favoritos') page = <Favorites actions={actions} />
  else if (path === '/carrinho') page = <Cart actions={actions} />
  else if (path.startsWith('/produto/')) {
    const product = byId(path.split('/')[2])
    page = product ? <ProductDetail product={product} actions={actions} /> : <div className="page-shell container" id="conteudo"><EmptyState title="Produto não encontrado." text="Este item não faz parte do catálogo demonstrativo." href="/catalogo" /></div>
  } else page = <div className="page-shell container" id="conteudo"><EmptyState title="Página não encontrada." text="O endereço não corresponde a uma página desta demonstração." href="/" action="Voltar ao início" /></div>

  return <><Header actions={actions} />{storageError && <div className="system-message" role="alert">Não foi possível guardar alterações neste navegador. A demonstração continua disponível.</div>}{notice && <div className="toast" role="status"><span>{notice}</span><button type="button" aria-label="Fechar aviso" onClick={() => setNotice('')}><Icon name="close" size={16} /></button></div>}<main id={path === '/' ? 'conteudo' : undefined}>{page}</main><Footer /></>
}

export default function App() { return <ErrorBoundary><AppContent /></ErrorBoundary> }
