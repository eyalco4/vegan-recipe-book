import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

mkdirSync('public', { recursive: true })

const svg = (padding) => `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="${padding > 0 ? 96 : 0}" fill="#4a7c59"/>
  <text x="256" y="${300 + padding * 0.3}" font-size="${260 - padding}" text-anchor="middle" font-family="sans-serif">🌱</text>
</svg>
`

await sharp(Buffer.from(svg(0))).resize(192, 192).png().toFile('public/pwa-192x192.png')
await sharp(Buffer.from(svg(0))).resize(512, 512).png().toFile('public/pwa-512x512.png')
await sharp(Buffer.from(svg(64))).resize(512, 512).png().toFile('public/pwa-maskable-512x512.png')

console.log('Icons generated in public/')
