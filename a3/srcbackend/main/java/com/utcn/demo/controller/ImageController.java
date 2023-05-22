//package com.utcn.demo.controller;
//
//import com.utcn.demo.service.DropboxService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//
//@RestController
//@RequestMapping("/api")
//public class ImageController {
//
//    @Autowired
//    private DropboxService dropboxService;
//
//    @PostMapping("/images")
//    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
//        return dropboxService.uploadImage(file);
//    }
//
//}