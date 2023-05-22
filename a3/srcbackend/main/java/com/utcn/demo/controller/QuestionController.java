package com.utcn.demo.controller;


import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.Question;
import com.utcn.demo.entity.QuestionWrapper;
import com.utcn.demo.entity.Tag;
import com.utcn.demo.entity.User;
import com.utcn.demo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping( "/questions")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<Question> retrieveUsers() {
        return questionService.retrieveQuestions();
    }

    @GetMapping( "/getAllW")
    @ResponseBody
    public List<QuestionWrapper> retrieveUsersW() {
        return questionService.retrieveQuestionsW();
    }

    @GetMapping("/getById/{id}")
    @ResponseBody
    public Question retrieveById(@PathVariable Long id){
        return questionService.retrieveQuestionById(id);
    }

    @GetMapping("/getById")
    @ResponseBody
    public Question retrieveById1(@RequestParam("id") Long id){
        return questionService.retrieveQuestionById(id);
    }

    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        String response=questionService.deleteById(id);
        if(response.equals("Success"))
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"" + response + "\"}");
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"" + response + "\"}");
    }

    @DeleteMapping("/deleteById")
    @ResponseBody
    public String deleteById1(@RequestParam("id") Long id) {return questionService.deleteById(id);}

    @PostMapping("/insertQuestion")
    @ResponseBody
    public Question insertQuestion(@RequestBody QuestionWrapper questionWrapper){
        return questionService.saveQuestion(questionWrapper.getQuestion(),questionWrapper.getTags());
    }

    @PutMapping("/updateQuestion")
    @ResponseBody
    public Question updateQuestion(@RequestBody QuestionWrapper questionWrapper) {


        if(questionService.retrieveQuestionById(questionWrapper.getQuestion().getQuestionId())!=null)
            return questionService.saveQuestion(questionWrapper.getQuestion(),questionWrapper.getTags());
        else
            return null;
    }
}
