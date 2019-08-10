export function Interval(intervalMs: number) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const result = await originalMethod.apply(this, args);
      setInterval(async () => {
        return await originalMethod.apply(this, args)
      }, intervalMs);
      return result;
    }

    return descriptor;
  }
} 