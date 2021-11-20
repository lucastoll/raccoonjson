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

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}


function imprime(dados){
    // pegar todas as categorias e colocar em uma array
    // sort na array e colocar em ordem alfabetica
    // printar por categoria
    
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
    // console.log(array)
    
    // pegar quantidade de ocorrencias de cada categoria ja na ordem alfabetica e colocar em uma array
    
    for(i in array)
    {
        if(i==0)
            quantidade = quantidade; // não fazer nada
        else
            arrayquantidades.push(quantidade)
        quantidade = 0;
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
    console.log(array)
    console.log(arrayquantidades)

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
                    //console.log(aux, quantidade)
                    //console.log("qtde = " + quantidade, "arrayqtde[i] = " + arrayquantidades[i])
                }

                if(quantidade == arrayquantidades[i])
                {
                    quantidade = 0;
                    //console.log("bateu")
                    for(l in aux)
                    {
                        for(k in dados)
                        {
                            if(dados[k]["id"] == aux[l])
                            {
                                console.log(dados[k]["name"])
                            }    
                        }
                    }
                }
            }
    }


}

// ordem print
// acessorios - mouse gamer
// eletrodomesticos - refrigerador, fogao de piso, forno microndas, lava & seca
// eletronicos - kit gamer, monitor, smart tv, home theater 
// panelas - conjunto de panelas

// ordem price * quantidade de todos os produtos cada categoria
// acessorios 
// mouse gamer - 699 * 0 = 0
// acessorios total = 0

// eletrodomesticos
// lava e seca = 3719.70 * 57 = 212.022,9
// refrigerador = 3880.23 * 12 = 46.562,76
// fogao do piso = 1419 * 37 = 52.503
// forno microondas = 358.77 * 13 = 4.664,01
// eletrodomesticos total = 315.752,67.

// eletronicos
// smart tv = 5799.42 * 0 = 0
// home theater = 2199 * 80 = 175.920
// kit gamer = 25599 * 0 = 0
// monitor = 1559.40 * 18 = 28.069,2
// eletronicos total = 203.989,2

// panelas
// conjunto de panelas = 192.84 * 21 
// panelas total = 4.049,64


var json = readjson("/broken-database.json")
json = cnomes(json) // Corrigir caracteres 
json = JSON.parse(json) // Transformar em OBJ para manipular numeros e propriedades
json = cprice(json) // Corrigir tipo dos preços
json = cquantity(json) // Corrigir quantity null
imprime(json)

//console.log(json)



