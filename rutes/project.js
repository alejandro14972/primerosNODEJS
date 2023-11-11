var express = require('express');

var projectControler = require('../controler/project');

var router = express.Router();
var multipart = require('connect-multiparty');

/* este middleware es para la funcind e actualizar img */
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', projectControler.home);
router.post('/test', projectControler.test);

router.post('/save-project',projectControler.saveProject);
router.get('/getproject/:id?', projectControler.getProject);
router.get('/getprojects/', projectControler.getProjects);
router.put('/project/:id', projectControler.update);
router.delete('/deleteProject/:id', projectControler.deleteProject);


router.post('/uploadImg/:id', multipartMiddleware, projectControler.UploadImage);

module.exports = router 