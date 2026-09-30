---
description: "Install a Desktop Usage sidebar dashboard that reads provider-reported token totals from sessions."
kind: "package-bundle"
---

# @deepseek-ai/dsh-client-ui-usage

English | [中文](README.zh.md)

## Summary

Add this bundle to a Desktop profile to open **Usage** from the left sidebar. It shows an activity heatmap with a rolling-year or calendar-year view and date selection; input-token and efficiency trends; input and output composition; model, project, and provider shares; and high-usage or recent-chat Top 10 sessions. Charts show exact values on hover. The page shows its last saved observation while refreshing after a restart. The dashboard reads provider-reported usage in durable session logs; its data-quality panel separates unreadable sessions, turns without complete usage, and turns without one model or provider. Install or remove the bundle through `dsh plugin` without changing the Desktop application package.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Further Exploration](#further-exploration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

### Install into a profile

Clone this repository, fully quit Desktop, install the included build from its absolute local path, then reopen Desktop:

```powershell
git clone https://github.com/aaroncarry/dsh-usage.git D:\dsh-usage
dsh plugin --profile desktop add D:\dsh-usage
```

The installer adds this package to the Desktop profile and activates its `dsh.bundle.patch` layer. Remove it with `dsh plugin --profile desktop remove @deepseek-ai/dsh-client-ui-usage`, then reopen Desktop. A package without the bundle declaration installs as a dependency but adds no dashboard row.

### What you get

The layer inserts one `ui-usage` row:

```yaml
- id: ui-usage
  name: '@deepseek-ai/dsh-client-ui-usage'
```

The Host reads Session Query and Workspace Registry. The package's Client half mounts its generated Usage Remote, registers localized copy, and contributes the sidebar item and main page. Set optional `readConcurrency` to an integer from 1 to 16 in the plugin row's `config` to limit simultaneous cold session reads; the default is 4. This view is read-only and is not a billing or quota meter.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

`cordis.patch.yml` inserts the `ui-usage` row after the profile's existing bundles. The Host observes session logs with bounded concurrency and folds each completed turn with the package's exact provider-usage rules. It excludes a fork's inherited log prefix, so the same provider call is counted once. Within a running Host, unchanged sessions reuse their folded result using live sequence numbers or a persistence revision; manual recalculation bypasses that cache. Persistence revisions cannot be compared across Host restarts, so the Host verifies available logs again after a restart. The Client saves the last observation in local browser storage and displays it immediately during that verification, with the observation time and progress count. A turn with incomplete accounting does not contribute a numeric total, and an unreadable session is reported separately. A turn replaced by a new one before it ended is reported as incomplete; an attempt that failed before reporting any usage is treated as unbilled. Only turns whose attempts resolve to one provider/model route are attributed to that route; other exact totals remain in **Unattributed**. A turn's usage belongs to its closing day in the browser's local calendar. The heatmap uses the shared Client tooltip for verified daily totals, leaves unmeasured days empty, and can select one date as the page filter. The recent-chat ranking sorts by the last chat event and shows period-scoped token totals.

No runtime invariant companion is published because cached folds are disposable derived data and the Session Query log remains the only authority for usage.

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

- [Profile bundles](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/develop/basic/publish.md) explains installation and layer order.
- [Session Query](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/session-query/session-query/README.md) provides cold and live session reads.
- [Client slots](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/slots.md) explains the sidebar and main-panel registrations.

-----

<a id="model-experience"></a>
## Model Experience

None. The inserted plugin registers no model-facing tools or messages.

#### KV Cache effect

None. Reading usage does not enter a model request.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>

- Provider/model share can contain **Unattributed** when a completed turn contains multiple routes or an attempt has no route. Cache hit rate is unavailable when selected records omit cache counters.
- The Host verifies each available session log after a restart. Very large histories can make the first verification slow; the saved observation can lag until it finishes. The view refreshes after a session finishes, is added or removed, or the connection resets.
- Measurable turn coverage excludes unreadable sessions because their missing-turn count is unknown. It is unavailable while filtering to one model because an incomplete turn cannot be attributed reliably. Cache-read share is unavailable when selected complete turns omit cache counters.
- Project attribution matches a session's working directory to the deepest registered Workspace containing it (separators, trailing slashes, and, on Windows and macOS, letter case are ignored), then falls back to parent-session ancestry. Sessions outside registered Workspaces appear under **Unattributed**.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
