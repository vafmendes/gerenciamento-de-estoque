
function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto, idEstadoProduto, idLojaProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;
    let estado = document.getElementById(idEstadoProduto).value;
    let loja = document.getElementById(idLojaProduto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    else cadastrarProduto(nome, codigo, parseInt(qtidade), loja, String(estado));
}

function cadastrarProduto(produto, codig, qtidade, loj, estad) {
    let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade, loja:loj, estado:estad};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Função: atualizarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}
//-----------------------------------------------------------------------------------------------------------
// Função: carregarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Exibe todos os itens do estoque (nome, código e quantidade)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------
function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<table width='667' border='1px'>");
                document.write("<thead>");
                document.write("<tr>");
                document.write("<th>Nome do Produto</th>");
                document.write("<th>Código do Produto</th>");
                document.write("<th>Quatidade do Produto</th>");
                document.write("<th>Loja</th>");
                document.write("<th>Estado</th>");
                document.write("</tr>");
                document.write("</thead>");
                document.write("<tbody>");
                document.write("<tr>");
                document.write("<td>"+produto.nome+"</td>");
                document.write("<td>"+produto.codigo+"</td>");
                document.write("<td>"+produto.quantidade+"</td>");
                document.write("<td>"+produto.loja+"</td>");
                document.write("<td>"+produto.estado+"</td>");
                document.write("</tr>");
                document.write("</tbody>");
                document.write("</table>");
            });
        }
    }    
}