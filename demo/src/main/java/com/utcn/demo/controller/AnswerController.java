package com.utcn.demo.controller;

import com.utcn.demo.dto.AnswerDTO;
import com.utcn.demo.dto.QuestionDTO;
import com.utcn.demo.entity.Answer;
import com.utcn.demo.entity.Question;
import com.utcn.demo.service.AnswerService;
import com.utcn.demo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions/getById/{q_id}/answers")
public class AnswerController {


    @Autowired
    AnswerService answerService;


    @GetMapping( "/getAll")
    @ResponseBody
    public List<Answer> retrieveAnswers(@PathVariable Long q_id) {
        return answerService.retrieveAnswersByQuestionId(q_id);
    }

    //here
    @GetMapping("/getById/{id}")
    @ResponseBody
    public AnswerDTO retrieveById(@PathVariable Long q_id,@PathVariable Long id){
        return answerService.retrieveAnswerByQuestionIdById(q_id,id);
    }

    @GetMapping("/getById")
    @ResponseBody
    public AnswerDTO retrieveById1(@PathVariable Long q_id, @RequestParam("id") Long id){
        return answerService.retrieveAnswerByQuestionIdById(q_id,id);
    }

    @DeleteMapping("/deleteById/{id}")
    @ResponseBody
    public String deleteById(@PathVariable Long q_id , @PathVariable Long id){
        return answerService.deleteByQuestionById(q_id, id);
    }

    @DeleteMapping("/deleteById")
    @ResponseBody
    String deleteById1(@PathVariable Long q_id ,@RequestParam("id") Long id) {
        return answerService.deleteByQuestionById(q_id, id);
    }

    @PostMapping("/insertAnswer")
    @ResponseBody
    public Answer insertAnswer(@PathVariable Long q_id, @RequestBody Answer answer){
        return answerService.saveAnswerByQuestionId(q_id,answer);
    }

    @PutMapping("/updateAnswer")
    @ResponseBody
    public Answer updateAnswer(@PathVariable Long q_id,@RequestBody Answer answer){
        if(answerService.retrieveAnswerByQuestionIdById(q_id,answer.getAnswerId())!=null)
            return answerService.saveAnswerByQuestionId(q_id,answer);
        else
            return null;
    }



}
