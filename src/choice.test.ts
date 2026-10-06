import { describe, expect, it } from 'vitest'
import { focusedSpec, isFocusedCriterion } from './choice'
import { byId } from './products'

describe('lente de critérios', () => {
  it('destaca somente especificações existentes do produto', () => {
    expect(focusedSpec(byId('atlas-6')!, 'Tela')).toEqual({ label: 'Tela', value: '6,5″ · OLED' })
    expect(focusedSpec(byId('atlas-6')!, 'Som')).toBeNull()
    expect(focusedSpec(byId('fone-modular')!, 'Som')).toEqual({ label: 'Formato', value: 'Sobre a orelha' })
  })

  it('identifica linhas relevantes sem ocultar as demais', () => {
    expect(isFocusedCriterion('Bateria', 'Autonomia')).toBe(true)
    expect(isFocusedCriterion('Peso', 'Autonomia')).toBe(false)
  })
})
