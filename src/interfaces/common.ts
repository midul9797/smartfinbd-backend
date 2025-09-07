import { IGenericErrorMessage } from './error';

// Defines the structure of a generic error response
export type IGenericErrorResponse = {
  statusCode: number; // HTTP status code of the error
  message: string; // A general error message
  errorMessages: IGenericErrorMessage[]; // Array of specific error messages
};

// Defines the structure of a generic response with pagination metadata
export type IGenericResponse<T> = {
  meta: {
    page: number; // Current page number
    limit: number; // Number of items per page
    total: number; // Total number of items
  };
  data: T; // The actual data of the response
};

// Defines the structure of a user request
export type IRequestUser = {
  userId: string; // Unique identifier of the user
};
