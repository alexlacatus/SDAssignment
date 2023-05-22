package com.utcn.demo.entity;

import jakarta.persistence.Entity;

import java.util.ArrayList;
import java.util.List;


public class QuestionWrapper {
    private Question question;
    private List<Tag> tags;

    public QuestionWrapper() {
    }

    public QuestionWrapper(Question question, List<Tag> tags) {
        this.question = question;
        this.tags = tags;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
