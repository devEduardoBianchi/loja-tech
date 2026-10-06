import type { Priority, Product } from './products'

export const priorityOptions: Priority[] = ['Portabilidade', 'Tela', 'Autonomia', 'Som']

export const priorityDescriptions: Record<Priority, string> = {
  Portabilidade: 'Observe peso e formato quando esses dados estiverem disponíveis.',
  Tela: 'Compare tamanho e resolução da tela quando fizerem parte da ficha.',
  Autonomia: 'Veja bateria ou autonomia declarada como exemplo no catálogo.',
  Som: 'Examine formato e conexão dos itens de áudio demonstrativos.',
}

const keysByPriority: Record<Priority, string[]> = {
  Portabilidade: ['Peso', 'Formato'],
  Tela: ['Tela', 'Resolução'],
  Autonomia: ['Bateria', 'Autonomia'],
  Som: ['Formato', 'Conexão'],
}

export function focusedSpec(product: Product, priority: Priority): { label: string; value: string } | null {
  if (priority === 'Som' && product.category !== 'Áudio') return null
  for (const label of keysByPriority[priority]) {
    const value = product.specs[label]
    if (value) return { label, value }
  }
  return null
}

export function isFocusedCriterion(criterion: string, priority: Priority): boolean {
  return keysByPriority[priority].includes(criterion)
}
