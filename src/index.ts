
const INTERPOLATED = /{{.*?}}/g;

const meme = (fn: Function) => {
  const cache: any = {};
  return (str: string) => {
    if (!cache[str]) {
      cache[str] = fn.call(null, str);
    }
    return cache[str];
  }
}

const compile = meme((cmd: string) => new Function(`with(this) {
  try {
    return ${cmd} || '';
  } catch (e) {
    return '';
  }
}`));

const parse = (template: string|string[], ...args: string[]) => {
  if (Array.isArray(template)) {
    return template.reduce((a, t, i) => a + t + (args[i] || ''), '');
  }
  return template;
}

module.exports = (template: string|string[], ...args: string[]) => (context: any) => {
  const replacer = meme((found: string) => {
    const cleaned = found.slice(2, -2).trim();
    const exists = context[cleaned];
    return exists && typeof exists === 'function'
      ? exists(context)
      : compile(cleaned).apply(context);
  });

  return parse(template, ...(args || [])).replace(INTERPOLATED, replacer);
};
