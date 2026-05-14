const express = require('express');
const router = express.Router();
const { getVideos, addVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { videoUpload } = require('../config/cloudinary');

router.get('/', getVideos);
router.post('/', videoUpload.single('video'), addVideo);
router.put('/:id', videoUpload.single('video'), updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
