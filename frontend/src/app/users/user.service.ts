import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
	//private apiUrl = 'http://13.251.235.133:8080';
	private apiUrl = 'http://localhost:8080';

  getAllUsers(): Observable<any> {
		return this.http.get(`${this.apiUrl}/users`);
  }

  searchUser(name): Observable<any> {
		return this.http.get(`${this.apiUrl}/users?name=${name}`);
  }

  getUser(id: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<any> {
		return this.http.post(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User, id: string): Observable<any> {
		return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id): Observable<any> {
		return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
