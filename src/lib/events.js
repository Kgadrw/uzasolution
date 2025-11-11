const eventLog = [];

export function emitEvent(name, payload = {}) {
  const entry = {
    name,
    payload,
    emittedAt: new Date().toISOString(),
  };
  eventLog.push(entry);
  if (process.env.NODE_ENV !== 'production') {
    console.info('[EVENT_EMITTED]', entry);
  }
  return entry;
}

export function getEventLog() {
  return [...eventLog];
}
