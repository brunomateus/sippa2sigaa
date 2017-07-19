var resultado = {};
var dados = [];
var tabela_freq = $(".tabela_ver_freq tbody")[0];
var aluno = {"nome": "", "matricula": "", "frequencia": "", "faltas": ""};
var cabecalho = ["nome", "matricula", "frequencia", "faltas"];

dados.push(JSON.parse(JSON.stringify({"nome": "Nome", "matricula": "Matrícula", "frequencia": "Frequência(%)", "faltas": "Faltas em Horas", "media": "Média"})));


$(tabela_freq).find('tr').each(function(colIndex, c){

    var novo_aluno = JSON.parse(JSON.stringify(aluno));

    novo_aluno = JSON.parse(JSON.stringify(aluno));
    $(this).find('td').each(function(colIndex, c){
        var conteudo = c.innerText.trim();
        if(conteudo != ""){
            novo_aluno[cabecalho[colIndex - 1]] = conteudo;
        }
    });
    dados.push(novo_aluno);

});

var disciplina = $("#info").find("h1").text();
resultado.disciplina = disciplina;
resultado.alunos =  dados;
resultado;

