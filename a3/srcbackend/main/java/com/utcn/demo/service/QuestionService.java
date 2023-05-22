package com.utcn.demo.service;


import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.entity.Content;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.QuestionWrapper;
import com.utcn.demo.entity.Tag;
import com.utcn.demo.repository.QuestionRepository;
import org.apache.el.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    VoteService voteService;




    public List<Question> retrieveQuestions(){

        List<Question> questions= (List<Question>)  questionRepository.findAll();
        for(int i=0;i<questions.size();i++){
            for(int j=i+1;j<questions.size();j++){
                if(questions.get(i).getQuestionContent().getContentDateTime().isBefore(questions.get(j).getQuestionContent().getContentDateTime())) {
                    Question aux = questions.get(i);
                    questions.set(i,questions.get(j));
                    questions.set(j,aux);
                }
            }
        }
        return questions;

    }

    public List<QuestionWrapper> retrieveQuestionsW(){
        List<Question>questions= retrieveQuestions();
        List<QuestionWrapper> questionsW=new ArrayList<>();
        List<Tag> tags= tagService.retrieveTags();
        for(Question question:questions){
            List<Tag> tagsQuestion=new ArrayList<>();
            for(Tag tag:tags){
                if(tag.getTagQuestion().getQuestionId()==question.getQuestionId()){
                    tagsQuestion.add(tag);
                }
            }
            questionsW.add(new QuestionWrapper(question,tagsQuestion));


        }


        for(int i=0;i<questionsW.size();i++){
            for(int j=i+1;j<questionsW.size();j++){
                if(questionsW.get(i).getQuestion().getQuestionContent().getContentDateTime().isAfter(questionsW.get(j).getQuestion().getQuestionContent().getContentDateTime())) {
                    QuestionWrapper aux = questionsW.get(i);
                    questionsW.set(i,questionsW.get(j));
                    questionsW.set(j,aux);
                }
            }
        }
        Collections.reverse(questionsW);

        return questionsW;
    }

    public Question retrieveQuestionById(Long id){
        Optional<Question> question = questionRepository.findById(id);
        List<Tag> tags= tagService.retrieveTags();
        List<String> tagsToAdd=new ArrayList<>();


        if(question.isPresent()){
            for(Tag tag:tags ){
                if(tag.getTagQuestion().getQuestionId()==question.get().getQuestionId())
                    tagsToAdd.add(tag.getTagName());
            }

            return question.get();
            //return new QuestionDTO(question.get().getTitle(),question.get().getQuestionContent().getContentText(),question.get().getQuestionContent().getContentPicture(),question.get().getQuestionContent().getContentUser().toString(),question.get().getQuestionContent().getContentDateTime(), tagsToAdd);
        }
        else {
            return null;
        }
    }

    public String deleteById(Long id){
        try {
            Long contentId=questionRepository.findById(id).get().getQuestionContent().getContentId();
            tagService.deleteAllByQuestion(id);
            voteService.deleteAllByContent(contentId);
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
        System.out.println(question.getQuestionContent()+" " +question.getTitle());

        question.setQuestionContent( contentService.saveContent(question.getQuestionContent()));
        Question question1=questionRepository.save(question);

        for(Tag tag:tagService.retrieveTags() ){
            if(tag.getTagQuestion().getQuestionId()== question.getQuestionId()){
                tagService.deleteById(tag.getTagId());
            }
        }

        for(Tag tag:tags ){
            tag.setTagQuestion(question1);
            if(tag.getTagQuestion().getTitle().equals( question.getTitle()))
                tagService.saveTag(tag);
        }
        return question1;
    }


}
