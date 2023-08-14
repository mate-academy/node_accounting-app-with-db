export function ensure<T> (value: T, message?: string): asserts value is NonNullable<T> {
  if (!value) {
    throw new Error(message || 'Value is not defined')
  }
}
