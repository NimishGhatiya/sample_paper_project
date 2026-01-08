require("dotenv").config();
const app = require("./src/app");

const isProd = process.env.NODE_ENV === "production";
console.log('process.env.NODE_ENV',process.env.DEV_PORT)
const PORT = isProd
  ? process.env.PROD_PORT
  : process.env.DEV_PORT;
  
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
