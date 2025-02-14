const DOMAIN =
  process.env.NODE_ENV === "production"
    ? "https://elcassica.tiisetsodeveloper.com"
    : "http://localhost:3000";

module.exports = {
  DOMAIN,
};
