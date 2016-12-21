var disciplina = $("#info").find("h1").text();
var resultado = {"disciplina": disciplina};
var dados = [];
var tabela_freq = $(".tabela_ver_freq")[0];
var aluno = {"nome": "", "matricula": "", "frequencia": "", "faltas": ""};
var cabecalho = ["nome", "matricula", "frequencia", "faltas"];

$(tabela_freq).find('tr').each(function(colIndex, c){

    var novo_aluno = JSON.parse(JSON.stringify(aluno));
    $(this).find('th').each(function(colIndex, c){
        var conteudo = c.innerText;
        if(conteudo != "Presença"){
            novo_aluno[cabecalho[colIndex - 1]] = conteudo;
        }
    });
    dados.push(novo_aluno);

    novo_aluno = JSON.parse(JSON.stringify(aluno));
    $(this).find('td').each(function(colIndex, c){
        var conteudo = c.innerText;
        if(conteudo != ""){
            novo_aluno[cabecalho[colIndex - 1]] = conteudo;
        }
    });
    dados.push(novo_aluno);

});

resultado.dados = dados;
resultado;

