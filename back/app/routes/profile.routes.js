module.exports = app => {
    const profiles = require("../controllers/profile.controller.js");
  
    let router = require("express").Router();
  
    router.post("/", profiles.create);
  
    router.get("/", profiles.findAll);
  
    router.get("/:id", profiles.findOne);
  
    router.put("/:id", profiles.update);
  
    router.delete("/:id", profiles.delete);
  
    router.post('/upload-pdf', profiles.uploadPdf);

    app.use('/api/v1/profiles', router);
  };