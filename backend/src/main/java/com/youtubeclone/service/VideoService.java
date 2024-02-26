package com.youtubeclone.service;

import com.youtubeclone.model.Video;
import com.youtubeclone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public void uploadVideo(MultipartFile file) {
        String videoUrl = s3Service.uploadFile(file);
        Video video = new Video();
        video.setVideoUrl(videoUrl);

        videoRepository.save(video);
    }
}
