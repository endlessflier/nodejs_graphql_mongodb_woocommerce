const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile("admin.html", { root: "public" });
})
router.get('*', (req, res) => {
  res.sendFile("admin.html", { root: "public" });
  })
  
export default router;