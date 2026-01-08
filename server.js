require("dotenv").config();
const app = require("./src/app");

const isProd = process.env.NODE_ENV === "production";
const PORT = isProd
  ? process.env.PROD_PORT
  : process.env.DEV_PORT;
  
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
