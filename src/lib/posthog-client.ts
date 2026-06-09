"use client";

import posthog from "posthog-js";
import { isPostHogEnabled } from "@/lib/posthog";

export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
) {
  if (!isPostHogEnabled()) return;
  posthog.capture(event, properties);
}
