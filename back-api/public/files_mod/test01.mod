var x1 >=0; # Variable definition
var x2 >=0; # Variable definition
var x3 >=0; # Variable definition
maximize z: x1; # Objective function
subject to con1: x1 + 4*x2 + 8*x3 = 1.8; #Constraint 1
subject to con2: 2*x1 + 3*x2 + 4*x3 = 3.6; #Constraint 2
end;