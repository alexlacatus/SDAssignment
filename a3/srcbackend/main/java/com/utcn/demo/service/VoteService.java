package com.utcn.demo.service;

import com.utcn.demo.entity.*;
import com.utcn.demo.repository.QuestionRepository;
import com.utcn.demo.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    @Autowired
    VoteRepository voteRepository;

    @Autowired
    ContentService contentService;
    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    UserService userService;

    public List<Vote> retrieveVotes() {
        return (List<Vote>) voteRepository.findAll();
    }

    public Vote upVote(Vote newVote){

        for(Content content: contentService.retrieveContents()){
            if(content.getContentDateTime().equals( newVote.getVoteContent().getContentDateTime())&&content.getContentText().equals( newVote.getVoteContent().getContentText())) {
                    newVote.setVoteContent(content);
            }

        }

        for(User user: userService.retrieveUsers()){
            System.out.println(user.getFirstName()+ " "+ user.getLastName());
            if(user.getFirstName().equals( newVote.getVoteUser().getFirstName()) && user.getLastName().equals( newVote.getVoteUser().getLastName())) {
                newVote.setVoteUser(user);
                System.out.println("sett");
                break;
            }
        }

        if(newVote.getVoteContent().getContentUser().equals(newVote.getVoteUser())) {
            System.out.println("creator can not vote");
            return null;
        }
        for(Vote vote:retrieveVotes()){
            if(vote.isVoteVote()== newVote.isVoteVote()&&vote.getVoteUser().equals(newVote.getVoteUser())&&vote.getVoteContent().equals( newVote.getVoteContent())){
                voteRepository.delete(vote);
                System.out.println("vote deleted");
                return null;
            }
        }
        return voteRepository.save(newVote);

    }

    public int getVotes(Long c_id){
        int sum=0;
        for(Vote vote:retrieveVotes()){
            if(vote.getVoteContent().getContentId()==c_id){
                if(vote.isVoteVote())sum++;
                else sum--;

            }
        }
        return sum;



    }

    public String deleteAllByContent(Long contentId){
        try{
            for(Vote vote:retrieveVotes()){
                if(vote.getVoteContent().getContentId()==contentId)
                    voteRepository.delete(vote);

            }
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public float getUserScore(Long u_id){
        float sum=0;

        for(Vote vote:retrieveVotes()){
            if(vote.isVoteVote()){
                if(vote.getVoteContent().getContentUser().getUserId()==u_id){
                    if(isQuestion(vote.getVoteContent().getContentId()))
                        sum+=2.5;
                    else
                        sum+=5.0;

                }

            }
            else {
                if(vote.getVoteContent().getContentUser().getUserId()==u_id){
                    if(isQuestion(vote.getVoteContent().getContentId()))
                        sum-=1.5;
                    else
                        sum-=2.5;

                }
                if(vote.getVoteUser().getUserId()==u_id)
                    sum-=1.5;

            }

        }

        return sum;

    }

    public boolean isQuestion(Long c_id){

        for(Question question:(List<Question>) questionRepository.findAll()){
            if(question.getQuestionContent().getContentId()==c_id)
                return true;
        }
        return false;



    }
}
