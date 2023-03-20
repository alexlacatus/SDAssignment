package com.utcn.demo.service;


import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.Tag;
import com.utcn.demo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    ContentService contentService;
    @Autowired
    AnswerService answerService;
    @Autowired
    TagService tagService;




    public List<Question> retrieveQuestions(){
        return (List<Question>) questionRepository.findAll();
    }

    public QuestionDTO retrieveQuestionById(Long id){
        Optional<Question> question = questionRepository.findById(id);
        if(question.isPresent()){
            return new QuestionDTO(question.get().getTitle(),question.get().getQuestionContent().getContentText());
        }
        else {
            return null;
        }
    }

    public String deleteById(Long id){
        try {
            Long contentId=questionRepository.findById(id).get().getQuestionContent().getContentId();
            answerService.deleteAllByQuestion(id);
            questionRepository.deleteById(id);
            contentService.deleteById(contentId);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public Question saveQuestion(Question question, List<Tag> tags){
        contentService.saveContent(question.getQuestionContent());
        Question question1=questionRepository.save(question);
        for(Tag tag:tags ){
            if(tag.getTagQuestion().getQuestionId()==question.getQuestionId())
                tagService.saveTag(tag);
        }
        return question1;
    }
}
