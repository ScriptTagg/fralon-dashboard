export const getErrorMessage = (error: unknown) => {
  if (!error) return "Unknown Error";

  return "Something went wrong";
};
