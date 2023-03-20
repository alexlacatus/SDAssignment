package com.utcn.demo.service;

import com.utcn.demo.dto.ContentDTO;
import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.entity.Content;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.User;
import com.utcn.demo.repository.ContentRepository;
import com.utcn.demo.repository.QuestionRepository;
import com.utcn.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {
    @Autowired
    ContentRepository contentRepository;

    @Autowired
    UserRepository userRepository;




    public List<Content> retrieveContents(){
        return (List<Content>) contentRepository.findAll();
    }

    public ContentDTO retrieveContentById(Long id){
        Optional<Content> content = contentRepository.findById(id);
        if(content.isPresent()){
            return new ContentDTO(content.get().getContentText(),content.get().getContentPicture(),content.get().getContentDateTime());
        }
        else {
            return null;
        }
    }

    public String deleteById(Long id){
        try {
            contentRepository.deleteById(id);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }


    public Content saveContent(Content content){
        if(userRepository.existsById(content.getContentUser().getUserId())) {
            return contentRepository.save(content);
        }
        else {
            return null;
        }
    }
}
