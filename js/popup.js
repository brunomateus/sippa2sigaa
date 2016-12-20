function carregar_frequencia(e){
}

function carregar_nota(e){

}

document.addEventListener('DOMContentLoaded', function () {
    var loadFreq = $("#load_freq");
    var loadNota = $("#load_notas");

    chrome.tabs.getSelected(null, function(tab){
        console.log("Aba selecionada " +  tab.url);
        if(tab.url == "https://sistemas.quixada.ufc.br/sippa/professor_visualizar_turma.jsp"){
            loadFreq.on('click', carregar_frequencia);
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

});
