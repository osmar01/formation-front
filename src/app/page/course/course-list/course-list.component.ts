import { CourseService } from './../shared/service/course.service';
import { Course } from './../shared/model/course';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  value = "";
  dataSource;

  constructor(private courseService: CourseService) { }


  ngOnInit(): void {
    this.courseService.getAll().subscribe(
      data => {
        this.courses = data;
        console.log(data);
        
      },
      err => {
        console.log(err);
        
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clear() {
    this.value = "";
    this.dataSource.filter = "";
  }

}
