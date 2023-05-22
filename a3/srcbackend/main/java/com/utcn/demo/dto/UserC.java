package com.utcn.demo.dto;

public class UserC {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserC(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
