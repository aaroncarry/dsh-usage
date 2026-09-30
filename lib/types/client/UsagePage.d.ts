import type { HostObservable, InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { UsageProgress, UsageSnapshot } from '@deepseek-ai/dsh-client-ui-usage/types';
/** Dashboard observation shared with the page while it is mounted. */
export interface UsagePageState {
    readonly snapshot?: UsageSnapshot;
    readonly error: boolean;
    readonly refreshing: boolean;
    readonly progress?: UsageProgress;
}
/** Operations and observable data supplied by the browser plugin. */
export interface UsagePageInjected {
    readonly hooks: {
        readonly usage: HostObservable<UsagePageState>;
    };
    readonly activate: () => () => void;
    readonly retry: () => void;
    readonly rebuild: () => void;
    readonly openSession: (id: SessionId) => void;
}
type Props = PropsRuntime<'main'> & PropsLocale<'usageStatistics'> & InjectFace<UsagePageInjected>;
/** Render token activity, trends, breakdowns, and session navigation. @param props - localized page services. @returns dashboard. */
export declare function UsagePage({ useUsage, activate, retry, rebuild, openSession, t }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=UsagePage.d.ts.map