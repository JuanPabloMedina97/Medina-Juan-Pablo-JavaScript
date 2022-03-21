function agregar(){


    /*Aqui sse crea el elemento li y se inserta en el hmtl interno con la clase item y valor*/
    let producto = document.createElement("li");
    producto.className = "item";
    producto.innerHTML = document.getElementById("elemento").value;

    let valor = document.createElement("li");
    valor.className = "valorProducto";
    valor.innerHTML = document.getElementById("precio").value;



    
    /*Aqui se aqui se acceden a los nodos lista y listaPrecio y se inserta el valor de los mismos en el html */
   
    
            let li = document.getElementById("lista");
            li.appendChild(producto);
        
        
            let liDos = document.getElementById("listaPrecio");
            liDos.appendChild(valor);

   
    /*Cada vez que se agrega un producto y precio los inputs quedan vacíos */
    document.getElementById("elemento").value = "";
    document.getElementById("precio").value = "";

   
  
    
    
}

function calcular(){
    let items = document.getElementsByClassName("valorProducto");
    let precioFinal = 0;
    for(const item of items){
        let i = parseFloat(item.innerHTML);
        precioFinal = precioFinal + i;
    }
    console.log(precioFinal);
    
    document.getElementById("resultado").value = "$ " + precioFinal;
    
    
}


function eliminar(){
    try{
        let item = document.getElementsByClassName("item");
        let precio = document.getElementsByClassName("valorProducto")
        item[0].parentNode.removeChild(item[0]);
        precio[0].parentNode.removeChild(precio[0]);
        
    }catch{
        alert("No hay elementos para eliminar");
    }
}