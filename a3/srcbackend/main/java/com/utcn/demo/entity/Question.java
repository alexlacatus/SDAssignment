package com.utcn.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long questionId;

    @Column(name="title")
    private String title;


    @OneToOne
    @JoinColumn(name="c_id")
    private Content questionContent;

    public Question(){

    }

    public Question( String title, Content content) {

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
