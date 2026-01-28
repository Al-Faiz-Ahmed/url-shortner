import { GraphQLError } from "graphql";

type ErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "INTERNAL_SERVER_ERROR";

interface AppErrorOptions {
  code?: ErrorCode;
  statusCode?: number;
  // Any extra metadata you might want to attach
  meta?: Record<string, unknown> | undefined;
}

export class AppGraphQLError extends GraphQLError {
  public readonly code: ErrorCode;
  public readonly statusCode: number;

  constructor(message: string, options: AppErrorOptions = {}) {
    const {
      code = "INTERNAL_SERVER_ERROR",
      statusCode = 500,
      meta = {},
    } = options;

    super(message, {
      extensions: {
        code,
        http: {
          status: statusCode,
        },
        ...meta,
      },
    });

    this.code = code;
    this.statusCode = statusCode;
  }
}

export const ValidationError = (
  message: string,
  meta?: Record<string, unknown>,
) =>
  new AppGraphQLError(message, {
    code: "VALIDATION_ERROR",
    statusCode: 400,
    meta,
  });

export const NotFoundError = (
  message: string = "Resource not found",
  meta?: Record<string, unknown>,
) =>
  new AppGraphQLError(message, {
    code: "NOT_FOUND",
    statusCode: 404,
    meta,
  });

export const UnauthenticatedError = (
  message: string = "Authentication required",
  meta?: Record<string, unknown>,
) =>
  new AppGraphQLError(message, {
    code: "UNAUTHENTICATED",
    statusCode: 401,
    meta,
  });

export const ForbiddenError = (
  message: string = "You are not allowed to perform this action",
  meta?: Record<string, unknown>,
) =>
  new AppGraphQLError(message, {
    code: "FORBIDDEN",
    statusCode: 403,
    meta,
  });

export const InternalServerError = (
  message: string = "Something went wrong",
  meta?: Record<string, unknown>,
) =>
  new AppGraphQLError(message, {
    code: "INTERNAL_SERVER_ERROR",
    statusCode: 500,
    meta,
  });

  