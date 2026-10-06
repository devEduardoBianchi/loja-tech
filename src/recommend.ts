import { products, type Priority, type Product, type Routine } from './products'

export type Answers = { routine: Routine; priority: Priority; budget: number }
export type Suggestion = { items: Product[]; score: number; reasons: string[]; total: number }

export function scoreProduct(product: Product, answers: Answers): number {
  return (product.routines.includes(answers.routine) ? 3 : 0)
    + (product.priorities.includes(answers.priority) ? 2 : 0)
    + (product.role === 'principal' ? 1 : 0)
}

export function recommend(answers: Answers): Suggestion | null {
  const eligible = products.filter((product) => product.role === 'principal' && product.price <= answers.budget)
  if (eligible.length === 0) return null

  const ranked = [...eligible].sort((a, b) => scoreProduct(b, answers) - scoreProduct(a, answers) || a.price - b.price)
  const primary = ranked[0]
  const remaining = answers.budget - primary.price
  const accessories = products
    .filter((product) => product.role === 'complemento' && product.price <= remaining)
    .sort((a, b) => scoreProduct(b, answers) - scoreProduct(a, answers) || a.price - b.price)
  const items = accessories.length && scoreProduct(accessories[0], answers) >= 2 ? [primary, accessories[0]] : [primary]
  const reasons = [
    primary.routines.includes(answers.routine)
      ? `${primary.name} está associado à rotina “${answers.routine.toLowerCase()}” no catálogo fictício: 3 pontos.`
      : `${primary.name} não está associado à rotina escolhida; outras regras definiram a sugestão.`,
    primary.priorities.includes(answers.priority)
      ? `${primary.name} atende à prioridade “${answers.priority.toLowerCase()}” no catálogo fictício: 2 pontos.`
      : `${primary.name} não recebeu pontos pela prioridade escolhida.`,
    'O papel de item principal soma 1 ponto. Em empate, o menor valor ilustrativo vem primeiro.',
    items.length > 1
      ? `${items[1].name} entra como complemento porque cabe na faixa e atende a pelo menos um critério da regra.`
      : 'Nenhum complemento foi incluído pela combinação de faixa e critérios.',
  ]
  return { items, score: scoreProduct(primary, answers), reasons, total: items.reduce((sum, item) => sum + item.price, 0) }
}

export function toggleCompare(ids: string[], id: string): { ids: string[]; error?: string } {
  if (ids.includes(id)) return { ids: ids.filter((current) => current !== id) }
  if (ids.length >= 3) return { ids, error: 'A comparação aceita até três produtos. Remova um item antes de adicionar outro.' }
  return { ids: [...ids, id] }
}
