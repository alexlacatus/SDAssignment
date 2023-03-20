package com.utcn.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="content")
public class Content {
    @Id
    @Column(name="id")
    private Long contentId;

    @OneToOne
    @JoinColumn(name= "u_id",nullable = false)
    private User contentUser;

    @Column(name="c_text")
    private String contentText;

    @Column(name="c_date_time")
    private LocalDateTime contentDateTime;

    @Column(name="picture")
    private String contentPicture;

    public Content() {
    }

    public Content(Long contentId, User contentUser, String contentText, LocalDateTime contentDateTime, String contentPicture) {
        this.contentId = contentId;
        this.contentUser = contentUser;
        this.contentText = contentText;
        this.contentDateTime = contentDateTime;
        this.contentPicture = contentPicture;
    }

    public Long getContentId() {
        return contentId;
    }

    public void setContentId(Long contentId) {
        this.contentId = contentId;
    }

    public User getContentUser() {
        return contentUser;
    }

    public void setContentUser(User contentUser) {
        this.contentUser = contentUser;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public LocalDateTime getContentDateTime() {
        return contentDateTime;
    }

    public void setContentDateTime(LocalDateTime contentDateTime) {
        this.contentDateTime = contentDateTime;
    }

    public String getContentPicture() {
        return contentPicture;
    }

    public void setContentPicture(String contentPicture) {
        this.contentPicture = contentPicture;
    }
}
