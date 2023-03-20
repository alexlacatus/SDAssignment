package com.utcn.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "answers")
public class Answer {

    @Id
    @Column(name="id")
    private Long answerId;

    @ManyToOne
    @JoinColumn(name="q_id",nullable = false)
    private Question answerQuestion;

    @OneToOne
    @JoinColumn(name="c_id",nullable = false)
    private Content answerContent;

    public Answer(){

    }

    public Answer(Long answerId, Question answerQuestion, Content answerContent) {
        this.answerId = answerId;
        this.answerQuestion = answerQuestion;
        this.answerContent = answerContent;
    }

    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

    public Question getAnswerQuestion() {
        return answerQuestion;
    }

    public void setAnswerQuestion(Question answerQuestion) {
        this.answerQuestion = answerQuestion;
    }

    public Content getAnswerContent() {
        return answerContent;
    }

    public void setAnswerContent(Content answerContent) {
        this.answerContent = answerContent;
    }
}
