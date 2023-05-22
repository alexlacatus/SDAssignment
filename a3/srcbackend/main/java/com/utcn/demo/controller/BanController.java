package com.utcn.demo.controller;

import com.utcn.demo.entity.Ban;
import com.utcn.demo.service.BanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/bans")
public class BanController {

    @Autowired
    BanService banService;


    @GetMapping("/isBanned/{u_id}")
    @ResponseBody
    public boolean isBanned(@PathVariable Long u_id){
        return banService.isBanned(u_id);
    }

    @PostMapping("/banUser")
    @ResponseBody
    public Ban banUser(@RequestBody Long u_id){
        return banService.banUser(u_id);
    }

    @PostMapping("/unbanUser")
    @ResponseBody
    public Ban unbanUser(@RequestBody Long u_id){
        return banService.unbanUser(u_id);
    }

}
