import appError from "../utils/appError.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    if (req.file || req.files?.length) {
      data.file = req.file || req.files;
    }
    const { error, value } = schema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      // extract messages
      const messages = error.details.map((err) => err.message);

      // send ONE combined error message
      return next(new appError().create(messages.join(", "), 400));
    }
    req.validatedData = value;
    next();
  };
};
