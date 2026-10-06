export type Category = 'Celulares' | 'Notebooks' | 'Áudio' | 'Monitores' | 'Acessórios'
export type Routine = 'Estudo' | 'Trabalho' | 'Criação' | 'Jogos'
export type Priority = 'Portabilidade' | 'Tela' | 'Autonomia' | 'Som'

export type Product = {
  id: string
  name: string
  category: Category
  price: number
  image: string
  imageAlt: string
  line: string
  description: string
  shortSpecs: string[]
  specs: Record<string, string>
  routines: Routine[]
  priorities: Priority[]
  role: 'principal' | 'complemento'
}

export const categories: Category[] = ['Celulares', 'Notebooks', 'Áudio', 'Monitores', 'Acessórios']

export const products: Product[] = [
  {
    id: 'atlas-6', name: 'Atlas 6', category: 'Celulares', price: 2890,
    image: '/images/phone.png', imageAlt: 'Dois celulares fictícios Atlas 6 em grafite, vistos de frente e de trás',
    line: 'Equilíbrio para o dia todo', description: 'Uma tela ampla e recursos equilibrados para comunicação, estudo e tarefas cotidianas.',
    shortSpecs: ['Tela 6,5″', '8 GB de memória', 'Bateria 4.800 mAh'],
    specs: { 'Tela': '6,5″ · OLED', 'Memória': '8 GB', 'Armazenamento': '256 GB', 'Câmeras': 'Conjunto ilustrativo de 3 lentes', 'Bateria': '4.800 mAh', 'Peso': '189 g' },
    routines: ['Estudo', 'Trabalho'], priorities: ['Portabilidade', 'Autonomia'], role: 'principal',
  },
  {
    id: 'atlas-compact', name: 'Atlas Compact', category: 'Celulares', price: 1990,
    image: '/images/phone-compact.png', imageAlt: 'Celular fictício Atlas Compact em grafite, visto de frente e de trás',
    line: 'Essencial e fácil de levar', description: 'Formato compacto para quem prioriza leveza e as tarefas essenciais.',
    shortSpecs: ['Tela 6,1″', '6 GB de memória', 'Bateria 4.200 mAh'],
    specs: { 'Tela': '6,1″ · OLED', 'Memória': '6 GB', 'Armazenamento': '128 GB', 'Câmeras': 'Conjunto ilustrativo de 2 lentes', 'Bateria': '4.200 mAh', 'Peso': '168 g' },
    routines: ['Estudo', 'Trabalho'], priorities: ['Portabilidade'], role: 'principal',
  },
  {
    id: 'atlas-max', name: 'Atlas Max', category: 'Celulares', price: 4590,
    image: '/images/phone-max.png', imageAlt: 'Celular fictício Atlas Max em grafite, visto de frente e de trás',
    line: 'Mais espaço para criar', description: 'Tela maior, memória ampliada e foco em criação móvel.',
    shortSpecs: ['Tela 6,8″', '12 GB de memória', 'Bateria 5.200 mAh'],
    specs: { 'Tela': '6,8″ · OLED', 'Memória': '12 GB', 'Armazenamento': '512 GB', 'Câmeras': 'Conjunto ilustrativo de 3 lentes', 'Bateria': '5.200 mAh', 'Peso': '214 g' },
    routines: ['Criação', 'Trabalho'], priorities: ['Tela', 'Autonomia'], role: 'principal',
  },
  {
    id: 'linha-14', name: 'Linha 14', category: 'Notebooks', price: 4890,
    image: '/images/laptop.png', imageAlt: 'Notebook fictício Linha 14 aberto sobre mesa de pedra',
    line: 'Trabalhe de onde fizer sentido', description: 'Portabilidade e espaço de trabalho para produtividade e projetos criativos leves.',
    shortSpecs: ['Tela 14″', '16 GB de memória', 'SSD 512 GB'],
    specs: { 'Tela': '14″ · 2.560 × 1.600', 'Memória': '16 GB', 'Armazenamento': 'SSD 512 GB', 'Processador': 'Série N · exemplo', 'Bateria': 'Até 11 h · valor ilustrativo', 'Peso': '1,35 kg' },
    routines: ['Estudo', 'Trabalho', 'Criação'], priorities: ['Portabilidade', 'Autonomia'], role: 'principal',
  },
  {
    id: 'linha-air', name: 'Linha Air 13', category: 'Notebooks', price: 3790,
    image: '/images/laptop-air.png', imageAlt: 'Notebook fictício Linha Air 13 aberto sobre mesa clara',
    line: 'Leveza para a rotina', description: 'Um notebook compacto para textos, reuniões e pesquisa.',
    shortSpecs: ['Tela 13,3″', '8 GB de memória', 'SSD 256 GB'],
    specs: { 'Tela': '13,3″ · 1.920 × 1.200', 'Memória': '8 GB', 'Armazenamento': 'SSD 256 GB', 'Processador': 'Série L · exemplo', 'Bateria': 'Até 12 h · valor ilustrativo', 'Peso': '1,12 kg' },
    routines: ['Estudo', 'Trabalho'], priorities: ['Portabilidade', 'Autonomia'], role: 'principal',
  },
  {
    id: 'linha-studio', name: 'Linha Studio 16', category: 'Notebooks', price: 7990,
    image: '/images/laptop-studio.png', imageAlt: 'Notebook fictício Linha Studio 16 aberto sobre mesa clara',
    line: 'Mais área para fazer', description: 'Tela ampla e memória para fluxos criativos e jogos demonstrativos.',
    shortSpecs: ['Tela 16″', '32 GB de memória', 'SSD 1 TB'],
    specs: { 'Tela': '16″ · 2.560 × 1.600', 'Memória': '32 GB', 'Armazenamento': 'SSD 1 TB', 'Processador': 'Série X · exemplo', 'Gráficos': 'Módulo dedicado · exemplo', 'Peso': '2,1 kg' },
    routines: ['Criação', 'Jogos'], priorities: ['Tela'], role: 'principal',
  },
  {
    id: 'fone-modular', name: 'Fone Modular', category: 'Áudio', price: 790,
    image: '/images/headphones.png', imageAlt: 'Fone fictício preto com conchas acolchoadas sobre mesa de pedra',
    line: 'Som com espaço para respirar', description: 'Conchas confortáveis para ouvir e se concentrar por períodos longos.',
    shortSpecs: ['Conchas acolchoadas', 'Conexão sem fio', 'Até 40 h'],
    specs: { 'Formato': 'Sobre a orelha', 'Conexão': 'Sem fio · exemplo', 'Autonomia': 'Até 40 h · valor ilustrativo', 'Peso': '245 g', 'Acabamento': 'Grafite fosco' },
    routines: ['Estudo', 'Trabalho', 'Criação', 'Jogos'], priorities: ['Som', 'Autonomia'], role: 'complemento',
  },
  {
    id: 'fone-leve', name: 'Fone Leve', category: 'Áudio', price: 490,
    image: '/images/headphones-light.png', imageAlt: 'Fone fictício Fone Leve dobrado sobre superfície de pedra clara',
    line: 'Para levar o som junto', description: 'Uma opção mais leve para música, chamadas e deslocamentos.',
    shortSpecs: ['Design dobrável', 'Conexão sem fio', 'Até 28 h'],
    specs: { 'Formato': 'Sobre a orelha', 'Conexão': 'Sem fio · exemplo', 'Autonomia': 'Até 28 h · valor ilustrativo', 'Peso': '210 g', 'Acabamento': 'Grafite fosco' },
    routines: ['Estudo', 'Trabalho'], priorities: ['Som', 'Portabilidade'], role: 'complemento',
  },
  {
    id: 'tela-27', name: 'Tela 27', category: 'Monitores', price: 1590,
    image: '/images/monitor.png', imageAlt: 'Monitor fictício Tela 27 sobre mesa de pedra',
    line: 'Mais espaço, mais clareza', description: 'Área ampla para organizar janelas, referências e ferramentas.',
    shortSpecs: ['27″', '2.560 × 1.440', 'Base ajustável'],
    specs: { 'Tela': '27″ · IPS', 'Resolução': '2.560 × 1.440', 'Taxa': '75 Hz · exemplo', 'Ajuste': 'Inclinação e altura', 'Acabamento': 'Grafite fosco' },
    routines: ['Trabalho', 'Criação', 'Jogos'], priorities: ['Tela'], role: 'complemento',
  },
  {
    id: 'tela-32', name: 'Tela 32', category: 'Monitores', price: 2490,
    image: '/images/monitor-32.png', imageAlt: 'Monitor fictício Tela 32 sobre mesa clara',
    line: 'Uma mesa mais ampla', description: 'Mais área de visualização para edição, trabalho e entretenimento.',
    shortSpecs: ['32″', '3.840 × 2.160', 'Base ajustável'],
    specs: { 'Tela': '32″ · IPS', 'Resolução': '3.840 × 2.160', 'Taxa': '60 Hz · exemplo', 'Ajuste': 'Inclinação e altura', 'Acabamento': 'Grafite fosco' },
    routines: ['Criação', 'Jogos'], priorities: ['Tela'], role: 'complemento',
  },
  {
    id: 'teclado-68', name: 'Teclado 68', category: 'Acessórios', price: 590,
    image: '/images/keyboard.png', imageAlt: 'Teclado compacto fictício preto e mouse sobre mesa de pedra',
    line: 'Mais mesa para suas ideias', description: 'Formato compacto para liberar espaço sem abrir mão das teclas principais.',
    shortSpecs: ['Formato 68 teclas', 'Perfil compacto', 'Acabamento grafite'],
    specs: { 'Formato': '68 teclas', 'Conexão': 'Com fio · exemplo', 'Acabamento': 'Grafite fosco', 'Peso': '620 g' },
    routines: ['Estudo', 'Trabalho', 'Criação', 'Jogos'], priorities: ['Portabilidade'], role: 'complemento',
  },
]

export const byId = (id: string) => products.find((product) => product.id === id)
export const formatPrice = (price: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price)
