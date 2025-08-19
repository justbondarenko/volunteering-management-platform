import { defineConfig } from 'vite'
import { createHash } from 'crypto'

// Add polyfill for crypto.hash
if (!globalThis.crypto.hash) {
  globalThis.crypto = {
    ...globalThis.crypto,
    hash: (algorithm) => createHash(algorithm)
  }
}

export default defineConfig({
  // Your Vite configuration options here
})
