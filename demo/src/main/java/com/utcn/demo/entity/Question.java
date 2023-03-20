package com.utcn.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @Column(name="id")
    private Long questionId;

    @Column(name="title")
    private String title;


    @OneToOne
    @JoinColumn(name="c_id",nullable = false)
    private Content questionContent;

    public Question(){

    }

    public Question(Long questionId, String title, Content content) {
        this.questionId = questionId;
        this.title = title;
        this.questionContent = content;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Content getQuestionContent() {
        return questionContent;
    }

    public void setQuestionContent(Content content) {
        this.questionContent = content;
    }
}
