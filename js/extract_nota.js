var resultado = {"notas": []};
var dados = [];
var tabela_freq = $(".tabela_ver_freq tbody")[0];
var aluno = {"nome": "", "media": ""};

$(tabela_freq).find('tr').each(function(colIndex, c){

    var novo_aluno = JSON.parse(JSON.stringify(aluno));
    var nomeNode = $(this).children(".tab-esquerda");
    if(nomeNode){
        novo_aluno["nome"] = nomeNode.text().trim();
        novo_aluno["media"] = $(this).children("td:last").text().trim();
        dados.push(novo_aluno);
    }

});

resultado.notas = dados;
resultado;

