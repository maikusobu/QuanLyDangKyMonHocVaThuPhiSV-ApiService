export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  url: "",
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
});
