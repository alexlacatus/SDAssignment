package com.utcn.demo.dto;

import java.time.LocalDateTime;

public class ContentDTO {
    private String text;
    private String picture;
    private LocalDateTime date;

    public ContentDTO(String text, String picture, LocalDateTime date) {
        this.text = text;
        this.picture = picture;
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
