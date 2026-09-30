import usageRemote from '@deepseek-ai/dsh-client-ui-usage/remote';
import { createSnapshotStore } from '@deepseek-ai/dsh-client-store';
import { UsagePage } from "./UsagePage.js";
import { UsageIcon } from "./UsageIcon.js";
import { en, zh } from "./locales.js";
const PANEL_ID = 'usage-statistics';
/** Service required to mount this plugin's own Remote contribution. */
export const inject = ['remote'];
/** Register the usage dashboard and its navigation icon. @param ctx - browser services. */
function registerUi(ctx) {
    ctx.effect(() => ctx.locale.register('usageStatistics', { zh, en }), 'ui-usage: dictionaries');
    const t = ctx.locale.bind('usageStatistics');
    const usage = createSnapshotStore({ error: false, refreshing: false }, { persist: { name: 'dsh.usage-statistics.snapshot.v2' } });
    let disposeActive;
    let refreshActive;
    const activate = () => {
        disposeActive?.();
        let disposed = false;
        let busy = false;
        let rerun = false;
        let nextForce = false;
        const refresh = async (force = false) => {
            if (busy) {
                rerun = true;
                nextForce ||= force;
                return;
            }
            busy = true;
            usage.set({ ...usage.getSnapshot(), refreshing: true, error: false, progress: { completed: 0, total: 0, running: true } });
            do {
                rerun = false;
                const runForce = force || nextForce;
                force = false;
                nextForce = false;
                const timer = setInterval(() => {
                    void ctx.remote.usageStatistics.progress().then(result => {
                        if (result.ok && !disposed)
                            usage.set({ ...usage.getSnapshot(), progress: result.value });
                    }).catch((_progressFailure) => { });
                }, 500);
                try {
                    const result = await ctx.remote.usageStatistics.snapshot(runForce);
                    if (!result.ok)
                        throw new Error(result.error.message);
                    if (!disposed)
                        usage.set({ snapshot: result.value, error: false, refreshing: rerun,
                            progress: { completed: result.value.sessions.length + result.value.unreadableSessions,
                                total: result.value.sessions.length + result.value.unreadableSessions, running: rerun } });
                }
                catch (_loadFailure) {
                    if (!disposed)
                        usage.set({ ...usage.getSnapshot(), error: true, refreshing: rerun, progress: { completed: 0, total: 0, running: false } });
                }
                finally {
                    clearInterval(timer);
                }
            } while (rerun && !disposed);
            busy = false;
        };
        refreshActive = (force) => { void refresh(force); };
        const disposeStatus = ctx.remote.$on('api-session/status', (_id, running) => {
            if (!running)
                void refresh();
        });
        const disposeAdded = ctx.remote.$on('api-session/added', () => { void refresh(); });
        const disposeRemoved = ctx.remote.$on('api-session/removed', () => { void refresh(); });
        const disposeReset = ctx.on('connection/reset', () => { void refresh(); });
        void refresh();
        const dispose = () => {
            disposed = true;
            disposeStatus();
            disposeAdded();
            disposeRemoved();
            disposeReset();
            if (disposeActive === dispose) {
                disposeActive = undefined;
                refreshActive = undefined;
            }
        };
        disposeActive = dispose;
        return dispose;
    };
    ctx.effect(() => () => { disposeActive?.(); }, 'ui-usage: observation');
    const face = {
        hooks: { usage }, activate,
        retry: () => { refreshActive?.(); },
        rebuild: () => { refreshActive?.(true); },
        openSession: (id) => { ctx.uiWorkspace.openSession(id); },
    };
    ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main', key: PANEL_ID, locale: 'usageStatistics',
        inject: () => face,
    }, UsagePage));
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
        name: 'sidebar.panellist', id: PANEL_ID, order: 15,
        label: () => t('panel'), locale: 'usageStatistics',
    }, UsageIcon));
}
/**
 * Mount this bundle's Host Remote and browser UI as one reversible plugin.
 * @param ctx - browser services.
 * @returns disposer for the dashboard and its Remote namespace.
 */
export async function apply(ctx) {
    const disposeRemote = await ctx.remote.$mount(usageRemote);
    const ui = ctx.inject(['remote.usageStatistics', 'slots', 'locale', 'uiWorkspace'], registerUi);
    try {
        await ui;
    }
    catch (error) {
        await ui.dispose();
        await disposeRemote();
        throw error;
    }
    return async () => {
        await ui.dispose();
        await disposeRemote();
    };
}
//# sourceMappingURL=index.js.map