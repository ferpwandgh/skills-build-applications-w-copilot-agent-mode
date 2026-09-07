const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function findCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const value of [payload.results, payload.data, payload.items]) {
    const collection = findCollection(value)
    if (collection.length > 0 || Array.isArray(value)) return collection
  }

  return []
}

export async function fetchCollection(resource, options = {}) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`, options)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  return findCollection(await response.json())
}

export function getDisplayName(user) {
  return user.name || [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'Athlete'
}
