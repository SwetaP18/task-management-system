package com.taskmanager.authapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.authapi.models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
    boolean existsByTitle(String title);
}
