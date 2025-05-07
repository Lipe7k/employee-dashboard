const funcionarios = [
    {nome: "Felipe Falcirolli", cargo: "Engenheiro de software", salario: 16520},
    {nome: "João Grigorio", cargo: "Segurança", salario: 2500},
    {nome: "Enzo Damasceno", cargo: "Técnico em Hardware", salario: 2133},
    {nome: "Fellipe Teixeira", cargo: "Programador Backend", salario: 12392},
    {nome: "Mariana Almeida", cargo: "Analista de Dados", salario: 8920},
    {nome: "Lucas Barbosa", cargo: "Designer UI/UX", salario: 7350},
    {nome: "Bruna Gonçalves", cargo: "Gerente de Projetos", salario: 11200},
    {nome: "Rafael Cardoso", cargo: "Estagiário de TI", salario: 1500},
    {nome: "Carla Souza", cargo: "Especialista em Segurança da Informação", salario: 10400},
    {nome: "Thiago dos Santos", cargo: "Administrador de Redes", salario: 6790}
  ]
  
  
  const nomeInput = document.querySelector("#nome")
  const searchInput = document.querySelector("#btnSearch")
  const screenEmployee = document.querySelector("#screen-employee")
  const infoEmployee = document.querySelector(".infos-employee")
  const lista = document.getElementById("lista-funcionarios");
  

  nomeInput.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.keyCode === 13) {
      if (nomeInput.value) {
        searchEmployee()
      }
    }
  })

  nomeInput.addEventListener("input", () => {
    const texto = nomeInput.value.toLowerCase();
    lista.innerHTML = "";
  
    if (texto === "") return; 
  
    const filtrados = funcionarios.filter(f => f.nome.toLowerCase().includes(texto));
  
    filtrados.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f.nome;
      li.style.cursor = "pointer";
  
      li.addEventListener("click", () => {
        nomeInput.value = f.nome;
        lista.innerHTML = ""; 
      });
  
      lista.appendChild(li);
    });
  });
  

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
  



  const btnAumento = document.querySelector("#btnAumento")
  const btnDemitir = document.querySelector("#btnDemitir")
  const nameEmployee = document.querySelector("#name-employee")
  const cargoEmployee = document.querySelector("#cargo-employee")
  const salario = document.querySelector("#salario")

  function demitir() {
    const nome = nameEmployee.textContent;
    const funcionario = funcionarios.find(f => removeAcentos(f.nome.toLowerCase()) === removeAcentos(nome.toLowerCase()));
  
    if (!funcionario) {
      notification("Funcionário não encontrado!");
      return;
    }
  
    
    const index = funcionarios.indexOf(funcionario);
    if (index !== -1) {
      funcionarios.splice(index, 1);
      notification(`${funcionario.nome} foi demitido com sucesso!`);
    }

    closeScreen();
    showEmployee(); 
  }
  
  const boxAumento = document.querySelector(".aumento-box")
  const inputAumento = document.querySelector("#aumento")
  const btnConfirmAumento = document.querySelector("#btnConfirmAumento")


  function aumento() {
    btnAumento.style.display = "none";
    boxAumento.style.display = "flex";
  }
  
  btnConfirmAumento.addEventListener("click", () => {
    const nome = nameEmployee.textContent;
    const funcionario = funcionarios.find(f => removeAcentos(f.nome.toLowerCase()) === removeAcentos(nome.toLowerCase()));
  
    if (!funcionario) {
      notification("Funcionário não encontrado!");
      return;
    }
  
    const aumentoPercentual = parseFloat(inputAumento.value);
  
    if (isNaN(aumentoPercentual) || aumentoPercentual <= 0) {
      notification("Aumento inválido");
    } else {
      funcionario.salario += (aumentoPercentual / 100) * funcionario.salario;
      notification(`${funcionario.nome} recebeu aumento! Novo salário: ${funcionario.salario.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`);
    }
  
    inputAumento.value = ""; 
    closeScreen();
    btnAumento.style.display = "block";
    boxAumento.style.display = "none";
    showEmployee();
  });
  

  function exibirFuncionario(funcionario) {
    if(funcionario){
      nameEmployee.textContent = funcionario.nome
      cargoEmployee.textContent = funcionario.cargo
      salario.textContent = funcionario.salario.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
      openScreen()
    } else {
      notification("Funcionário não encontrado! ")
    }
  }
  
  

  function limpaEmployee(){
    nameEmployee.textContent = ""
    cargoEmployee.textContent = ""
    salario.textContent = ""
  }
  
  function searchEmployee(){
    limpaEmployee()
    const nome = nomeInput.value
    const funcionario = funcionarios.find(f => removeAcentos(f.nome.toLowerCase()) === removeAcentos(nome.toLowerCase()))
    
    if (!funcionario) {
      notification("Funcionário não encontrado! ")
      return;
    }
  
    exibirFuncionario(funcionario)
    showEmployee()
  }
  
  
  function notification(msg){

    Toastify({
      text: msg,
      duration: 3000,
      close: true, 
      gravity: "bottom", 
      position: "right", 
      backgroundColor: "white",
      stopOnFocus: true,
      style: {
        color: "black"
      },
      className: "toast-custom"
    }).showToast();
  }
  
  
  
  function showEmployee(){
    const employeeList = document.querySelector("#employee-list")
    employeeList.innerHTML = ""
  
  
    funcionarios.forEach(f => {
      const div = document.createElement("div")
      const li = document.createElement("li")
      li.classList.add("employee")
      const p = document.createElement("p")
      div.innerHTML = `<h4>${f.nome}</h4>
        <p>${f.cargo}</p>`
      p.innerText = f.salario.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})

      li.appendChild(div)
      li.appendChild(p)
  
      employeeList.appendChild(li)

      li.addEventListener("click", () =>{
        exibirFuncionario(f)
        })
      }    
  )}
  
  showEmployee()