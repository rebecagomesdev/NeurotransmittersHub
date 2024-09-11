function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

function pesquisar() {
  let section = document.getElementById("resultados-pesquisa")
  let campoPesquisa = document.getElementById("campo-pesquisa").value

  if (!campoPesquisa) {
    section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar algo.</p>"
    return
  }

  campoPesquisa = normalizeText(campoPesquisa)
  let resultados = ""

  for (let dado of dados) {
    let titulo = normalizeText(dado.titulo)
    let descricao = normalizeText(dado.descricao)
    let tags = normalizeText(dado.tags)
    let imagem = dado.imagem || ""

    if (
      titulo.includes(campoPesquisa) ||
      descricao.includes(campoPesquisa) ||
      tags.includes(campoPesquisa)
    ) {
      resultados += `
      <div class="item-resultado">
        <h2>
          <a href="#" target="_blank">${dado.titulo}</a>
        </h2>
        <p class="descricao-meta">${dado.descricao}</p>
        <img src="${imagem}" alt="${dado.titulo}" class="imagem-resultados">
        <p>
          <a href="${dado.link}" target="_blank">Mais informações</a>
        </p>
      </div>`
    }
  }

  if (!resultados) {
    resultados = "<p>Nada foi encontrado</p>"
  }

  section.innerHTML = resultados
}
