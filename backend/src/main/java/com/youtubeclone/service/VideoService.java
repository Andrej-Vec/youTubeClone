package com.youtubeclone.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class VideoService {
    public void uploadVideo(MultipartFile file) {
        // Upload file to AWS S3 && Save video Data to Database
    }
}
