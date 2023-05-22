package com.utcn.demo.controller;

import com.utcn.demo.dto.UserC;
import com.utcn.demo.dto.UserDTO;
import com.utcn.demo.entity.User;
import com.utcn.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping( "/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping( "/getAll")
    @ResponseBody
    public List<User> retrieveUsers() {
        return userService.retrieveUsers();
    }


    @GetMapping("/getById/{cnp}")
    @ResponseBody
    public UserDTO retrieveById(@PathVariable Long cnp){
        return userService.retrieveUserById(cnp);
    }

    @GetMapping("/getById")
    @ResponseBody
    public UserDTO retrieveById1(@RequestParam("cnp") Long cnp){
        return userService.retrieveUserById(cnp);
    }

    @DeleteMapping("/deleteById/{cnp}")
    @ResponseBody
    public String deleteById(@PathVariable Long cnp){
        return userService.deleteById(cnp);
    }

    @DeleteMapping("/deleteById")
    @ResponseBody
    String deleteById1(@RequestParam("cnp") Long cnp) {return userService.deleteById(cnp);}

    @PostMapping("/insertUser")
    @ResponseBody
    public User insertUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @PutMapping("/updateUser")
    @ResponseBody
    public User updateUser(@RequestBody User user){
        if(userService.retrieveUserById(user.getUserId())!=null)
            return userService.saveUser(user);
        else
            return null;
    }




    @GetMapping("/logUser/{username}/{password}")
    @ResponseBody
    public User logUser(@PathVariable String username,@PathVariable String password)  {
        return userService.logUser(new UserC(username,password));

    }
}
