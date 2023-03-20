package com.utcn.demo.dto;

public class TagDTO {

    private String tagName;
    private String tagQuestion;

    public TagDTO(String tagName, String tagQuestion) {
        this.tagName = tagName;
        this.tagQuestion = tagQuestion;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getTagQuestion() {
        return tagQuestion;
    }

    public void setTagQuestion(String tagQuestion) {
        this.tagQuestion = tagQuestion;
    }
}
