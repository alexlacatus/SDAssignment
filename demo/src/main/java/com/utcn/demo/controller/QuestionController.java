package com.utcn.demo.controller;


import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.QuestionWrapper;
import com.utcn.demo.entity.Tag;
import com.utcn.demo.entity.User;
import com.utcn.demo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/questions")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<Question> retrieveUsers() {
        return questionService.retrieveQuestions();
    }


    @GetMapping("/getById/{id}")
    @ResponseBody
    public QuestionDTO retrieveById(@PathVariable Long id){
        return questionService.retrieveQuestionById(id);
    }

    @GetMapping("/getById")
    @ResponseBody
    public QuestionDTO retrieveById1(@RequestParam("id") Long id){
        return questionService.retrieveQuestionById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public String deleteById(@PathVariable Long id){
        return questionService.deleteById(id);
    }

    @DeleteMapping("/deleteById")
    @ResponseBody
    String deleteById1(@RequestParam("id") Long id) {return questionService.deleteById(id);}

    @PostMapping("/insertQuestion")
    @ResponseBody
    public Question insertQuestion(@RequestBody QuestionWrapper questionWrapper){
        return questionService.saveQuestion(questionWrapper.getQuestion(),questionWrapper.getTags());
    }

    @PutMapping("/updateQuestion")
    @ResponseBody
    public Question updateQuestion(@RequestBody QuestionWrapper questionWrapper) {
        Question question=questionWrapper.getQuestion();
        //List<Tag> tags=questionWrapper.getTags();
        if(questionService.retrieveQuestionById(question.getQuestionId())!=null)
            return questionService.saveQuestion(question,questionWrapper.getTags());
        else
            return null;
    }
}
