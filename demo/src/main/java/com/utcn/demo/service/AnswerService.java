package com.utcn.demo.service;


import com.utcn.demo.dto.AnswerDTO;
import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.entity.Answer;
import com.utcn.demo.entity.Question;
import com.utcn.demo.repository.AnswerRepository;
import com.utcn.demo.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
public class AnswerService {

    @Autowired
    AnswerRepository answerRepository;
    @Autowired
    ContentService contentService;




    public List<Answer> retrieveAnswers(){
        return (List<Answer>) answerRepository.findAll();
    }

    public List<Answer> retrieveAnswersByQuestionId(Long questionId){


        return StreamSupport.stream(answerRepository.findAll().spliterator(),false).filter(answer ->answer.getAnswerQuestion().getQuestionId()==questionId).toList();
    }

    public AnswerDTO retrieveAnswerById(Long id){
        Optional<Answer> answer = answerRepository.findById(id);
        if(answer.isPresent()){
            return new AnswerDTO(answer.get().getAnswerQuestion().getTitle(),answer.get().getAnswerContent().getContentText());
        }
        else {
            return null;
        }
    }

    public AnswerDTO retrieveAnswerByQuestionIdById(Long questionId,Long id){
        Optional<Answer> answer = answerRepository.findById(id);
        if(answer.isPresent() && answer.get().getAnswerQuestion().getQuestionId()==questionId){
            return new AnswerDTO(answer.get().getAnswerQuestion().getTitle(),answer.get().getAnswerContent().getContentText());
        }
        else {
            return null;
        }
    }

    public String deleteById(Long id){
        try {
            Long contentId=answerRepository.findById(id).get().getAnswerContent().getContentId();
            answerRepository.deleteById(id);
            contentService.deleteById(contentId);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public String deleteByQuestionById(Long questionId,Long id){
        try {
            if(answerRepository.findById(id).get().getAnswerQuestion().getQuestionId()==questionId){
                Long contentId=answerRepository.findById(id).get().getAnswerContent().getContentId();
                answerRepository.deleteById(id);
                contentService.deleteById(contentId);
                return "Success";
            }
            return "Failed";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public String deleteAllByQuestion(Long questionId){
        try{
            for(Answer answer:retrieveAnswersByQuestionId(questionId)){

                deleteByQuestionById(questionId,answer.getAnswerId());
            }
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public Answer saveAnswer(Answer answer){
        return answerRepository.save(answer);
    }

    public Answer saveAnswerByQuestionId(Long questionId, Answer answer){
        if(answer.getAnswerQuestion().getQuestionId()==questionId) {
            System.out.println("1");
            contentService.saveContent(answer.getAnswerContent());
            return answerRepository.save(answer);
        }
        System.out.println("2");
        return null;
    }
}
