var step = -1;


function carregar_frequencia_from_sippa(e){

    chrome.tabs.executeScript({file: "js/jquery-3.1.1.min.js"}, function(){
        chrome.tabs.executeScript({file:"js/extract_freq.js"}, function(resultado){
            carregar_frequencia_from_json(resultado[0]);
            chrome.storage.local.set({"dados": resultado[0]}, function(){
                console.log("Informações salvas");
            });
        });
    });
}

function carregar_frequencia_from_json(resultado){
    var exportar = $("#exportar");
    exportar.empty();
    exportar.append("Disciplina " +  resultado.disciplina);
    var table = $("<table></table>").attr("id", "dados_alunos");

    var dados = resultado.dados;
    for(var i = 0; i < dados.length; i++){
        var row = $("<tr></tr>").attr("id", dados[i]["matricula"]);
        for(var label in dados[i]){
            var cell = $("<td></td>").text(dados[i][label]);
            row.prepend(cell);
        }
        table.append(row);
    }
    exportar.append(table);
    step = 2;
}

function carregar_nota_from_sippa(e){
    chrome.tabs.executeScript({file: "js/jquery-3.1.1.min.js"}, function(){
        chrome.tabs.executeScript({file:"js/extract_nota.js"}, function(resultado){
            carregar_nota_from_json(resultado[0].notas);
//            chrome.storage.local.set({"dados": resultado[0]}, function(){
//                console.log("Informações salvas");
//            });
        });
    });
}

function carregar_nota_from_json(notas){
    var dados_salvos = chrome.storage.local.get("dados", function(resultado){
        if(resultado.dados){
            var dados = resultado.dados.dados
            for(j in notas){
                for(i in dados){
                    if(notas[j]["nome"] == dados[i]["nome"]){
                        dados[i]["media"] = notas[j]["media"];
                        break;
                    }
                }
            }
            carregar_frequencia_from_json(resultado.dados);

        } else {
            alert("Você precisa carregar a frequência dos alunos antes de executar esse passo");
        }
    });

}

document.addEventListener('DOMContentLoaded', function () {
    step = 1;

    var loadFreq = $("#load_freq");
    var loadNota = $("#load_notas");

    chrome.tabs.getSelected(null, function(tab){
        console.log("Aba selecionada " +  tab.url);
        if(tab.url == "https://sistemas.quixada.ufc.br/sippa/professor_visualizar_turma.jsp"){
            loadFreq.on('click', carregar_frequencia_from_sippa);
            loadFreq.prop('disabled', false);
        } else {
            loadFreq.prop('disabled', true);
        }

        if(tab.url == "https://sistemas.quixada.ufc.br/sippa/professor_visualizar_avaliacoes.jsp"){
            loadNota.on('click', carregar_nota_from_sippa);
            loadNota.prop('disabled', false);
        } else {
            loadNota.prop('click', true);
        }

    });

    var dados_salvos = chrome.storage.local.get("dados", function(resultado){
        if(resultado.dados){
            carregar_frequencia_from_json(resultado.dados);
        }
    });

});
