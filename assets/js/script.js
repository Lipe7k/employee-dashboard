const funcionarios = [
    {nome: "Felipe", cargo: "Engenheiro de software", salario: 16520},
    {nome: "João", cargo: "Segurança", salario: 2500},
    {nome: "Enzo", cargo: "Técnico em Hardware", salario: 2133},
    {nome: "Fellipe", cargo: "Programador Backend", salario: 12392},
    {nome: "Mariana", cargo: "Analista de Dados", salario: 8920},
    {nome: "Lucas", cargo: "Designer UI/UX", salario: 7350},
    {nome: "Bruna", cargo: "Gerente de Projetos", salario: 11200},
    {nome: "Rafael", cargo: "Estagiário de TI", salario: 1500},
    {nome: "Carla", cargo: "Especialista em Segurança da Informação", salario: 10400},
    {nome: "Thiago", cargo: "Administrador de Redes", salario: 6790}
  ]
  
  
  const nomeInput = document.querySelector("#nome")
  const searchInput = document.querySelector("#btnSearch")
  const screenEmployee = document.querySelector("#screen-employee")
  const infoEmployee = document.querySelector(".infos-employee")
  
  function openScreen(){
    screenEmployee.classList.add("active")
  }
  
  screenEmployee.addEventListener("click", (e) => {
    if(e.target.id === "screen-employee" ){
      closeScreen()
    }
  })
  
  function closeScreen(){
    screenEmployee.classList.remove("active")
  }
  
  function removeAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  function btnAumento(funcionario) {
    const btnAumento = document.createElement("button")
    btnAumento.classList.add("btn-aumento")
    btnAumento.style.backgroundColor = "green"
    btnAumento.textContent = "Dar aumento"
  
    
    const aumentoContainer = document.createElement("div")
    aumentoContainer.classList.add("aumento-box")
  
    btnAumento.addEventListener("click", () => {
      
      aumentoContainer.innerHTML = ""
  
      const inputValorAumento = document.createElement("input")
      inputValorAumento.type = "number"
      inputValorAumento.placeholder = "Valor do aumento em %"
  
      const btnValorAumento = document.createElement("button")
      btnValorAumento.style.backgroundColor = "black"
      btnValorAumento.textContent = "Confirmar aumento"
  
      btnValorAumento.addEventListener("click", () => {
        const valor = Number(inputValorAumento.value)
        if (!valor || isNaN(valor)) {
          alert("Coloque um valor válido!")
          return
        }
  
        funcionario.salario += (inputValorAumento.value / 100) * funcionario.salario
        alert(`Novo salário: R$ ${funcionario.salario.toFixed(2)}`)
        searchEmployee() 
      })
  
      aumentoContainer.append(inputValorAumento, btnValorAumento)
    })
  
    infoEmployee.appendChild(btnAumento)
    infoEmployee.appendChild(aumentoContainer)
  }
  
  
  function btnVoltar(){
      if (!document.querySelector(".btn-voltar")) {
      const btnBack = document.createElement("button")
      btnBack.classList.add("btn-voltar")
      btnBack.style.backgroundColor = "grey"
      btnBack.textContent = "Voltar"
      btnBack.addEventListener("click", closeScreen)
      infoEmployee.appendChild(btnBack)
    }
  }
  
  function searchEmployee(){
    infoEmployee.innerHTML = ""
    openScreen()
    const nome = nomeInput.value
    const funcionario = funcionarios.find(f => removeAcentos(f.nome.toLowerCase()) === removeAcentos(nome.toLowerCase()))
  
      if (funcionario) {
      infoEmployee.innerHTML = `
        <p>Nome: ${funcionario.nome}</p>
        <p>Cargo: ${funcionario.cargo}</p>
        <p>Salário: R$ ${funcionario.salario.toFixed(2).replace(".", ",")}</p>
      `
      const btnDemitir = document.createElement("button")
      btnDemitir.innerText = "Demitir"
      btnDemitir.addEventListener("click", () => {
      const nome = nomeInput.value
      const index = funcionarios.findIndex(f => removeAcentos(f.nome.toLowerCase()) === removeAcentos(nome.toLowerCase()))
  
      if (index !== -1) {
        if (confirm(`Tem certeza que deseja demitir ${funcionario.nome}?`)) {
          funcionarios.splice(index, 1)
          alert("Funcionário demitido!")
          showEmployee()
          closeScreen()
        }
      }
  
  })
      btnAumento(funcionario)
      infoEmployee.appendChild(btnDemitir)
      btnVoltar()
    } else {
      infoEmployee.innerHTML = "<p>Funcionário não encontrado</p>"
    }
  
  }
  
  
  function showEmployee(){
    const employeeList = document.querySelector("#employee-list")
    employeeList.innerHTML = ""
  
  
    funcionarios.forEach(f => {
      const li = document.createElement("li")
      li.innerText = `${f.nome} - ${f.cargo}`
  
      employeeList.appendChild(li)
    })
  }
  
  showEmployee()