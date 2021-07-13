import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, withLatestFrom, filter } from "rxjs/operators";


import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidenav-toolbar',
  templateUrl: './sidenav-toolbar.component.html',
  styleUrls: ['./sidenav-toolbar.component.scss']
})
export class SidenavToolbarComponent implements OnInit {

  @ViewChild("drawer") drawer: MatSidenav;


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset).pipe(map((result) => result.matches));

  isWeb$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Web).pipe(map((result) => result.matches));

  constructor(
    private route: Router,
    private breakpointObserver: BreakpointObserver,

  ) {

    this.route.events.pipe(withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd))
      .subscribe((_) => this.drawer.close());

    this.route.events.pipe(withLatestFrom(this.isWeb$),
      filter(([a, b]) => b && a instanceof NavigationEnd))
      .subscribe((_) => this.drawer.close());
  }

  ngOnInit(): void {
  }

}
