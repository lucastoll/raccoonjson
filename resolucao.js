// __dirname = variavel js para o nome do diretorio do arquivo em string

// comando replace:
// replace ("um", "dois") -> substitui só o primeiro
// replace (/um/g, "dois") -> substitui todos 

//usando json
//json.stringify -> obj to str
//json.PARSE -> str to json


function readjson(jsonpath){
    var caminhorequire = __dirname.replace(/\\/g, '/') + jsonpath   // caminho do arquivo js + nome do .json, substituindo '\' por '/' para funcionar no require.
    var dados = require(caminhorequire)
    dados = JSON.stringify(dados) // Transformar em string para manipular caracteres mais facilmente
    return dados
    //ref: https://requirejs.org/docs/node.html
    //ref: https://www.alura.com.br/artigos/javascript-replace-manipulando-strings-e-regex
}

function cnomes(dados){
    var nomes = dados
    nomes = nomes.replace(/æ/g, "a")
    nomes = nomes.replace(/¢/g, "c")
    nomes = nomes.replace(/ø/g, "o")
    nomes = nomes.replace(/ß/g, "b")
    return nomes
    //ref: https://www.alura.com.br/artigos/javascript-replace-manipulando-strings-e-regex
}

function cprice(dados){
        for(i in dados)
    {
        dados[i]["price"] = parseFloat(dados[i]["price"])
    }

    return dados
}

function cquantity(dados){
    for(i in dados)
    {
        if(dados[i]["quantity"] == null)
            {
                dados[i]["quantity"] = 0;
            }
    }
    
    return dados
}




function imprime(dados){
   
    // Passos
    // pegar todas as categorias e colocar em uma array
    // sort na array e colocar em ordem alfabetica
    // pegar quantidade de ocorrencias de cada categoria ja na ordem alfabetica e colocar em uma array
    
    var array = [];
    var arrayquantidades = [];
    var quantidade = 0;
    var aux = [];

    for(i in dados[i]["category"])
    {
        if(array.includes(dados[i]["category"]))
            quantidade = quantidade; // não fazer nada
        else
            array.push(dados[i]["category"])
    }
    array.sort(); //ordem alfabetica
    
    // pegar quantidade de ocorrencias de cada categoria ja na ordem alfabetica e colocar em uma array
    
    for(i in array)
    {
        if(i==0) // não puxar o 0 pra array na primeira ocorrencia
            quantidade = quantidade; // não fazer nada
        else
            arrayquantidades.push(quantidade)
        quantidade = 0; // cada vez que o for reseta a quantidade volta pra 0 para ser somada novamente
        for(j in dados)
            {
                if(dados[j]["category"] == array[i])
                {
                    //console.log(dados[j])
                    quantidade++;
                    //console.log("quantidade if = ", quantidade)
                    //console.log(dados[j]["id"])
                    //aux.push(dados[j]["id"])
                    //aux.sort();
                    //console.log(aux)
                }
                //aux.sort();
                //console.log(aux)
            }
    }
    arrayquantidades.push(quantidade) // for acaba então para a ultima quantidade é necessário mais um comando
    // agora temos as categorias em ordem alfabetica e quantas vezes elas existem nos dados
    console.log("Array categorias em ordem alfabética = " + array)
    console.log("Array quantidades de cada categoria (ordem alfabética) = " + arrayquantidades + "\n---------------------------------------------------------------------------------------------\n")
    console.log("Nomes dos produtos ordenados por categoria em ordem alfabética e ID em ordem crescente: ")



    // percorrer dados da array categoria 
    // percorrer dados (json) 
    // se a categoria dos dados atuais forem iguais as da array que esta sendo percorrida no primeiro for, o id é puxado para uma array auxiliar, que é colocada em ordem crescente em toda interação do if
    // uma quantidade auxiliar e somada, e se essa quantidade for igual a quantidade de ocorrencias da categoria atual os dados são percorridos denovo para printar os dados que possuirem os IDS na array auxiliar
    // tendo em conta que o for primario esta percorrendo as categorias em ordem alfabetica, e a array auxiliar esta sempre em ordem crescente, o desafio de printar por categoria em ordem alfabetica está completo
    
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
                    //console.log("IDS array aux = " + aux)
                    //console.log("qtde = " + quantidade, "arrayqtde[i] = " + arrayquantidades[i])
                }


                if(quantidade == arrayquantidades[i])
                {
                    console.log("\nCategoria = " + dados[j]["category"])
                    quantidade = 0; // quantidade resetada para não printar em todo for
                    //console.log("bateu")
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
    // fazer uma array com todas as categorias
    console.log("\n------------------------------------------------------------------------------------\nPreço do valor do total de estoque por categoria")
    var arraycategoria = [];
    var soma = 0;
    var arraysomas = [];
    
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
        if(i==0)
            arraycategoria = arraycategoria;
        else
            {
                soma = 0;
                for(l in arraysomas)
                    soma += arraysomas[l]
                console.log("Soma total do valor de estoque da categoria = R$" + soma)
                arraysomas = [];
            }
        quantidade = 0;
        aux = [];
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
    // repetir o processo para a ultima categoria pois o for acaba antes do if
    soma = 0;
    for(x in arraysomas)
        soma += arraysomas[x]
    console.log("Soma total de estoque da categoria = " + soma)
}


var json = readjson("/broken-database.json")

json = cnomes(json) // Corrigir caracteres 
json = JSON.parse(json) // Transformar em OBJ para manipular numeros e propriedades
json = cprice(json) // Corrigir tipo dos preços
json = cquantity(json) // Corrigir quantity null

imprime(json)
valortotal(json)




