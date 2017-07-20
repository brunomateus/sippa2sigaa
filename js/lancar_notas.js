chrome.storage.local.get("informacoes", function(recuperadas){
   var dadosSalvos = recuperadas.informacoes;

    var tabelaNotas = document.getElementById("notas-turma");
    var body = tabelaNotas.getElementsByTagName("tbody")[0];
    var linhas = body.getElementsByTagName("tr");
    for(var i = 0; i < linhas.length; i++){
        var matricula = "0" + linhas[i].childNodes[1].innerText.trim();
        for(var j = 0; j < dadosSalvos.alunos.length; j++){

            var aluno = dadosSalvos.alunos[j];
            console.log(matricula, aluno.matricula);

            if(matricula == aluno.matricula){
                var nota1 = linhas[i].childNodes[5];
                var nota2 = linhas[i].childNodes[7];
                var frequencia = linhas[i].childNodes[17];


                nota1.childNodes[1].value= aluno.media;
                nota2.childNodes[1].value= aluno.media;
//                frequencia.childNodes[1].value=20;

                break;
            }
        }
    }
});

