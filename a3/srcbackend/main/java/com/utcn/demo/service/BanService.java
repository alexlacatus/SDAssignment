package com.utcn.demo.service;

import com.utcn.demo.entity.Ban;
import com.utcn.demo.entity.User;
import com.utcn.demo.repository.BanRepository;
import com.utcn.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BanService {
    @Autowired
    BanRepository banRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EmailService emailService;

    public Ban banUser(Long u_id){
        User user=userRepository.findById(u_id).get();
        emailService.sendEmail(user.getEmail(),"BAN","You have been banned");
        return banRepository.save(new Ban(user));
    }

    public Ban unbanUser(Long u_id){

        for(Ban ban: banRepository.findAll()){
            if(ban.getBanUser().getUserId()==u_id) {
                User user=userRepository.findById(u_id).get();
                emailService.sendEmail(user.getEmail(),"UNBAN","You have been unbanned");
                banRepository.delete(ban);
                return ban;
            }
        }

        return null;
    }


    public boolean isBanned(Long u_id){

        for(Ban ban: banRepository.findAll()){
            if(ban.getBanUser().getUserId()==u_id) {
                return true;
            }
        }

        return false;
    }
}
