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

function carregar_nota(e){

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
            loadNota.on('click', carregar_nota);
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
