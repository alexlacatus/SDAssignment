package com.utcn.demo.service;

import com.utcn.demo.dto.TagDTO;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.Answer;
import com.utcn.demo.entity.Tag;
import com.utcn.demo.entity.User;
import com.utcn.demo.repository.TagRepository;
import com.utcn.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;


    public List<Tag> retrieveTags() {
        return (List<Tag>) tagRepository.findAll();
    }

    public TagDTO retrieveTagById(Long id) {

        Optional<Tag> tag = tagRepository.findById(id);

        if(tag.isPresent()) {
            return new TagDTO(tag.get().getTagName(),tag.get().getTagQuestion().getTitle());
        } else {
            return null;
        }
    }


    public String deleteById(Long id){
        try{
            tagRepository.deleteById(id);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public String deleteAllByQuestion(Long questionId){
        try{
            for(Tag tag:retrieveTags()){
                if(tag.getTagQuestion().getQuestionId()==questionId)
                    deleteById(tag.getTagId());
            }
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public Tag saveTag(Tag tag){
        return tagRepository.save(tag);
    }
}
