package com.utcn.demo.dto;

public class AnswerDTO {
    private String questionText;
    private String text;

    public AnswerDTO(String questionText, String text) {
        this.questionText = questionText;
        this.text = text;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
