package com.utcn.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="tags")
public class Tag {

    @Id
    @Column(name="id")
    private Long tagId;

    @Column(name="t_name")
    private String tagName;

    @ManyToOne
    @JoinColumn(name="q_id",nullable = false)
    private Question tagQuestion;


    public Tag() {
    }

    public Tag(Long tagId, String tagName, Question tagQuestion) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.tagQuestion = tagQuestion;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public Question getTagQuestion() {
        return tagQuestion;
    }

    public void setTagQuestion(Question tagQuestion) {
        this.tagQuestion = tagQuestion;
    }
}
