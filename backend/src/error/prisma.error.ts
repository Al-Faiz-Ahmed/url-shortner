import { Prisma } from "../generated/prisma/client";
import {
  AppGraphQLError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "./app.error";

type PrismaMeta = Record<string, unknown> | undefined;

function isAppGraphQLError(err: unknown): err is AppGraphQLError {
  return err instanceof AppGraphQLError;
}

function knownRequestErrorMeta(err: Prisma.PrismaClientKnownRequestError) {
  // `meta` shape varies by error code; keep it as-is for debugging on the client.
  return { prisma: { code: err.code, meta: err.meta as PrismaMeta } };
}

export function toGraphQLErrorFromPrisma(err: unknown): AppGraphQLError {
  // If a service already threw a GraphQL-friendly error, keep it unchanged.
  if (isAppGraphQLError(err)) return err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      // Unique constraint failed
      case "P2002":
        return ValidationError("Duplicate value violates a unique constraint", {
          ...knownRequestErrorMeta(err),
        });

      // Foreign key constraint failed
      case "P2003":
        return ValidationError("Invalid reference to a related record", {
          ...knownRequestErrorMeta(err),
        });

      // Record to update/delete not found
      case "P2025":
        return NotFoundError("Record not found", {
          ...knownRequestErrorMeta(err),
        });

      default:
        return InternalServerError("Database request failed", {
          ...knownRequestErrorMeta(err),
        });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return ValidationError("Invalid database query", {
      prisma: { type: "PrismaClientValidationError" },
    });
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return InternalServerError("Database initialization failed", {
      prisma: { type: "PrismaClientInitializationError" },
    });
  }

  if (err instanceof Prisma.PrismaClientRustPanicError) {
    return InternalServerError("Database engine crashed", {
      prisma: { type: "PrismaClientRustPanicError" },
    });
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return InternalServerError("Unknown database error", {
      prisma: { type: "PrismaClientUnknownRequestError" },
    });
  }

  // Fallback: don't leak raw error details to GraphQL clients.
  return InternalServerError();
}

export function CatchPrismaError(err: unknown): never {
  throw toGraphQLErrorFromPrisma(err);
}

