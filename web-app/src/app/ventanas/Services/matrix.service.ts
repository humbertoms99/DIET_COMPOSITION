import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from 'src/constantes';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor(private http: HttpClient) { }


  minmaxSolve() {
    const endpoint = Constantes.MIN_MAX_GLPSOL;

    // var headers =  new HttpHeaders().set('Authorization','Bearer ' + sessionStorage.getItem('token'));

    return this.http.get<any>(endpoint);
  }

  test2() {
    const endpoint = Constantes.TEST2;

    return this.http.get<any>(endpoint);
  }

  test3() {
    const endpoint = Constantes.TEST3;

    return this.http.get<any>(endpoint);
  }

  newFile() {

  }

  editFile(matrix: any, projection: any, iMixture: number) {
    const endpoint = Constantes.EDIT_FILE;

    // var headers =  new HttpHeaders().set('Authorization','Bearer ' + sessionStorage.getItem('token'));
    console.log(matrix);
    
    var body = {
      matrix: matrix,
      projection: projection,
      iMixture
    }

    return this.http.post<any>(endpoint, body);
  }

  downloadFile(solType: string, mixture: number, source: number) {
    const endpoint = Constantes.DOWNLOAD_FILE;

    // var body = {
    //   solType,
    //   mixture,
    //   source
    // }


    let params = new HttpParams();
    params = params.append("solType",solType);
    params = params.append("mixture",mixture);
    params = params.append("source",source);

    const httpOptions =  new HttpHeaders({ 'Content-Type':  'application/json' }) ;


    
    return this.http.get<any>(endpoint, {observe: 'response',  headers: httpOptions, params}); //'observe': response,
  }

  getTextsFiles(mezclas: number, fuentes: number) {
    const endpoint = Constantes.GET_TEXT_FILES;

    let params = new HttpParams();
    params = params.append("mezclas",mezclas);
    params = params.append("fuentes",fuentes);

    return this.http.get<any>(endpoint, {params});
  }

  deleteFiles() {
    const endpoint = Constantes.DELETE_FILES;

    return this.http.delete<any>(endpoint);
  }
  
}
