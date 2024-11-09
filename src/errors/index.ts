export class DatabaseError extends Error {
	public code: number
	public details?: string
	constructor(message: string, code: number, details?: string) {
		super(message)
		this.code = code
		this.details = this.details
	}

	static notFound(details?: string): DatabaseError {
		return new DatabaseError('Resource not found', 404, details)
	}

	static internalError(details?: string): DatabaseError {
		return new DatabaseError('Internal server error', 500, details)
	}

	static validationError(details?: string): DatabaseError {
		return new DatabaseError('Validation error', 400, details)
	}

	static conflict(details?: string): DatabaseError {
		return new DatabaseError('Conflict in the request', 409, details)
	}

	static unauthorized(details?: string): DatabaseError {
		return new DatabaseError('Unauthorized access', 401, details)
	}

	static forbidden(details?: string): DatabaseError {
		return new DatabaseError('Access forbidden', 403, details)
	}
	// Método para convertir el error a un objeto legible
	toJSON() {
		return {
			message: this.message,
			code: this.code,
			details: this.details,
		}
	}
}
