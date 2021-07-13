import { CourseListComponent } from './page/course/course-list/course-list.component';
import { PrincipalComponent } from './page/home/principal/principal.component';
import { CourseEditInsertComponent } from './page/course/course-edit-insert/course-edit-insert.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component:  PrincipalComponent},
  { path: "course", component:  CourseEditInsertComponent},
  { path: "course-list", component:  CourseListComponent},
  { path: "course/:idCourse", component:  CourseEditInsertComponent},
  // { path: "**", component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
