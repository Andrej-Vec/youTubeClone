package com.youtubeclone.service;

import com.youtubeclone.dto.VideoDto;
import com.youtubeclone.model.UploadVideoResponse;
import com.youtubeclone.model.Video;
import com.youtubeclone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public UploadVideoResponse uploadVideo(MultipartFile file) {
        String videoUrl = s3Service.uploadFile(file);
        Video video = new Video();
        video.setVideoUrl(videoUrl);

        Video saveVideo = videoRepository.save(video);
        return new UploadVideoResponse(saveVideo.getId(), saveVideo.getVideoUrl());
    }

    public VideoDto editVideo(VideoDto videoDto) {
        Video saveVideo = getVideoById(videoDto.getId());
        saveVideo.setTitle(videoDto.getTitle());
        saveVideo.setDescription(videoDto.getDescription());
        saveVideo.setTags(videoDto.getTags());
        saveVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        saveVideo.setVideoStatus(videoDto.getVideoStatus());

        videoRepository.save(saveVideo);
        return videoDto;
    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        Video saveVideo = getVideoById(videoId);

        String thumbnailUrl = s3Service.uploadFile(file);
        saveVideo.setThumbnailUrl(thumbnailUrl);
        videoRepository.save(saveVideo);
        return thumbnailUrl;
    }

    private Video getVideoById(String videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find video by id " + videoId));
    }
}
