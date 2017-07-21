function carregar_frequencia_from_sippa(e){

    chrome.tabs.executeScript({file: "js/jquery-3.1.1.min.js"}, function(){
        chrome.tabs.executeScript({file:"js/extract_freq.js"}, function(resultado){
            var informacoes = resultado[0];
            carregar_frequencia_from_json(informacoes.disciplina, informacoes.alunos);
            $("#feedback").text("Informa\xE7\xF5es de frequ\xEAncias carregadas com sucesso").removeClass("hidden").addClass("visible");
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
        var labels = ["matricula", "nome", "faltas", "frequencia", "mp", "af", "media"];
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

    chrome.storage.local.set({"informacoes": {"disciplina": disciplina, "alunos": frequencias}}, function(){
        console.log("Informações salvas");
    });

}

function carregar_nota_from_sippa(e){
    chrome.tabs.executeScript({file: "js/jquery-3.1.1.min.js"}, function(){
        chrome.tabs.executeScript({file:"js/extract_nota.js"}, function(resultado){
            carregar_nota_from_json(resultado[0].notas);
            $("#feedback").text("Informa\xE7\xF5es de notas carregadas com sucesso").removeClass("hidden").addClass("visible");


        });
    });
}

function carregar_nota_from_json(notas){
    var dados_salvos = chrome.storage.local.get("informacoes", function(recuperadas){
        if(recuperadas.informacoes){
            var dados = recuperadas.informacoes.alunos;
            dados[0].media = "M\xE9dia";
            for(var j in notas){
                for(var i in dados){
                    if(notas[j]["nome"] == dados[i]["nome"]){
                        dados[i]["media"] = notas[j]["media"];
                        dados[i]["af"] = notas[j]["af"];
                        dados[i]["mp"] = notas[j]["mp"];
                        break;
                    }
                }
            }
            carregar_frequencia_from_json(recuperadas.informacoes.disciplina, recuperadas.informacoes.alunos);

        } else {
            alert("Voc\xEA precisa carregar a frequ\xEAncia dos alunos antes de executar esse passo");
        }
    });

}

function habilitarLogin(){

    var habilitar = function(){
        var inputLogin = document.getElementsByName("user.login")[0];
        inputLogin.removeAttribute("disabled", "");

    var inputSenha = document.getElementsByName("user.senha")[0];
        inputSenha.removeAttribute("disabled", "");

        var entrar = document.getElementsByName("entrar")[0];
        entrar.removeAttribute("disabled", "");

    };

    chrome.tabs.executeScript({code: "("+habilitar.toString()+")();"}, function(resultado){
        console.log("Login habilitado");
    });

}

function lancar_nota_sigaa(){

/*    var lancarNotas = function(){

        var tabelaNotas = document.getElementById("notas-turma");
        var body = tabelaNotas.getElementsByTagName("tbody")[0];
        var linhas = body.getElementsByTagName("tr");
        for(var i = 0; i < linhas.length; i++){
            var matricula = linhas[i].childNodes[1].nodeValue;
            console.log(matricula);
        }

    };*/

 //   chrome.tabs.executeScript({code:"("+ lancarNotas.toString() +")();"}, function(resultado){
    chrome.tabs.executeScript({file:"js/lancar_notas.js"}, function(resultado){

        $("#feedback").text("Notas lan\xE7adas com sucesso").removeClass("hidden").addClass("visible");
    });

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


    chrome.tabs.query({active: true}, function(tabs){
        var tab = tabs[0];
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

        if(tab.url == "https://si3.ufc.br/sigaa/verTelaLogin.do"){
            habilitarLogin();
        }


    });

    var dados_salvos = chrome.storage.local.get("informacoes", function(recuperadas){
        if(recuperadas.informacoes){
            carregar_frequencia_from_json(recuperadas.informacoes.disciplina, recuperadas.informacoes.alunos);
        }
    });

});
