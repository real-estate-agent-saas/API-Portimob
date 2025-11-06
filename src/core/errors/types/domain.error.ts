/**
 * Base class for all domain errors.
 * Serves to identify errors arising from business rules,
 * without depending on frameworks (like NestJS).
 */
export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly metadata?: Record<string, any>,
  ) {
    super(message);
    // Default name = subclass name
    this.name = new.target.name;
    // Defines a stack trace (Create a log showing the flow of the function call stack)
    Error.captureStackTrace?.(this, new.target);
  }
}
