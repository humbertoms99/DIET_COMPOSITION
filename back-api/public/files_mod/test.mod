var x1 >=0; # Variable definition
var x2 >=0; # Variable definition
var x3 >=0; # Variable definition
var x4 >=0; # Variable definition
maximize z: 5*x1 + 6*x2 + 2*x3 + 4*x4; # Objective function
subject to con1: 3*x1 + 2*x2 + x3 + 5*x4 <= 80; # Constraint 1
subject to con2: 2*x1 + x2 + 2*x3 + 4*x4 <= 45; # Constraint 2
subject to con3: 3*x1 - 3*x2 + 4*x3 + 5*x4 >= 80; # Constraint 3
end;