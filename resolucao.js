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
    dados = JSON.stringify(dados)
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

var json = readjson("/broken-database.json")
json = cnomes(json)
json = JSON.parse(json)
json = cprice(json)
console.log(json)

for(i in json)
{
    if(json[i]["quantity"] == 0)
        {
            var propriedade = {["quantity"]: 0}
            json[i] = json[i] + propriedade
            console.log(json[i])
        }
}

/* for(i in json)
    console.log(json[i]) */


/*     function CreateJSON (propertyName){
        var myObject = { [propertyName] : "Value"};
    } */