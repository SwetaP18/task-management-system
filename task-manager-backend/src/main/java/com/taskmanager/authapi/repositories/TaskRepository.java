package com.taskmanager.authapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.taskmanager.authapi.models.Task;
import com.taskmanager.authapi.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
    boolean existsByTitleAndCreatedBy(String title, User user);
    Page<Task> findByCreatedBy(User user, Pageable pageable);
}
