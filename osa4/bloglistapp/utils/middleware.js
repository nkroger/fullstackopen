const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  const token =
    authorization && authorization.toLowerCase().startsWith("bearer ")
      ? authorization.substring(7)
      : null;
  const decodedToken =
    token !== null ? jwt.verify(token, process.env.SECRET) : null;
  request.token = decodedToken;
  next();
};

const userExtractor = (request, response, next) => {
  request.user = request.token === null ? null : request.token.id;
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
