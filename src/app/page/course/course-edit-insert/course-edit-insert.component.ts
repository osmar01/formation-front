import { DateTimeFormatPipe } from './../../../helpers/pipe/date.pipe';
import { CategoryService } from './../../category/shared/category.service';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericValidator } from '../../../helpers/validateDate';
import { Category } from '../../category/shared/category';
import { Course } from '../shared/model/course';
import { CourseService } from '../shared/service/course.service';

@Component({
  selector: 'app-course-edit-insert',
  templateUrl: './course-edit-insert.component.html',
  styleUrls: ['./course-edit-insert.component.scss']
})
export class CourseEditInsertComponent implements OnInit {

  form: FormGroup;
  color: ThemePalette = 'primary';
  minDateSelect = new Date();
  minDate = new Date();
  
  idCourse
  listCategorys: Category[] = [];
  category: Category;
  course: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private courseService: CourseService,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.idCourse;
      this.idCourse = id;
      if (id && id > 0) {
        this.courseService.getById(id).subscribe(
          (data: Course) => {
          this.course = data;
          this.listCategorys.push(this.course.category);
          this.category = this.course.category;
          this.setValues();
         
          console.log(this.category);
        });
      } else {
        this.categoryService.getAll().subscribe(
          data => {
            this.listCategorys = data;    
          },
          error => {
    
          }
        );
      }
    });

    
  }

  insert() {
    this.courseService.insert(this.course).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('Curso cadastrado com sucesso', 'OK', {
          duration: 4000
        });
        setTimeout(() => {
          this.router.navigate(['/home/'], { relativeTo: this.route });
        }, 4100);

      },
      error => {
        console.log(error);
        this.snackBar.open("error", 'OK', {
          duration: 2000
        });

      }
    );
  }

  update() {
    this.courseService.update(this.idCourse, this.course).subscribe(
      data => {
        this.snackBar.open('Curso atualizado com sucesso', 'OK', {
          duration: 4000
        });
        setTimeout(() => {
          this.router.navigate(['/home/'], { relativeTo: this.route });
        }, 4100);
      },
      error => {
        console.log(error);
        this.snackBar.open('Erro', 'OK', {
          duration: 2000
        });
      }
    );
  }

  save() {
    if (this.form.valid) {
      this.setCourse();
      if (this.idCourse > 0) {
        this.update();
      } else {
        this.insert();
      }
    } else {
      this.snackBar.open('Preencha os campos obrigatórios', 'OK', {
        duration: 6000
      });
    }
  }

  delete(): void {
    
  }

  setCourse(): void {
    this.course = new Course();
    this.course.description = this.form.get('description').value;
    this.course.qtd = this.form.get('qtdeStudent').value;
    
    const pipeDate = new DateTimeFormatPipe(this.locale);

    this.course.dateInit = pipeDate.transform(this.form.get('dateInitial').value);
    this.course.dateFinal = pipeDate.transform(this.form.get('dateFinal').value);
    this.course.category = this.category;
    console.log(this.course);
    
  }

  setValues(): void {
    this.form.patchValue({
      selectCategory: this.category,
      description: this.course.description,
      dateInitial: this.course.dateInit,
      dateFinal: this.course.dateFinal,
      qtdeStudent: this.course.qtd
    });

  }

  createForm() {
    this.form = new FormGroup({
      selectCategory: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dateInitial: new FormControl('', Validators.required),
      dateFinal: new FormControl('', [GenericValidator('dateInitial'), Validators.required]),
      qtdeStudent: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')])
    });
  }
  changeState() {
    this.category = this.form.get('selectCategory').value;
  }
  

}
