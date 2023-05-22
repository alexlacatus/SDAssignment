//package com.utcn.demo.service;
//
//import com.dropbox.core.DbxRequestConfig;
//import com.dropbox.core.NetworkIOException;
//import com.dropbox.core.RetryException;
//import com.dropbox.core.v2.DbxClientV2;
//import com.dropbox.core.v2.files.CommitInfo;
//import com.dropbox.core.v2.files.UploadErrorException;
//import com.dropbox.core.v2.files.WriteMode;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.UUID;
//
//@Service
//public class DropboxService {
//
//    @Value("${dropbox.accessToken}")
//    private String accessToken;
//
//    @Value("${dropbox.folderPath}")
//    private String folderPath;
//
//    public String uploadImage(MultipartFile file) throws IOException, RetryException, UploadErrorException, NetworkIOException {
//        DbxRequestConfig config = new DbxRequestConfig("dropbox/java-tutorial", "en_US");
//        DbxClientV2 client = new DbxClientV2(config, accessToken);
//
//        String imageName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
//
//        try (InputStream inputStream = file.getInputStream()) {
//            CommitInfo commitInfo = new CommitInfo(folderPath + "/" + imageName, WriteMode.ADD, true);
//            client.files().uploadBuilder(commitInfo).uploadAndFinish(inputStream);
//        }
//
//        return client.files().getTemporaryLink(folderPath + "/" + imageName).getLink();
//    }
//
//}
