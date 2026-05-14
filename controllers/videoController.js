const Video = require('../models/Video');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a video
// @route   POST /api/videos
// @access  Public
const addVideo = async (req, res) => {
    try {
        const { title, category, videoUrl } = req.body;
        
        let finalUrl = videoUrl;
        let cloudinaryId = '';

        // If a file was uploaded (e.g., small video or thumbnail placeholder if used)
        // But usually for videos we might use a link. 
        // If we want to support direct upload via Cloudinary's upload.single('video'):
        if (req.file) {
            finalUrl = req.file.path;
            cloudinaryId = req.file.filename;
        }

        if (!finalUrl) {
            return res.status(400).json({ message: 'Video URL or file is required' });
        }

        const newVideo = new Video({
            title,
            videoUrl: finalUrl,
            cloudinaryId,
            category
        });

        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Public
const updateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const { title, category, videoUrl } = req.body;

        if (req.file) {
            if (video.cloudinaryId) {
                await cloudinary.uploader.destroy(video.cloudinaryId, { resource_type: 'video' });
            }
            video.videoUrl = req.file.path;
            video.cloudinaryId = req.file.filename;
        } else if (videoUrl) {
            video.videoUrl = videoUrl;
        }

        video.title = title || video.title;
        video.category = category || video.category;

        const updatedVideo = await video.save();
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Public
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        if (video.cloudinaryId) {
            await cloudinary.uploader.destroy(video.cloudinaryId, { resource_type: 'video' });
        }

        await video.deleteOne();
        res.status(200).json({ message: 'Video removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getVideos,
    addVideo,
    updateVideo,
    deleteVideo
};
