export function notify(channel, message, context = {}) {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[NOTIFY]', { channel, message, context });
  }
  return { channel, message, context, sentAt: new Date().toISOString() };
}
