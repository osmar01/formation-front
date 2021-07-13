import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseModule } from './page/course/course.module';
import { CategoryModule } from './page/category/category.module';
import { HomeModule } from './page/home/home.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CourseModule,
    CategoryModule,
    HomeModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
