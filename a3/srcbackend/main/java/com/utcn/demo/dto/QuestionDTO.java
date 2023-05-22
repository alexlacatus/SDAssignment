package com.utcn.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {

    private String title;
    private String text;
    private String image;
    private String userName;
    private LocalDateTime time;
    private List<String> tags;

    public QuestionDTO(String title, String text, String image, String userName, LocalDateTime time,List<String> tags) {
        this.title = title;
        this.text = text;
        this.image = image;
        this.userName = userName;
        this.time = time;
        this.tags=tags;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
