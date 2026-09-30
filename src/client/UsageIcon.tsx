/** Decorative glyph for the usage sidebar entry. */
import { IconDataOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'

/** Render the sidebar's requested icon size. @param props - sidebar icon props. @returns the glyph. */
export function UsageIcon({ size }: PropsRuntime<'sidebar.panellist'>) {
  return <IconDataOutlineRegular size={size} />
}
