function carregar_frequencia_from_sippa(e){

    chrome.tabs.executeScript({file: "js/jquery-3.1.1.min.js"}, function(){
        chrome.tabs.executeScript({file:"js/extract_freq.js"}, function(resultado){
            var frequencias = resultado[0];
            carregar_frequencia_from_json(frequencias.disciplina, frequencias.dados);
            chrome.storage.local.set({"dados": frequencias}, function(){
                console.log("Informações salvas");
            });
        });
    });
}

function carregar_frequencia_from_json(disciplina, frequencias){
    var exportar = $("#exportar");
    exportar.empty();
    exportar.append("Disciplina " +  disciplina);
    var table = $("<table></table>").attr("id", "dados_alunos").addClass("table table-condensed table-striped table-condensed table-bordered");
    var tbody = $("<tbody></tbody>");

    var dados = frequencias;
    for(var i = 0; i < dados.length; i++){
        var row = $("<tr></tr>").attr("id", dados[i]["matricula"]);
        var labels = ["matricula", "nome", "faltas", "frequencia", "media"];
        for(var j in labels){
            var label = labels[j];
            var cell = $("<td></td>").text(dados[i][label]);
            if(label == "media"){
                var clas = parseFloat(dados[i][label]) >= 5.0 ? "success" : "danger";
                cell.addClass(clas);
            }
            row.append(cell);
        }
        tbody.append(row);
    }
    table.append(tbody);
    exportar.append(table);
}

function carregar_nota_from_sippa(e){
    chrome.tabs.executeScript({file: "js/jquery-3.1.1.min.js"}, function(){
        chrome.tabs.executeScript({file:"js/extract_nota.js"}, function(resultado){
            carregar_nota_from_json(resultado[0].notas);
        });
    });
}

function carregar_nota_from_json(notas){
    var dados_salvos = chrome.storage.local.get("dados", function(resultado){
        if(resultado.dados){
            var dados = resultado.dados.dados
            dados[0].media = "M\xE9dia";
            for(var j in notas){
                for(var i in dados){
                    if(notas[j]["nome"] == dados[i]["nome"]){
                        dados[i]["media"] = notas[j]["media"];
                        break;
                    }
                }
            }
            carregar_frequencia_from_json(resultado.dados.disciplina, resultado.dados.dados);

        } else {
            alert("Voc\xEA precisa carregar a frequ\xEAncia dos alunos antes de executar esse passo");
        }
    });

}

function lancar_nota_sigaa(){

}

function limpar(){
    chrome.storage.local.clear();
    var exportar = $("#exportar");
    exportar.empty();

}

document.addEventListener('DOMContentLoaded', function () {

    var loadFreq = $("#load_freq");
    var loadNota = $("#load_notas");
    var lancaNota = $("#lanca_notas");
    var limparDados = $("#limpar");

    limparDados.on("click", limpar);


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
            loadNota.prop('disabled', true);
        }

        if(tab.url == "https://si3.ufc.br/sigaa/ensino/consolidacao/detalhesTurma.jsf"){
            lancaNota.on('click', lancar_nota_sigaa);
            lancaNota.prop('disabled', false);
        } else {
            lancaNota.prop('disabled', true);
        }


    });

    var dados_salvos = chrome.storage.local.get("dados", function(frequencia){
        if(frequencia.dados){
            carregar_frequencia_from_json(frequencia.dados.disciplina, frequencia.dados.dados);
        }
    });

});
