const checkEnvVariables = function () {
  const requiredVariables = ["DB", "JWT_SECRET", "JWT_EXPIRES_IN"];
  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
  );

  if (missingVariables.length > 0) {
    console.warn(
      `The following environment variables are missing: ${missingVariables.join(
        ", "
      )}. Please set them in the config.env file.`
    );
    process.exit(1); // Exit after showing all missing variables
  }
};

export { checkEnvVariables };
