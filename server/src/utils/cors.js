const DEV_ORIGIN = 'http://localhost:5173';

function parseOrigins(value = '') {
  const origins = (value || DEV_ORIGIN)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (!origins.includes(DEV_ORIGIN)) {
    origins.push(DEV_ORIGIN);
  }
  return origins;
}

export const allowedOrigins = parseOrigins(
  process.env.CORS_ORIGINS || process.env.CLIENT_URL
);

export function corsOptions(origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  return callback(new Error(`Origin ${origin} not allowed by CORS`));
}
