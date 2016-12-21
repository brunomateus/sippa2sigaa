var data = [];
var tabela_freq = $(".tabela_ver_freq")[0];
$(tabela_freq).find('tr').each(function(colIndex, c){
    var cols = [];
    $(this).find('th, td').each(function(colIndex, c){
        var conteudo = c.innerText;
        if(conteudo != "Presença" && conteudo != ""){
            cols.push(c.innerText);
        }
    });
    data.push(cols);
});
var disciplina = $("#info").find("h1").text();

var resultado = {"dados": data, "disciplina": disciplina};

resultado;

