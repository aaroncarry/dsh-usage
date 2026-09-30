/** Workspace attribution for session working directories. */
/**
 * Build a matcher resolving a directory to the registered Workspace containing it.
 * The deepest containing Workspace wins, so nested Workspaces stay distinct.
 * @param workspaces - registered Workspace ids and root paths.
 * @returns lookup from a session's working directory to a Workspace id.
 */
export declare function createWorkspaceMatcher(workspaces: readonly {
    readonly id: string;
    readonly path: string;
}[]): (cwd: string) => string | undefined;
/** Attach a project id only when known, keeping optional fields absent rather than undefined. */
export declare function withProject<T extends object>(value: T, projectId: string | undefined): T & {
    projectId?: string;
};
//# sourceMappingURL=project.d.ts.map