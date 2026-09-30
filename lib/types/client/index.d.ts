/** Desktop sidebar entry and main page for token usage. */
import type { Context } from '@deepseek-ai/cordis';
import { type UsageLocaleKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** Usage dashboard copy. */
        'usageStatistics': UsageLocaleKey;
    }
}
/** Service required to mount this plugin's own Remote contribution. */
export declare const inject: string[];
/**
 * Mount this bundle's Host Remote and browser UI as one reversible plugin.
 * @param ctx - browser services.
 * @returns disposer for the dashboard and its Remote namespace.
 */
export declare function apply(ctx: Context): Promise<() => Promise<void>>;
//# sourceMappingURL=index.d.ts.map