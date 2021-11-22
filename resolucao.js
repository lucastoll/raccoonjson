function readjson(jsonfile){

    var caminhorequire = __dirname.replace(/\\/g, '/') + jsonfile   // caminho do arquivo js + nome do .json, substituindo '\' por '/' para funcionar no require.
    var dados = require(caminhorequire)
    return dados
    //ref: https://requirejs.org/docs/node.html
    //ref: https://www.alura.com.br/artigos/javascript-replace-manipulando-strings-e-regex
}

function cnomes(dados){ // Corrigir nomes

    dados = JSON.stringify(dados) // Transformar em string para manipular caracteres mais facilmente
    dados = dados.replace(/æ/g, "a")
    dados = dados.replace(/¢/g, "c")
    dados = dados.replace(/ø/g, "o")
    dados = dados.replace(/ß/g, "b")
    return dados
}

function cprice(dados){ // Corrigir preços

    dados = JSON.parse(json) // Transformar em OBJ para manipular numeros e propriedades
    for(i in dados)
    {
        dados[i]["price"] = parseFloat(dados[i]["price"])
    }
    return dados
}

function cquantity(dados){ // Corrigir quantidades
    for(i in dados)
    {
        if(dados[i]["quantity"] == null)
            {
                dados[i]["quantity"] = 0;
            }
    }
    return dados
}

const fs = require('fs') // modulo file server do node.js
function exportToJsonFile(jsonData) { // exportar arquivo json

    const finished = (error) => {
        if(error){
            console.error(error)
            return;
        }
    }
    const file = JSON.stringify(jsonData, null, 2)
    fs.writeFile("saida.json", file, finished)
    // ref: https://www.youtube.com/watch?v=T7s3st6xfpA&t=253s
}

function imprime(dados){

    var array = [];
    var arrayquantidades = [];
    var quantidade = 0;
    var aux = [];

    // pegar as categorias e colocar em ordem alfabetica
    for(i in dados[i]["category"])
    {
        if(array.includes(dados[i]["category"]))
            quantidade = quantidade; // não fazer nada
        else
            array.push(dados[i]["category"])
    }
    array.sort(); //ordem alfabetica
    
    // pegar as quantidades das categorias já em ordem alfabetica
    for(i in array)
    {
        if(i==0) // primeira ocorrencia
            quantidade = quantidade; // não fazer nada
        else
            arrayquantidades.push(quantidade)
        quantidade = 0; 
        for(j in dados)
            {
                if(dados[j]["category"] == array[i])
                {
                    quantidade++;

                }
            }
    }
    arrayquantidades.push(quantidade) // for acaba então para a ultima quantidade é necessário mais um comando
    
    // agora temos as categorias em ordem alfabetica e quantas vezes elas existem nos dados
    console.log("Array categorias em ordem alfabética = " + array)
    console.log("Array quantidades de cada categoria (ordem alfabética) = " + arrayquantidades + "\n---------------------------------------------------------------------------------------------\n")
    console.log("Nomes dos produtos ordenados por categoria em ordem alfabética e ID em ordem crescente: ")

    // percorrer os dados, pegar os ids e printar em ordem crescente.    
    for(i in array)
    {
        quantidade = 0;
        aux = [];
        for(j in dados)
            {
                if(dados[j]["category"] == array[i])
                {
                    aux.push(dados[j]["id"])
                    aux.sort();
                    quantidade++;
                }

                if(quantidade == arrayquantidades[i])
                {
                    console.log("\nCategoria = " + dados[j]["category"])
                    quantidade = 0; // quantidade resetada para não printar em todo for
                    for(l in aux)
                    {
                        for(k in dados)
                        {
                            if(dados[k]["id"] == aux[l])
                            {
                                console.log("ID = "+ dados[k]["id"] + "     " + dados[k]["name"])
                            }    
                        } 
                    } 
                } // if 
            } // for j in dados
    } //for i in array
} /// function imprime

function valortotal(dados){
    console.log("\n------------------------------------------------------------------------------------\nPreço do valor do total de estoque por categoria")
    var arraycategoria = [];
    var soma = 0;
    var arraysomas = [];
    
    // array categorias em ordem alfabetica
    for(j in dados[j]["category"])
    {
        if(arraycategoria.includes(dados[j]["category"]))
            arraycategoria = arraycategoria; // não fazer nada
        else
            arraycategoria.push(dados[j]["category"])
    }
    arraycategoria.sort(); //ordem alfabetica 


    for(i in arraycategoria)
    {
        if(i==0) // primeira ocorrência
            arraycategoria = arraycategoria; // não fazer nada
        else
            {
                soma = 0;
                for(l in arraysomas)
                    soma += arraysomas[l]
                console.log("Soma total do valor de estoque da categoria = R$" + soma)
                arraysomas = [];
            }
        quantidade = 0;
        console.log("\n" + arraycategoria[i])
        for(j in dados)
            {
                if(dados[j]["category"] == arraycategoria[i])
                {
                    soma = dados[j]["quantity"] * dados[j]["price"]
                    arraysomas.push(soma)
                }
            }
    }
    // repetir o processo para a ultima categoria pois o for acaba e o ultimo if não é executado.
    soma = 0;
    for(x in arraysomas)
        soma += arraysomas[x]
    console.log("Soma total de estoque da categoria = " + soma)
}

var json = readjson("/broken-database.json")

json = cnomes(json) // Corrigir caracteres 
json = cprice(json) // Corrigir tipo dos preços
json = cquantity(json) // Corrigir quantity null
exportToJsonFile(json) // Exportar arquivo JSON

imprime(json) // Printar nomes em ordem
valortotal(json) // Printar valor total de cada categoria




