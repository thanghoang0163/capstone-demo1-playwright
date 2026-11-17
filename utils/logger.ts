// utils/logger.ts
type Level = "DEBUG" | "INFO" | "WARN" | "ERROR";
const SENSITIVE_KEYS = /(password|matKhau|token|accessToken)/i;

const buffer: string[] = [];

const mask = (data: unknown): unknown =>
  JSON.parse(
    JSON.stringify(data ?? null, (k, v) => (SENSITIVE_KEYS.test(k) ? "***" : v)),
  );

const write = (level: Level, message: string, data?: unknown) => {
  const line = `${new Date().toISOString()} [${level}] ${message}${
    data !== undefined ? " " + JSON.stringify(mask(data)) : ""
  }`;
  buffer.push(line);
  console.log(line);
};

export const logger = {
  debug: (m: string, d?: unknown) => write("DEBUG", m, d),
  info: (m: string, d?: unknown) => write("INFO", m, d),
  warn: (m: string, d?: unknown) => write("WARN", m, d),
  error: (m: string, d?: unknown) => write("ERROR", m, d),
  flush: () => buffer.splice(0).join("\n"),
};