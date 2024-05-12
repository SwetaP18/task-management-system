import { default as _axios} from 'axios';
const axios = _axios.create();
const TASK_API_BASE_URL = "http://localhost:9080/api/tasks";
const USER_API_BASE_URL = "http://localhost:9080/api/users";
const AUTH_API_BASE_URL = "http://localhost:9080/api/auth";

class TaskService {

    async userLogin(loginPayload){
      return axios.post(`${AUTH_API_BASE_URL}/login`, loginPayload, {
          headers: {
          }
        })
    }
    async userSignup(signUpPayload){
      return axios.post(`${AUTH_API_BASE_URL}/signup`, signUpPayload, {
        headers: {
        }
      })
    }
    async getUsers(page, size){
        return axios.get(`${USER_API_BASE_URL}?page=${page}&size=${size}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`
          }
        });
    }
    
    async getTaskLists(page, size){
        return axios.get(`${TASK_API_BASE_URL}?page=${page}&size=${size}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`
          }
        });
    }

    async createTask(task){
        return axios.post(TASK_API_BASE_URL, task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`
          }
        });
    }

    async getTaskById(taskId){
        return axios.get(`${TASK_API_BASE_URL}/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`
          }
        });
    }

    async updateTask(taskId, task){
        return axios.put(`${TASK_API_BASE_URL}/${taskId}`, task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`
          }
        });
    }

    async deleteTask(taskId){
        return axios.delete(`${TASK_API_BASE_URL}/${taskId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`
          }
        });
    }
}

export default new TaskService();