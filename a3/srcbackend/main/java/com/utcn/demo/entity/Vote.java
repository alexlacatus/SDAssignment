package com.utcn.demo.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="votes")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Vote( User voteUser, boolean voteVote, Content voteContent) {

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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vote vote = (Vote) o;
        return isVoteVote() == vote.isVoteVote() && Objects.equals(getVoteUser(), vote.getVoteUser()) && Objects.equals(getVoteContent(), vote.getVoteContent());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getVoteUser(), isVoteVote(), getVoteContent());
    }
}
