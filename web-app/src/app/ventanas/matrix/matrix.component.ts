import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatrixService } from '../Services/matrix.service';
import { map } from 'rxjs/operators'

import { fcnnlsVector } from 'ml-fcnnls';
import { Matrix } from 'ml-matrix';
import { HttpHeaders } from '@angular/common/http';

import { loadModule, Model } from 'glpk-ts/dist';

import { ViewChild } from '@angular/core';




@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable!: ElementRef;

  headers: string[] = [];
  nuevoArray: any[] =  [];
  @Input() plantas: string[] = [];
  samples: string[] = [];
  valor: number = 0;
  
  temporal: string[] = [];
  arraysTexts: any = [];

  //texto archivos files función getTextFiles pero en front
  filesmodsmax: any[] = [];
  filesmodsmin: any[] = [];

  closestFeasibleMixture: string[] = [];

  //numero de filas y columnas de la matriz
  rows: number = 0;
  cols: number = 0;

  Matrix = this.fb.group({
    plants: this.fb.array([])
  });

  Results = this.fb.group({
    faecal: this.fb.array([])
  });
  
  solutionMax: any[] = [];
  solutionMin: any[] = [];

  A: any = [];

  lang!: string;

  miFormulario: FormGroup = this.fb.group({
    alcanos: [0, [Validators.required, Validators.min(1)]],
    plantas: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(private fb: FormBuilder,
              private matrixService: MatrixService) { }
  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'es';

    // this.matrixService.deleteFiles().subscribe(); // COMENTADO

  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  get plantsFormGroups() {
    return this.Matrix.get('plants') as FormArray;
  } 

  alcanesFormGroups(index: number) {
    return this.plantsFormGroups.at(index)!.get('alcanes') as FormArray;
  }
  
  get faecalFormGroups() {
    return this.Results.get('faecal') as FormArray;
  } 

  alcanesFecalFormGroups(index: number) {
    return this.faecalFormGroups.at(index)!.get('alcanes') as FormArray;
  }

  reset(reset_file: boolean): void {
    if (reset_file) {
      this.myInputVariable.nativeElement.value = "";
    }

    this.headers = [];
    this.nuevoArray =  [];
    this.plantas= [];
    this.samples = [];

    this.A = []; //Matriz Fuentes
    this.temporal = [];
    this.arraysTexts = [];
    this.filesmodsmax = [];
    this.filesmodsmin = [];
    this.closestFeasibleMixture = []; //Strings (1 4) -> (1.8 3.6)
    
    
    this.Matrix = this.fb.group({
      plants: this.fb.array([])
    });
    
    this.Results = this.fb.group({
      faecal: this.fb.array([])
    });
    
    this.solutionMax = [];
    this.solutionMin = [];
  }

  resetArrays() {
    this.headers = [];
    this.nuevoArray = [];
    this.plantas = [];
  }

  

  crearMatrix()
  {
    
    var { alcanos, plantas } = this.miFormulario.value;
    
    this.cols = alcanos;
    this.rows = plantas;

    this.reset(true);

    //Crear headers
    for (let i = 0; i<=this.cols; i++){
      if(i === 0){
        this.headers.push("")
      }else{
        this.headers.push(i+"º marcador");
      }
    }

    const plants = this.plantsFormGroups;

    for (let i = 0; i < this.rows; i++) {
      plants.push(this.fb.group({
        alcanes: this.fb.array([

        ])
      })
      );

      const alcanes = plants.controls[plants.length -1].get('alcanes') as FormArray;

      for ( let j = 0; j < this.cols; j++) {
        alcanes.push(this.fb.group({
          value: [0,]
        })
        );
      }
    }


    ///// MUESTRAS FECALES   /////////

    const faecal = this.faecalFormGroups;

    faecal.push(this.fb.group({
      alcanes: this.fb.array([

      ])
    }));

    const alcanes = faecal.controls[faecal.length -1].get('alcanes') as FormArray;

    for ( let j = 0; j < this.cols; j++) {
      alcanes.push(this.fb.group({
        value: [0,]
      })
      );
    }

    if (this.lang === 'es') {
      this.samples.push("Mezcla- "+0);
    } else {
      this.samples.push("Mixture- "+0);
    }


    
    this.nuevoArray = new Array(this.rows);
    
    for (let i = 0; i < this.rows; i++) {
      this.nuevoArray[i] = new Array(this.cols).fill(0); //.fill("")
    }   

    for (let i = 1; i<= this.rows; i++){
      if (this.lang === 'es') {
        this.plantas.push("Fuente- "+i);
      } else {
        this.plantas.push("Source- "+i);
      }
    } 
  }

  anadir(fila: number, columna: number)
  {
    this.nuevoArray[fila][columna] = this.valor;
  }

  addFila()
  {  
    this.nuevoArray[this.cols] = new Array(this.rows);
    this.cols = this.cols + 1;
    this.plantas.push("Planta- "+this.cols);
  }

  addColumna()
  {
    for (let i = 0; i < this.cols; i++) {
      this.nuevoArray[i].push("");
    }   
    this.headers.push(this.rows+"º marcador"); 
    this.rows = this.rows + 1;

  }
  aqui(valor: any, i: number, j:number) {
    console.log("QUIIIIII", valor, i, j);
    console.log(this.nuevoArray[i][j])
    this.nuevoArray[i][j] = valor;
  }

  //podemos todar los valores del formulario con const { alcanos, plantas } = miFormulario.value
  test() {
    const { loadModule, Model } = require('glpk-ts')
    let sale: any[] | undefined;
    var bool: boolean = false;
    loadModule().then(() => {
      // const model = <Model>this.test.model
      const model = new Model()
      model.sense = 'max'
      const x = model.addVars([
        { lb: 0, obj: 1 },
        { lb: 0, obj: 2 },
      ])
      const s = model.addConstrs([
        {
          ub: 2,
          coeffs: [
            [x[0], 1],
            [x[1], 2],
          ],
        },
        {
          ub: 2,
          coeffs: [
            [x[0], 2],
            [x[1], 1],
          ],
        },
      ])

      model.simplex({ msgLevel: 'off' })
      console.log(model.value)
      console.log(x[0].value)
      console.log(x[1].value)

      console.log("...................segunda prueba.............................")

      const model1 = new Model()
      model1.sense = 'max'
      const [x1, x2, x3] = model1.addVars(3, { lb: 0, name: 'x' })
      x1.obj=1
      x2.obj=0
      x3.obj=0

      model1.addConstrs([
        {
          ub: 1.8,
          coeffs: [
            [x1, 1],
            [x2, 4],
            [x3, 8],
          ],
        },
        {
          ub: 3.6,
          coeffs: [
            [x1, 2],
            [x2, 3],
            [x3, 4],
          ],
        },
      ])


      model1.simplex()

      console.log(model1.solution)
      console.log(model1.value)
      console.log(x1.value)
      console.log(x2.value)
      console.log(x3.value)

      sale=[x1.value,x2.value,x3.value]
  
      console.log(model1.getTableau())

      bool= true;

    }).then(() => {

      if(sale !== undefined && bool) {
  
        console.log("sale",sale)
      } else {
        console.log(":(",sale,bool)
      }
    })
  }


  addSamples() {

    const faecal = this.faecalFormGroups;

    faecal.push(this.fb.group({
      alcanes: this.fb.array([
      ])
    }));

    const alcanes = faecal.controls[faecal.length -1].get('alcanes') as FormArray;

    for ( let j = 0; j < this.cols; j++) {
      alcanes.push(this.fb.group({
        value: [0,]
      })
      );
    }

    if (this.lang === 'es') {
      this.samples.push("Mezcla- "+1);
    } else {
      this.samples.push("Mixture- "+1);
    }

  }
 

  data() {
    // A = [1 4 8
    //   2 3 4];
  
    // F = [1 
    //   4]
    let kk: any = [];
    for (var alc = 0; alc < this.cols; alc ++) {
      var arrayTemp = []
      for (var faecal of this.Results.value['faecal']) {
        arrayTemp.push(Number(faecal['alcanes'][alc]['value']));
        //crear tantos arrays comos length tenga
  
      }
      kk.push(arrayTemp);

    }

    //Reset
    this.solutionMax = []; 
    this.solutionMin = [];
    this.A = []; 
    this.closestFeasibleMixture = [];
    this.arraysTexts = [];

    for (var alc = 0; alc < this.cols; alc ++) {
      var arrayTemp = []
      for (var plants of this.Matrix.value['plants']) {
        arrayTemp.push(Number(plants['alcanes'][alc]['value']));
        //crear tantos arrays comos length tenga
  
      }
      this.A.push(arrayTemp);

    }
    var AA = [[1, 4, 8], [2, 3, 4]];

    let X = new Matrix(this.A);

    let y: any = [];
      
    let iMixture: number = 0;
    for (var faecals of this.Results.value['faecal']) {
      iMixture++;
      for (var values of faecals['alcanes']){
        y.push(Number(values['value']));
      }
      //crear tantos arrays comos length tenga

      let k = fcnnlsVector(X, y);

      let projectiononA = this.projectionOfonA(this.A, k);

      this.comparar(y,projectiononA);

      this.editFile(this.A,projectiononA, iMixture)

      y = [];
    }
      
    console.log(this.solutionMax, this.solutionMin);
    
  }

  editFile(matrix: any, projectiononA: any, iMixture: number) {
    const { loadModule, Model } = require('glpk-ts')

    var Maximize: any[] = [];
    var Minimize: any[] = [];

    //llamar una vez por cada x1 que tengamos y que rellene el min y max

    var arrayMax: any[] = [];
    var arrayMin: any[] = [];
    
    loadModule().then(() => {

      for ( var i = 0; i < this.A[0].length; i++) {
        var stringProblemMax: string[] = [];
        const model_max = new Model()
        model_max.sense = 'max'
        const constantes_max = model_max.addVars(this.A[0].length, { lb: 0.0, name: 'x' })
        var objetiveMax: string = "";
        for ( var i2 = 0; i2 < this.A[0].length; i2++) {
          if(i === i2) {
            constantes_max[i2].obj = 1
            objetiveMax += "x"+(i2+1);
          } else {
            constantes_max[i2].obj = 0
          }
          stringProblemMax.push("var x"+(i2+1)+" >= 0; # Variable definition")
        }
        stringProblemMax.push("maximize z: "+objetiveMax+"; # Objective function")
        
        
        for (var j = 0; j < this.A.length; j++) {
          var stringSubject: string = ""; //subject to con1: 1*x1 + 4*x2 + 8*x3 = 8 # Constraint 1
          stringSubject += "subject to con"+(j+1)+": ";

          var coeficientes: any[] = []
          for ( var i2 = 0; i2 < this.A[0].length; i2++) {
            coeficientes.push([constantes_max[i2], this.A[j][i2]]);
            stringSubject += this.A[j][i2]+"*x"+(i2+1)+" ";
            if (i2 + 1 !== this.A[0].length) {
              stringSubject += "+ ";
            }
          }
          stringSubject += "= "+projectiononA[j]+"; # Constraint "+(j+1);
          stringProblemMax.push(stringSubject);

          model_max.addConstrs([
            {
              ub: projectiononA[j],
              lb: projectiononA[j],
              coeffs: coeficientes,
            },
          ])
        }

        model_max.simplex({ msgLevel: 'off' })
        stringProblemMax.push("end;")
        stringProblemMax.push("")
        // console.log(model_max.solution)
        // console.log(constantes_max[0].value)

        
        arrayMax.push(stringProblemMax);
        // console.log(model_max.toModelLP())
        // model_max.update()
        // const data = model_max.toMPS()
      
        // const m2 = Model.fromMPS(data)
        var value_max_dec = Math.abs(model_max.value); //number 2 decimals
        Maximize.push(parseFloat(value_max_dec.toString()).toFixed(2)); 
        // ---------------------------------------------------------------------------
        var stringProblemMin: string[] = [];
        const model_min = new Model({ msgLevel: 'off' })
        model_min.sense = 'min'
        var objetiveMin: string = "";
        const constantes_min = model_min.addVars(this.A[0].length, { lb: 0.0, name: 'x' })
        for ( var i2 = 0; i2 < this.A[0].length; i2++) {
          if(i === i2) {
            constantes_min[i2].obj = 1
            objetiveMin += "x"+(i2+1);
          } else {
            constantes_min[i2].obj = 0
          }
          stringProblemMin.push("var x"+(i2+1)+" >= 0; # Variable definition")
        }
        stringProblemMin.push("minimize z: "+objetiveMax+"; # Objective function")
        
        
        for (var j = 0; j < this.A.length; j++) {
          var stringSubject: string = ""; //subject to con1: 1*x1 + 4*x2 + 8*x3 = 8 # Constraint 1
          stringSubject += "subject to con"+(j+1)+": ";

          var coeficientes: any[] = []
          for ( var i2 = 0; i2 < this.A[0].length; i2++) {
            coeficientes.push([constantes_min[i2], this.A[j][i2]]);
            stringSubject += this.A[j][i2]+"*x"+(i2+1)+" ";
            if (i2 + 1 !== this.A[0].length) {
              stringSubject += "+ ";
            }
          }
          stringSubject += "= "+projectiononA[j]+"; # Constraint "+(j+1);
          stringProblemMin.push(stringSubject);
          
          model_min.addConstrs([
            {
              ub: projectiononA[j],
              lb: projectiononA[j],
              coeffs: coeficientes,
            },
          ])
        }

        model_min.simplex({ msgLevel: 'off' })
        stringProblemMin.push("end;")
        stringProblemMin.push("")
        arrayMin.push(stringProblemMin);
        var value_min_dec = Math.abs(model_min.value); //number 2 decimals
        Minimize.push(parseFloat(value_min_dec.toString()).toFixed(2)); 
      }
    }).then(() => {
      this.filesmodsmin[iMixture] = arrayMin;
      this.filesmodsmax[iMixture] = arrayMax;
      this.arraysTexts = [];
      this.arraysTexts.push({'min' : this.filesmodsmin})
      this.arraysTexts.push({'max' : this.filesmodsmax})


      this.solutionMax.push(Maximize); 
      this.solutionMin.push(Minimize);
    })

  }

  textsFiles() {
    this.matrixService.getTextsFiles(this.Results.value['faecal'].length,this.rows)
    .subscribe((resp) => {
      this.arraysTexts = resp.filesmods;
      for ( var i = 1; i <= this.Results.value['faecal'].length; i++) {
        for ( var j = 1; j <= this.rows; j++) {
          this.arraysTexts[0].min[i][j] = this.arraysTexts[0].min[i][j].split("\n"); 
          this.arraysTexts[1].max[i][j] = this.arraysTexts[1].max[i][j].split("\n"); 
        }
      }
      var test = resp.filesmods[0].min[1][1];
    });
  }

  download(solType: string, mixture: number, source: number) {
    var csvDataFinal = "";
    if(solType === "min") {
      var csvDataTest = this.arraysTexts[0].min[mixture][source];
      for (var val of csvDataTest) {
        csvDataFinal += val + "\n";
      }
    } else if (solType === "max") {
      var csvDataTest = this.arraysTexts[1].max[mixture][source];
      for (var val of csvDataTest) {
        csvDataFinal += val + "\n";
      }
    } 


    var blob = new Blob([csvDataFinal], {type: 'text/csv'});
    var url = window.URL.createObjectURL(blob);

    
    var a = document.createElement("a");
    a.href = url;
    a.download = 'M'+mixture+'_'+solType+(source+1)+'.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    window.URL.revokeObjectURL(url);  
      
  }

  comparar(y: any, projection: any) {
    for (var i = 0; i< y.length; i++) {
      let abs: number = Math.abs(Number(y[i]-projection[i]));
      abs = abs*Math.pow(10,12)
      if ( Math.round(abs) > 0){
        // this.closestFeasibleMixture
        var closestMixt: string = "";
        //(1 4) -> (1.8 3.6)

        closestMixt = "(" ;
        y.forEach(function (value: any, index: any) {
          if (index+1 === y.length) {
            closestMixt += value ;
          } else {
            closestMixt += value + " ";
          }
        }); 
        closestMixt += ") -> (" ;
        projection.forEach(function (value: any, index: any) {
          if (index+1 === projection.length) {
            closestMixt += value;
          } else {
            closestMixt += value + " ";
          }
        }); 
        closestMixt += ")";
        if (!this.closestFeasibleMixture.includes(closestMixt)) {
          this.closestFeasibleMixture.push(closestMixt);
        }
      } 
    }

  }

  projectionOfonA(A: any, k: any): any {

    let result = [];
    for (var array of A) {
      var count = 0;
      var projectionA: number = 0;
      for (var elem of array) {
        projectionA += elem*k[count];
        count ++;
      }
      result.push(projectionA.toFixed(3));
    }
    return result;
  }

  exportProblem()
  {
    if (this.lang === 'en') {
      var csvDataTest = "Tracers: ;"+this.cols +";\n"
      + "Sources: ;"+this.rows +";\n\n";
    } else {
      var csvDataTest = "Marcadores: ;"+this.cols +";\n"
      + "Fuentes: ;"+this.rows +";\n\n";
    }

    this.plantas.forEach((value, index) => {
      csvDataTest += value  +": ;";
      for (var j = 0; j< this.cols; j++) {
        csvDataTest += this.A[j][index] + ";";
      }
      csvDataTest += "\n";
    });
    csvDataTest += "\n";

    this.Results.value['faecal'].forEach((value: { [x: string]: any; }, index: any) => {
      if (this.lang === 'es') {
        csvDataTest += "Mezcla- "+ (index+1)+": ;";
      } else  {
        csvDataTest += "Mixture- "+ (index+1)+": ;";
      }
      
      for (var values of value['alcanes']){
        csvDataTest += Number(values['value'])+";";
      }
      csvDataTest += "\n";
    });



    var blob = new Blob([csvDataTest], {type: 'text/csv'});
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = 'InputData.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    window.URL.revokeObjectURL(url);  
  }

  exportSolution()
  {
    

    if (this.lang === 'en') {
      var csvDataTest = "Tracers: ;"+this.cols +";\n"
      + "Sources: ;"+this.rows +";\n\n";
    } else {
      var csvDataTest = "Marcadores: ;"+this.cols +";\n"
      + "Fuentes: ;"+this.rows +";\n\n";
    }

    

    this.plantas.forEach((value, index) => {
      csvDataTest += value  +": ;";
      for (var j = 0; j< this.cols; j++) {
        csvDataTest += this.A[j][index] + ";";
      }
      csvDataTest += "\n";
    });
    csvDataTest += "\n";

    this.Results.value['faecal'].forEach((value: { [x: string]: any; }, index: any) => {
      if (this.lang === 'es') {
        csvDataTest += "Mezcla- "+ (index+1)+": ;";        
      } else {
        csvDataTest += "Mixture- "+ (index+1)+": ;";
      }
      for (var values of value['alcanes']){
        csvDataTest += Number(values['value'])+";";
      }
      csvDataTest += "\n";
    });

    csvDataTest += "\n";
    for (var closestMixt of this.closestFeasibleMixture) {
      if (this.lang === 'es') {
        csvDataTest += "Mezcla -> proyeccion: " + closestMixt + "\n";
      } else {
        csvDataTest += "Mixture -> proyection: " + closestMixt + "\n";
      }      
    }
    csvDataTest += "\n";

    this.samples.forEach((value ,index) => {
      csvDataTest += ";"+ value +";;"; 
    });
    csvDataTest += "\n";

    csvDataTest += ";";
    for (var sample_index = 0; sample_index < this.samples.length; sample_index++) {
        csvDataTest  +=  "[Min;,Max];;"
    }
    csvDataTest += "\n";

    this.plantas.forEach((value, index) => {
      csvDataTest += value  +": ;";
      for (var j = 0; j< this.samples.length; j++) {
        console.log(index);
        csvDataTest += this.solutionMin[j][index] + ";" + this.solutionMax[j][index] + ";;";
      }
      csvDataTest += "\n";
    });
    csvDataTest += "\n";

    var blob = new Blob([csvDataTest], {type: 'text/csv'});
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = 'Solution.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    window.URL.revokeObjectURL(url); 
  }

  changeListener(files: any){
    files = files.files;
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0)!; 
         //File reader method
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
          let csv: any = reader.result;
          let allTextLines = [];
          allTextLines = csv.split(/\r|\n|\r/);
          let line0 = allTextLines[0].split(";");//Marcadores
          let line1 = allTextLines[1].split(";");//Fuentes
          this.miFormulario.setValue({alcanos: line0[1], plantas: line1[1]})
           //indice de empezar a buscar matriz
          var { alcanos, plantas } = this.miFormulario.value;
    
          this.cols = alcanos;
          this.rows = plantas;

          this.reset(false);

          //Crear headers
          for (let i = 0; i<=this.cols; i++){
            if(i === 0){
              this.headers.push("")
            }else{
              this.headers.push(i+" marcador");
            }
          }
          const plants = this.plantsFormGroups;

          for (let i = 0; i < this.rows; i++) {
            plants.push(this.fb.group({
              alcanes: this.fb.array([
              ])
            })
            );
            const alcanes = plants.controls[plants.length -1].get('alcanes') as FormArray;
            for ( let j = 0; j < this.cols; j++) {
              alcanes.push(this.fb.group({
                value: [0,]
              })
              );
            }
          }

          // ///// MEZCLAS   /////////
          const faecal = this.faecalFormGroups;

          faecal.push(this.fb.group({
            alcanes: this.fb.array([
            ])
          }));
          const alcanes = faecal.controls[faecal.length -1].get('alcanes') as FormArray;
          for ( let j = 0; j < this.cols; j++) {
            alcanes.push(this.fb.group({
              value: [0,]
            })
            );
          }

          if (this.lang === 'es') {
            this.samples.push("Mezcla- "+0);
          } else {
            this.samples.push("Mixture- "+0);
          }

          this.nuevoArray = new Array(this.rows);
          
          for (let i = 0; i < this.rows; i++) {
            this.nuevoArray[i] = new Array(this.cols).fill(0); //.fill("")
          } 
          
          let insertSource: number = 0;
          let insertMixture: number = 0;
          var source: boolean = true; //Sources cuando es true, valores mezclas valores false
          for (var index = 3; index<allTextLines.length-1; index++) {
            let linesMatrix = allTextLines[index].split(";");
            
            if (allTextLines[index] === ''){ //si encontramos linea vacia a partir de la linea 3 significa que empiezan las muestras
              source = false;
            }
            // ///// LOAD DATA ///////////////
            if (source) {
              
              this.plantas.push(linesMatrix[0].replace(':',''));
              //loop n alcanes
              for (var marcindex = 0; marcindex<this.cols; marcindex++){
                this.alcanesFormGroups(insertSource).controls[marcindex].setValue({value: linesMatrix[marcindex+1]});
              }              
              insertSource++;
            } else {
              if (allTextLines[index] !== '') {
                if (insertMixture > 0) { //primera si que esta insertada
                  this.addSamples();
                }
                for (var marcindex = 0; marcindex<this.cols; marcindex++){
                  this.alcanesFecalFormGroups(insertMixture).controls[marcindex].setValue({value: linesMatrix[marcindex+1]});
                }
                insertMixture++;
              }
              
            }            
          }
        }
    }
  }
}


