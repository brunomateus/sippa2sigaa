var resultado = {"notas": []};
var dados = [];
var tabela_freq = $(".tabela_ver_freq")[0];
var aluno = {"nome": "", "media": ""};

$(tabela_freq).find('tr').each(function(colIndex, c){

    var novo_aluno = JSON.parse(JSON.stringify(aluno));
    var nomeNode = $(this).children(".tab-esquerda");
    if(nomeNode){
        novo_aluno["nome"] = nomeNode.text();
        novo_aluno["media"] = $(this).children("td:last").text();
        dados.push(novo_aluno);
    }

});

resultado.notas = dados;
resultado;

