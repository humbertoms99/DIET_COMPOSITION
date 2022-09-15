import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  
  lang!: string;

  menu: MenuItem[] = [
    {
      texto: 'Problema',
      ruta: '/ventanas/matrix'
    },
    {
      texto: 'Video',
      ruta: '/ventanas/video'
    }
  ];

  // showActions: boolean = false;

  constructor( 
    private router: Router
  ){
  }

  //NUEVO
  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'es';
    console.log("url", document.location.href)
    if (document.location.href.includes('video')){
      if (document.getElementById('video') !== null ) {
        document.getElementById('home')!.className = document.getElementById('home')!.className.replace(/ active/gi, "");
        document.getElementById('home')?.className.replace(" active", "");
        document.getElementById('video')!.className += " active";
        document.getElementById('video')!.style.display = "block";
      }
    }
  }

  changeLang(lang: any) {
    localStorage.setItem('lang',lang.value);
    console.log("url2", document.location.href)
    window.location.href = 'https://mixingmodels.netlify.app/';
  }

  changeMenu(id: string) {

    // console.log("-",document.getElementById("home")?.className,"-") 

    if (id === "home") {
      if (document.getElementById(id) !== null ) {
        document.getElementById('video')!.className = document.getElementById('video')!.className.replace(/ active/gi, "");
        document.getElementById(id)!.className += " active";
        document.getElementById(id)!.style.display = "block";
      }
    } else if (id === "video" ) {
      if (document.getElementById(id) !== null ) {
        document.getElementById('home')!.className = document.getElementById('home')!.className.replace(/ active/gi, "");
        document.getElementById('home')?.className.replace(" active", "");
        document.getElementById(id)!.className += " active";
        document.getElementById(id)!.style.display = "block";
      }
    }
  }
}
