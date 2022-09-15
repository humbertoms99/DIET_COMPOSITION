import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  lang!: string;
  constructor() { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'es';
  }

  changeLang(lang: any) {
    localStorage.setItem('lang',lang.value);
    // window.location.reload();
    window.location.href = 'https://mixingmodels.netlify.app/';
  }
}
