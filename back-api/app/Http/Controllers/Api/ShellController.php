<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class ShellController extends Controller
{
    public function test(Request $request)
    {        
        //partimos siempre carpeta public 
        shell_exec('glpsol -m files_mod/test01.mod -o files_sol/test01.sol');
    }
    
    public function nwFile() {
        $path = public_path('storage') . '/app/public/files_mod';
        
        Storage::put('file.mod', '');
    }
    
    public function editFile(Request $request) {
        $countvar = count($request->matrix[0]); 
        
        // Maximize
        for ( $ite = 1 ; $ite <= $countvar; $ite++) {
            Storage::put('file_max'.$ite.'.mod', '');
            $data = "";        
            for( $i = 0; $i < $countvar; $i++) {
                $data = $data . "var x" . ($i+1) . " >=0; # Variable definition\n";
            }
            $data = $data . "maximize z: x".$ite."; # Objective function\n";
            $con = 1;
            foreach ($request->matrix as $plants) {
                $dataprim = "subject to con" . $con .": ";
                for( $j = 0; $j < $countvar; $j++){
                    if ($j+1 === $countvar) {
                        $dataprim = $dataprim . $plants[$j] . "*x" . ($j+1) . " = " . $request->projection[$con-1] . "; # Constraint " . $con . "\n";
                    } else {
                        $dataprim = $dataprim . $plants[$j] . "*x" . ($j+1). " + ";
                    }
                }
                $con++;
                $data = $data . $dataprim;
            }
            $data = $data . "end;\n";
            $file=fopen('../storage/app/file_max'.$ite.'.mod','w');
            fwrite($file,$data);
            fclose($file);

            shell_exec('glpsol -m ../storage/app/file_max'.$ite.'.mod -o files_sol/file_max'.$ite.'.sol');
        }

        // Minimize
        for ( $ite = 1 ; $ite <= $countvar; $ite++) {
            Storage::put('file_min'.$ite.'.mod', '');
            $data = "";        
            for( $i = 0; $i < $countvar; $i++) {
                $data = $data . "var x" . ($i+1) . " >=0; # Variable definition\n";
            }
            $data = $data . "minimize z: x".$ite."; # Objective function\n";
            $con = 1;
            foreach ($request->matrix as $plants) {
                $dataprim = "subject to con" . $con .": ";
                for( $j = 0; $j < $countvar; $j++){
                    if ($j+1 === $countvar) {
                        $dataprim = $dataprim . $plants[$j] . "*x" . ($j+1) . " = " . $request->projection[$con-1] . "; # Constraint " . $con . "\n";
                    } else {
                        $dataprim = $dataprim . $plants[$j] . "*x" . ($j+1). " + ";
                    }
                }
                $con++;
                $data = $data . $dataprim;
            }
            $data = $data . "end;\n";
            $file=fopen('../storage/app/file_min'.$ite.'.mod','w');
            fwrite($file,$data);
            fclose($file);

            shell_exec('glpsol -m ../storage/app/file_min'.$ite.'.mod -o files_sol/file_min'.$ite.'.sol');
        }

        return response()->json([
            'data' => count($request->matrix[0])
        ]);
    }

    public function solutionSystem(Request $request) {

    }
    
    public function nonSquares() {
        
        // import { fcnnlsVector } from 'ml-fcnnls';
        // Example with single RHS and same X
        // Should be giving a vector with the element of the first column of K in the previous example, since y is the first column of Y
       
        $X = [[1, 1, 2], [10, 11, -9], [-1, 0, 0], [-5, 6, -7]];
    
        $y = [-1, 11, 0, 1];
    
        $k = fcnnlsVector($X, $y);

    }
    
    
}
