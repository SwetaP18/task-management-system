package com.taskmanager.authapi.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.taskmanager.authapi.exceptions.ResourceNotFoundException;
import com.taskmanager.authapi.models.Task;
import com.taskmanager.authapi.repository.TaskRepository;
import com.taskmanager.authapi.dtos.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;


@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	// get all tasks
	public ResponseEntity<PageResponse<Task>> getAllTasks(int page, int size) {
		Page<Task> taskPage = taskRepository.findAll(PageRequest.of(page, size));
		PageResponse<Task> pageResponse = new PageResponse<>(taskPage.getContent(), taskPage.getTotalPages(), taskPage.getTotalElements());
		return ResponseEntity.ok(pageResponse);
	}

	/* Create a new Task */
	public ResponseEntity<Task> createTask(Task task) {
		task.setCreatedAt(LocalDateTime.now());
		task.setUpdatedAt(LocalDateTime.now());
		task.setStatus("To-Do");
		Task createdTask = taskRepository.save(task);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
	}
	
	// get task by id rest api
	public ResponseEntity<Task> getTaskById(Long id) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
		return ResponseEntity.ok(task);
	}
	
	// update task rest api
	public ResponseEntity<Task> updateTask(Long id, Task taskDetails){
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
		
		task.setTitle(taskDetails.getTitle());
		task.setDescription(taskDetails.getDescription());
		task.setStatus(taskDetails.getStatus());
		task.setAssignedTo(taskDetails.getAssignedTo());
		
		Task updatedTask = taskRepository.save(task);
		return ResponseEntity.ok(updatedTask);
	}
	
	// delete task rest api
	public ResponseEntity<Map<String, Boolean>> deleteTask(Long id){
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
		
		taskRepository.delete(task);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
