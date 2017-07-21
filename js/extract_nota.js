var resultado = {"notas": []};
var dados = [];
var tabela_freq = $(".tabela_ver_freq tbody")[0];
var aluno = {"nome": "", "media": "", "af":"", "mp": ""};

$(tabela_freq).find('tr').each(function(colIndex, c){

    var novo_aluno = JSON.parse(JSON.stringify(aluno));
    var nomeNode = $(this).children(".tab-esquerda");
    if(nomeNode){
        novo_aluno["nome"] = nomeNode.text().trim();
        novo_aluno["media"] = $(this).children("td:last").text().replace(",", ".").trim();
        novo_aluno["af"] = $(this).children("td:nth-last-child(2)").children("input").val();
        novo_aluno["mp"] = novo_aluno["af"] == "" ? novo_aluno["media"] : (2*parseFloat(novo_aluno["media"]) - parseFloat(novo_aluno["af"])).toFixed(2);
        dados.push(novo_aluno);
    }

});

resultado.notas = dados;
resultado;

