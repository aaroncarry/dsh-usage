import type { HostObservable, InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { UsageProgress, UsageSnapshot } from 'dsh-usage/types';
/** Dashboard observation shared with the page while it is mounted. */
export interface UsagePageState {
    readonly snapshot?: UsageSnapshot;
    readonly error: boolean;
    readonly refreshing: boolean;
}
/** Transient progress of the current observation; never persisted. */
export interface UsagePageProgress {
    readonly progress?: UsageProgress;
}
/** Operations and observable data supplied by the browser plugin. */
export interface UsagePageInjected {
    readonly hooks: {
        readonly usage: HostObservable<UsagePageState>;
        readonly progress: HostObservable<UsagePageProgress>;
    };
    readonly activate: () => () => void;
    readonly retry: () => void;
    readonly rebuild: () => void;
    readonly openSession: (id: SessionId) => void;
    /** Active UI language id, read on every render so a language switch reformats dates. */
    readonly locale: () => string;
}
type Props = PropsRuntime<'main'> & PropsLocale<'usageStatistics'> & InjectFace<UsagePageInjected>;
/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export declare function UsagePage({ useUsage, useProgress, activate, retry, rebuild, openSession, locale, t }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=UsagePage.d.ts.map