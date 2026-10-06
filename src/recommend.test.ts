import { describe, expect, it } from 'vitest'
import { recommend, toggleCompare } from './recommend'

describe('regras da sugestão', () => {
  it('respeita a faixa de investimento no conjunto inteiro', () => {
    const suggestion = recommend({ routine: 'Estudo', priority: 'Portabilidade', budget: 2500 })
    expect(suggestion).not.toBeNull()
    expect(suggestion!.total).toBeLessThanOrEqual(2500)
    expect(suggestion!.items[0].role).toBe('principal')
  })

  it('explica quando não há produto principal na faixa', () => {
    expect(recommend({ routine: 'Criação', priority: 'Tela', budget: 1000 })).toBeNull()
  })
})

describe('comparação', () => {
  it('limita a três e permite remover por seleção', () => {
    expect(toggleCompare(['a', 'b', 'c'], 'd')).toEqual({
      ids: ['a', 'b', 'c'], error: expect.stringContaining('até três produtos'),
    })
    expect(toggleCompare(['a', 'b'], 'b')).toEqual({ ids: ['a'] })
  })
})
