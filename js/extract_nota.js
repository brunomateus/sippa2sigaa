var resultado = {"notas": []};
var dados = [];
var tabela_freq = $(".tabela_ver_freq tbody")[0];
var aluno = {"nome": "", "media": "", "af":"", "mp": ""};

$(tabela_freq).find('tr').each(function(colIndex, c){

    var novo_aluno = JSON.parse(JSON.stringify(aluno));
    var nomeNode = $(this).children(".tab-esquerda");
    if(nomeNode){
        novo_aluno["nome"] = nomeNode.text().trim();
        var media = parseFloat($(this).children("td:last").text().replace(",", ".").trim());
        if (isNaN(media)) {
            media = 0;
        }
        var af = $(this).children("td:nth-last-child(2)").children("input").val();

        var mp = media;
        if(af != ""){
            af  = parseFloat(af).toFixed(1);
            mp = (2*(media) - af).toFixed(1);
        }

        novo_aluno["af"] = (af + "").replace(".", ",");
        novo_aluno["mp"] = (mp + "").replace(".", ",");
        novo_aluno["media"] = (media.toFixed(1) + "").replace(".", ",");

        dados.push(novo_aluno);
    }

});

resultado.notas = dados;
resultado;

