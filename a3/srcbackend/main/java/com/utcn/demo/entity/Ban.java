package com.utcn.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name="bans")
public class Ban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long banId;

    @OneToOne
    @JoinColumn(name="u_id",nullable = false)
    private User banUser;

    public Ban(){

    }

    public Ban( User banUser) {
        this.banId = banId;
        this.banUser = banUser;
    }

    public Long getBanId() {
        return banId;
    }

    public void setBanId(Long banId) {
        this.banId = banId;
    }

    public User getBanUser() {
        return banUser;
    }

    public void setBanUser(User banUser) {
        this.banUser = banUser;
    }
}
