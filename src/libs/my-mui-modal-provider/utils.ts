export const generateUid = (len = 8): string => {
  const buf: string[] = [];
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charlen = chars.length;

  for (let i = 0; i < len; i += 1) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }

  return buf.join('');
};
