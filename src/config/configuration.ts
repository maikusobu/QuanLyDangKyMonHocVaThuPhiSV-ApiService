export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  pingUrl:
    process.env.NODE_ENV === "development"
      ? process.env.PING_URL_DEV
      : process.env.PING_URL_PROD,
});
