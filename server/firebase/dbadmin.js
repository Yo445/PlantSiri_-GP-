require("dotenv").config();

const admin = require("firebase-admin");
const serviceAccount = {
  type: "service_account",
  project_id: process.env.NODE_PROJECT_ID,
  private_key_id: process.env.NODE_PRIVATE_KEY_ID,
  private_key: process.env.NODE_PRIVATE_KEY,
  client_email: process.env.NODE_CLIENT_EMAIL,
  client_id: process.env.NODE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.NODE_CLIENT_X509,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NODE_DATABASEURL,
});

module.exports = admin;
