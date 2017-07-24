chrome.storage.local.get("informacoes", function(recuperadas){
   var dadosSalvos = recuperadas.informacoes;

    var tabelaNotas = document.getElementById("notas-turma");
    var body = tabelaNotas.getElementsByTagName("tbody")[0];
    var linhas = body.getElementsByTagName("tr");
    for(var i = 0; i < linhas.length; i++){
        var matricula = "0" + linhas[i].childNodes[1].innerText.trim();
        for(var j = 0; j < dadosSalvos.alunos.length; j++){

            var aluno = dadosSalvos.alunos[j];

            if(matricula == aluno.matricula){
                var nota1 = linhas[i].childNodes[5].childNodes[1];
                var nota2 = linhas[i].childNodes[7].childNodes[1];
                var af = linhas[i].childNodes[11].childNodes[1];

                var frequencia = linhas[i].childNodes[21].childNodes[1];

                nota1.setAttribute("value", aluno.mp);
                nota2.setAttribute("value", aluno.mp);

                if(aluno.af){
                    af.removeAttribute("disabled");
                    af.setAttribute("value", aluno.af);
                }

                frequencia.setAttribute("value", aluno.faltas);

                break;
            }
        }
    }
});

