package com.utcn.demo.service;

import com.utcn.demo.dto.UserC;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.User;
import com.utcn.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    EmailService emailService;


    public List<User> retrieveUsers() {
        return (List<User>) userRepository.findAll();
    }

    public UserDTO retrieveUserById(Long cnp) {

        Optional<User> user = userRepository.findById(cnp);

        if(user.isPresent()) {
            return new UserDTO(user.get().getFirstName(), user.get().getLastName());
        } else {
            return null;
        }
    }


    public String deleteById(Long cnp){
        try{
            userRepository.deleteById(cnp);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public User saveUser(User user){
        emailService.sendEmail(user.getEmail(),"Welcome","Hi, welcome to our app");
        user.setPassword(getMd5Hash(user.getPassword()));
        return userRepository.save(user);
    }

    public User logUser(UserC userC){
        String hashedPassword=getMd5Hash(userC.getPassword());
        for(User user:retrieveUsers()){
            if(user.getEmail().equals(userC.getUsername())&& user.getPassword().equals(hashedPassword)){
                return user;
            }
        }
        return null;

    }


    public static String getMd5Hash(String input) {
        try {

            MessageDigest md = MessageDigest.getInstance("MD5");

            byte[] messageDigest = md.digest(input.getBytes());

            BigInteger no = new BigInteger(1, messageDigest);

            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

}
