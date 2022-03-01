
/* Ejercicio 1 */


let numero = parseInt(prompt("Ingrese un numero"));

for(let i =0; i <= 10; i++) alert(numero++);




/* Ejercicio 2 */


let texto = prompt("Ingrese un texto");
alert(texto);

let sumatexto = texto;

while(texto != "ESC")
{
    texto= prompt("Ingrese un texto");
    
    sumatexto = sumatexto + texto;

    if(texto != "ESC") alert(sumatexto);
      
}


/*Ejercicio 3 */


numero = parseInt(prompt("Ingrese un numero"));
/* USANDO DO WHILE

let c = 0;
do{
    alert("HOLA");
    c++;
}while(c != numero)
*/

/* USANDO WHILE 

let c = 0;
while(c != numero)
{
    alert("HOLA");
    c++;
}

*/

/* USANDO FOR */

for(let i = 1; i <= numero; i++) alert("HOLA");
    