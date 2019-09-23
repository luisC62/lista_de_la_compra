window.onload=inicio;
var itemsSeleccionados=[];
var nombresItems=[];
var botonAnyadir;
var botonSeleccionarTodos;
var botonBorrarSeleccionados;


function inicio(){
    window.onkeydown=teclado;
    botonAnyadir=document.getElementById("botonAnyadir");
    botonSeleccionarTodos=document.getElementById("botonSelAll");
    botonBorrarSeleccionados=document.getElementById("botonBorrarSel");
    botonAnyadir.onclick=anyadirItem;
    botonSeleccionarTodos.onclick=SeleccionarTodos;
    botonBorrarSeleccionados.onclick=BorrarSeleccionados;
    
    //Local Storage
    //Si hay algo en las variables nomItems y itemsSel del local Storage,
    //se leen y se construyen los Arrays nombresItems e itemsSeleccionados
    nomItems_LS=localStorage.getItem("nomItems");
    itemsSel_LS=localStorage.getItem("itemsSel");
    if (nomItems_LS != null && nomItems_LS !=""){
        nombresItems=nomItems_LS.split("/_/");
    }
    if (itemsSel_LS != null && itemsSel_LS !=""){
        seleccionados=itemsSel_LS.split("/_/");
        
        for(k=0; k<seleccionados.length; k++){
            itemsSeleccionados[k]=strAbool(seleccionados[k]);
        }
        
    }
    
    actualizarLista();

}

function actualizarLista(){
    //La funcion actualizarlista escribe el contenido de los arrays nombresItems e itemsSeleccionados
    //en el elemento listaItems del fichero index.html. Si el contenido de itensSeleccionados[i] es true, 
    //dibuja un aspa "checked" en la lista de items
    document.getElementById("listaItems").innerHTML = "";
    for(i=0; i<nombresItems.length; i++){
        if(itemsSeleccionados[i]){
            varsel=`<img src="img/339-checkbox-checked.png">`;
        }
        else{
            varsel=``;
        }
        document.getElementById("listaItems").innerHTML += 
            `<div class="unItem" onclick="marcar(this)" id="b${i}"> <div class="nombreItem">${nombresItems[i]}</div><div class="seleccionado">${varsel}<div></div>`;
    }
    
    
}
function mantenerLocalStorage(){
    //Local Storage
    //Transforma los arrays nombresItems y itemsSeleccionados en cadenas (strings)
    //introduce los strings en las variables nomItems y itemsSel del local Storage
    let nomparaguardar=nombresItems.join("/_/");
    let selparaguardar=itemsSeleccionados.join("/_/");
    localStorage.setItem("nomItems",nomparaguardar);
    localStorage.setItem("itemsSel",selparaguardar);
}
function anyadirItem(){
    //Se quitan los espacios con "trim", se verifica que input no este vacio
    //y se verifica que no hayan entradas repetidas.
    //se actualiza la lista  y lo que haya en el input se borra
    entrada=document.getElementById("editItem").value.trim();
    

    if(!entrada==""){
        entrada=entrada.toLowerCase();
        entrada=entrada[0].toUpperCase() + entrada.substr(1);


        m=nombresItems.indexOf(entrada);
        if(m==-1){
            nombresItems.push(entrada);
            itemsSeleccionados.push(false);
            actualizarLista();
            mantenerLocalStorage();
        }
    }
    document.getElementById("editItem").value="";
    document.getElementById("editItem").focus();
    
    
}

function SeleccionarTodos(){
    //Todos los elementos del array itemsSeleccionados se ponen a true
    //actualizarlista() se encarga de dibujar las aspas checked
    for(i=0; i<itemsSeleccionados.length; i++){
        itemsSeleccionados[i]=true;
    }
    actualizarLista();
}
function BorrarSeleccionados(){
    //Todos los items que tengan true en el array itemsSeleccionados se borran
    k=itemsSeleccionados.indexOf(true);
    while(k>=0){
        itemsSeleccionados.splice(k,1);
        nombresItems.splice(k,1);
        k=itemsSeleccionados.indexOf(true);

    }
    actualizarLista();
    mantenerLocalStorage();
}
function marcar(v){
    //Se se hace click en un elemento de la lista queda marcado (se pone a true el 
    //elemento correspondiente y se dibuja un aspa
    indice=v.getAttribute("id").substr(1);
    itemsSeleccionados[indice]=!itemsSeleccionados[indice];
    actualizarLista();
    mantenerLocalStorage();
}
function marcar1(v){
    //Se puede seleccionar el elemento haciendo click en la zona de las aspas
    indice=v.getAttribute("id").substr(1);
    itemsSeleccionados[indice]=!itemsSeleccionados[indice];
    actualizarLista();
    mantenerLocalStorage();
}
function teclado(e){
    //Si se detecta que se ha pulsado la tecla "Enter", se añade a la lista lo que haya en el input
    let codigo=e.keyCode;
    
    if (codigo==13){
        
        anyadirItem();
    }
}
function strAbool(s){
    //La variable itemSel del local Storage almacena texto. Esta función  se utiliza para
    //pasar de ese texto a un valor booleano, que es el que se almacena en itemsSelecconados
    var q;
    if(s=="true"){
        q=true;   
    }
    if(s=="false"){
        q=false;
    }
    return q;
}