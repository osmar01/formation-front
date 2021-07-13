import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  gotoCourse(){
    this.router.navigate(['/course/new'], { relativeTo: this.route });
    
  }
  gotoCategory(){
    this.router.navigate(['/category'], { relativeTo: this.route });
    
  }

}
