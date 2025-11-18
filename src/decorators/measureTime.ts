// Simple decorator to track how long methods take to run
export function measureTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const start = performance.now();

    try {
      const result = await originalMethod.apply(this, args);
      const end = performance.now();
      const duration = (end - start).toFixed(2);

      console.log(`[TIMING] ${propertyKey} executed in ${duration}ms`);

      return result;
    } catch (error) {
      // Still log timing even if something went wrong
      const end = performance.now();
      const duration = (end - start).toFixed(2);

      console.log(`[TIMING] ${propertyKey} failed after ${duration}ms`);
      throw error;
    }
  };

  return descriptor;
}
