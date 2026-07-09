type EventProperties = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: string, properties: EventProperties = {}) {
  if (__DEV__) {
    console.log("[analytics]", name, properties);
  }
}
