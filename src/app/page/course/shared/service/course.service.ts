import { environment } from './../../../../../environments/environment';
import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  private BASE_ENDPOINT = environment.restApiServer;
  private ENDPOINT_PATH = "/course";

  insert(course: Course): Observable<Course> {
    const url = this.BASE_ENDPOINT + this.ENDPOINT_PATH;

    return this.http.post<Course>(url, course);
  }

  getAll(): Observable<Course[]> {
    const url = this.BASE_ENDPOINT + this.ENDPOINT_PATH;

    return this.http.get<Course[]>(url);
  }

  getById(idCourse: number): Observable<Course> {
    const url = this.BASE_ENDPOINT + this.ENDPOINT_PATH +'/'+ idCourse;

    return this.http.get<Course>(url);
  }

  update(idCourse, course: Course): Observable<Course> {
    const url = this.BASE_ENDPOINT + this.ENDPOINT_PATH +'/'+ idCourse;

    return this.http.put<Course>(url, course);
  }

  delete(idCourse: number): Observable<Course> {
    const url = this.BASE_ENDPOINT + this.ENDPOINT_PATH + idCourse;

    return this.http.delete<Course>(url);
  }

}
