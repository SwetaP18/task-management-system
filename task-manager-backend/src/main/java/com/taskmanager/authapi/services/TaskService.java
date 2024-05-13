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

/**
 * 
 * @author Sweta Pramanik
 *
 */

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	// get all tasks
	public ResponseEntity<PageResponse<Task>> getAllTasks(int page, int size) {
		try {
			Page<Task> taskPage = taskRepository.findAll(PageRequest.of(page, size));
			PageResponse<Task> pageResponse = new PageResponse<>(taskPage.getContent(), taskPage.getTotalPages(), taskPage.getTotalElements());
			return ResponseEntity.ok(pageResponse);
		} catch (Exception e) {
			// Handling the exception and return an error response
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/* Create a new Task */
	public ResponseEntity<Task> createTask(Task task) {
		try {
			// Validate if all required fields are present
			if (task.getTitle() == null || task.getDescription() == null || task.getAssignedTo() == null) {
				return ResponseEntity.badRequest().build(); // Returning 400 Bad Request if any required field is missing
			}
			task.setCreatedAt(LocalDateTime.now());
			task.setUpdatedAt(LocalDateTime.now());
			task.setStatus("To-Do");
			Task createdTask = taskRepository.save(task);
			return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
		} catch (Exception e) {
			// Handling the exception and return an error response
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// get task by id rest api
	public ResponseEntity<Task> getTaskById(Long id) {
		try {
			Task task = taskRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
			return ResponseEntity.ok(task);
		} catch (ResourceNotFoundException e) {
			// Handling the resource not found exception
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			// Handling other exceptions and return an error response
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	// update task rest api
	public ResponseEntity<Task> updateTask(Long id, Task taskDetails){
		try {
			Task task = taskRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));

			// Checking if any of the fields in taskDetails is null or empty
			if (taskDetails.getTitle() == null || taskDetails.getDescription() == null || taskDetails.getAssignedTo() == null) {
				return ResponseEntity.badRequest().build();
			}

			// Update the task fields
			task.setTitle(taskDetails.getTitle());
			task.setDescription(taskDetails.getDescription());
			task.setStatus(taskDetails.getStatus());
			task.setAssignedTo(taskDetails.getAssignedTo());

			// Save the updated task
			Task updatedTask = taskRepository.save(task);
			return ResponseEntity.ok(updatedTask);
		} catch (ResourceNotFoundException e) {
			// Handling the resource not found exception
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			// Handling other exceptions and return an error response
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}
	
	// delete task rest api
	public ResponseEntity<Map<String, Boolean>> deleteTask(Long id){
		try {
			Task task = taskRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Task not exist with id :" + id));
			
			taskRepository.delete(task);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		} catch (ResourceNotFoundException e) {
			// Handling the resource not found exception
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			// Handling other exceptions and return an error response
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	
}
