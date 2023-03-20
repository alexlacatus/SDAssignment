package com.utcn.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="votes")
public class Vote {
    @Id
    @Column(name="id")
    private Long voteId;

    @ManyToOne
    @JoinColumn(name="u_id",nullable = false)
    private User voteUser;

    @Column(name="vote")
    private boolean voteVote;

    @ManyToOne
    @JoinColumn(name="c_id",nullable = false)
    private Content voteContent;

    public Vote() {
    }

    public Vote(Long voteId, User voteUser, boolean voteVote, Content voteContent) {
        this.voteId = voteId;
        this.voteUser = voteUser;
        this.voteVote = voteVote;
        this.voteContent = voteContent;
    }

    public Long getVoteId() {
        return voteId;
    }

    public void setVoteId(Long voteId) {
        this.voteId = voteId;
    }

    public User getVoteUser() {
        return voteUser;
    }

    public void setVoteUser(User voteUser) {
        this.voteUser = voteUser;
    }

    public boolean isVoteVote() {
        return voteVote;
    }

    public void setVoteVote(boolean voteVote) {
        this.voteVote = voteVote;
    }

    public Content getVoteContent() {
        return voteContent;
    }

    public void setVoteContent(Content voteContent) {
        this.voteContent = voteContent;
    }
}
