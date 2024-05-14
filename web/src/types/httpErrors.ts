const httpErrors = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

export const throwHttpError = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      throw new BadRequestError(httpErrors[statusCode]);
    case 401:
      throw new UnauthorizedError(httpErrors[statusCode]);
    case 403:
      throw new ForbiddenError(httpErrors[statusCode]);
    case 404:
      throw new NotFoundError(httpErrors[statusCode]);
    case 500:
      throw new InternalServerError(httpErrors[statusCode]);
    default:
      throw new Error();
  }
};
