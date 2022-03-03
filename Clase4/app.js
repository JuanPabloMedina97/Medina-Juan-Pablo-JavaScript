/*Calcular costo total de productos y/o servicios seleccionados por el usuario */
let servicios = ()=>{
    alert("1- Luz: $1600 \n 2- Gas: $600 \n 3- Agua: $120 \n 4- Internet: $1500 \n 5- Tv: $2800 \n 0- Calcular monto total");
}

let pagosServ=() =>{

let prodServ = parseInt(prompt("Ingrese la cantidad de servicios que desea pagar. (Maximo 5)"));
let precioTotal = 0;
let c = prodServ;

if(prodServ <= 5){

    for(let i = 1; i <= prodServ; i++){

        servicios();
        let servicio = parseInt(prompt("Selecione el servicio a pagar \n" + "Servicios restantes: " + c--));

        switch (servicio){
            case 1:
                let luz = 3200;
                precioTotal = luz + precioTotal;
                break;
            case 2:
                let gas = 800;
                precioTotal = gas + precioTotal;
                break;
            case 3:
                let agua = 220;
                precioTotal = agua + precioTotal;
                break;
            case 4:
                let internet = 1500;
                precioTotal = internet + precioTotal;
                break;
            case 5:
                let tv = 3800;
                precioTotal = tv + precioTotal;
                break;
            case 0:
                i = prodServ;
                break;
            default:
                alert("Opcion incorrecta, intente de nuevo");
                i--;
                break;
        }/* Cierre switch */
        

    }/*Cierre for */

}else alert("Opcion incorrecta.")


alert("El precio total a pagar es: $" + precioTotal);

}/*Cierre funcion Pago Servicios */

pagosServ();