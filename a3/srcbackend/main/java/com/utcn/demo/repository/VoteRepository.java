package com.utcn.demo.repository;

import com.utcn.demo.entity.User;
import com.utcn.demo.entity.Vote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends CrudRepository<Vote, Long> {
}
