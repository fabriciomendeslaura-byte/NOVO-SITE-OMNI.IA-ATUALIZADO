// @ts-check
import { defineConfig } from 'astro/config'

/**
 * Site 100% estático: o build gera HTML puro em /dist, sem servidor rodando.
 * Mesma arquitetura do site da Careca Chaves — rápido, barato de hospedar
 * e sem superfície de ataque de back-end.
 */
export default defineConfig({
  site: 'https://www.omniiabr.tech',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  image: { layout: 'constrained' },
})
