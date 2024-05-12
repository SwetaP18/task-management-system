package com.taskmanager.authapi.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import com.taskmanager.authapi.exceptions.ResourceNotFoundException;
import com.taskmanager.authapi.models.Task;
import com.taskmanager.authapi.services.TaskService;
import org.springframework.data.domain.Page;
import com.taskmanager.authapi.dtos.PageResponse;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

	@Autowired
	private TaskService taskService;
	
	// get all tasks
	@GetMapping("")
	public ResponseEntity<PageResponse<Task>> getAllTasks(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size){
		return taskService.getAllTasks(page, size);
	}		
	
	// create task rest api
	@PostMapping("")
	public ResponseEntity<Task> createTask(@RequestBody Task task) {

		return taskService.createTask(task);
	}
	
	// get task by id rest api
	@GetMapping("/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
		return taskService.getTaskById(id);
	}
	
	// update task rest api
	
	@PutMapping("/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails){
		return taskService.updateTask(id, taskDetails);
	}
	
	// delete task rest api
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id){
		return taskService.deleteTask(id);
	}
	
	
}
