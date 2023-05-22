package com.utcn.demo.controller;


import com.utcn.demo.entity.Vote;
import com.utcn.demo.service.UserService;
import com.utcn.demo.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping( "/votes")
public class VoteController {
    @Autowired
    VoteService voteService;

    @GetMapping("/getVotes/{c_id}")
    @ResponseBody
    public int getVotes(@PathVariable Long c_id){
        return voteService.getVotes(c_id);
    }

    @GetMapping("/getScore/{u_id}")
    @ResponseBody
    public float getScore(@PathVariable Long u_id){
        return voteService.getUserScore(u_id);
    }


    @PostMapping("/upVote")
    @ResponseBody
    public Vote getVotes(@RequestBody Vote vote){
        return voteService.upVote(vote);
    }




}
