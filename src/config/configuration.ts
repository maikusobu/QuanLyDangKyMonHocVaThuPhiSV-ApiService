export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  url:
    process.env.NODE_ENV === "development"
      ? process.env.URL_DEV
      : process.env.URL_PROD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
});
