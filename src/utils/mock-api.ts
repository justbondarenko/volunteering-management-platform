export async function fetchMockData<T>(file: string, delay = 300): Promise<T> {
  // Support client and server: use import.meta.glob to statically map JSON files.
  // Keys are full virtual paths like '/src/data/foo.json' or resolved alias
  const modules = import.meta.glob('~/data/*.json', { eager: true }) as Record<string, any>;
  // Try to find by filename ending to be resilient to path alias resolution
  const entry = Object.entries(modules).find(([key]) => key.endsWith(`/data/${file}`));
  if (!entry) {
    throw new Error(`Mock data file not found: ${file}`);
  }
  const mod = entry[1];
  const payload = (mod?.default ?? mod) as T;
  return new Promise((resolve) => setTimeout(() => resolve(payload), delay));
}

export function simulateMutation<T>(result: T, delay = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay));
}

