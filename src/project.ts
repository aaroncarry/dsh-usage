/** Workspace attribution for session working directories. */

/** Platforms whose default file systems compare paths case-insensitively. */
const CASE_INSENSITIVE = process.platform === 'win32' || process.platform === 'darwin'

/** Normalize separators, trailing slashes, and (on case-insensitive platforms) letter case. */
function normalizePath(path: string): string {
  const unified = path.replace(/\\/g, '/').replace(/\/+$/, '')
  return CASE_INSENSITIVE ? unified.toLowerCase() : unified
}

/**
 * Build a matcher resolving a directory to the registered Workspace containing it.
 * The deepest containing Workspace wins, so nested Workspaces stay distinct.
 * @param workspaces - registered Workspace ids and root paths.
 * @returns lookup from a session's working directory to a Workspace id.
 */
export function createWorkspaceMatcher(
  workspaces: readonly { readonly id: string; readonly path: string }[],
): (cwd: string) => string | undefined {
  const roots = workspaces
    .map(({ id, path }) => ({ id, root: normalizePath(path) }))
    .filter(({ root }) => root.length > 0)
    .sort((a, b) => b.root.length - a.root.length)
  return (cwd) => {
    const path = normalizePath(cwd)
    return roots.find(({ root }) => path === root || path.startsWith(`${root}/`))?.id
  }
}

/** Attach a project id only when known, keeping optional fields absent rather than undefined. */
export function withProject<T extends object>(value: T, projectId: string | undefined): T & { projectId?: string } {
  return projectId === undefined ? value : { ...value, projectId }
}
