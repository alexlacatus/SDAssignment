package com.utcn.demo.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.utcn.demo.helper.LocalDateTimeDeserializer;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name="content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long contentId;
//manytoone
    @ManyToOne
    @JoinColumn(name= "u_id")
    private User contentUser;

    @Column(name="c_text")
    private String contentText;

    @Column(name="c_date_time")
    //@JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime contentDateTime;

    @Column(name="picture")
    private String contentPicture;

    public Content() {
    }

    public Content( User contentUser, String contentText, LocalDateTime contentDateTime, String contentPicture) {

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Content content = (Content) o;
        return Objects.equals(getContentUser(), content.getContentUser()) && Objects.equals(getContentText(), content.getContentText()) && Objects.equals(getContentDateTime(), content.getContentDateTime()) && Objects.equals(getContentPicture(), content.getContentPicture());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getContentUser(), getContentText(), getContentDateTime(), getContentPicture());
    }
}
