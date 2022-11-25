//Pegar dados da Lista.json
async function getLista () {
  const url = 'lista.json'
   await fetch(url)
    .then ( response => response.json())
    .then (data => {
      if(data.erro){
        console.log("Erro ao acessar o JSON")
        return
      } else {
        listarDados(data);
        listarProfessores(data);
       // return data;     
      }
      return data;
    })
  }
  //Listar Alunos
  function listarDados(dados){
      //let faculdade = dados;
      let id = [1]
      let curso = dados.curso
      var count = 0; 

      for(var x in curso){
        let todosAlunos = curso[x].aluno
          for(var c in todosAlunos){
            let aluno = todosAlunos[c]
              for (const [key, value] of Object.entries(aluno)) {
                if(key === 'Numero_Matricula')
                  var num_matricula = value;
                  else if(key === 'Nome')
                    var nome_aluno = value;
                    else if(key === 'Data_Nascimento')
                      var data_nasc = value;
                      else if(key === 'Disciplina') 
                        var disciplina = value;     
                        else if(key === 'Nota')
                          var nota = value;
              }
                  //Criar DIV do aluno
                  var cardAluno = document.createElement('div')
                  cardAluno.setAttribute('id', `card${id}`);
                  cardAluno.classList =`card`;
                  let seccaoAlunos = document.querySelector(".cards-alunos");
                  cardAluno.innerHTML= `
                            <img src="./img/img_avatar.png" alt="Avatar">
                            <div class="dados">
                              <h4 id="nome_aluno${id}"><b>${nome_aluno} </b>
                                <i class="fa fa-pencil-square-o" aria-hidden="true" id="myBtn" 
                                onclick="editar_aluno(${id})"></i>
                              </h4>
                              <p>Nº matrícula: <span id="matricula${id}">${num_matricula}</span></p>
                              <p>Data de Nascimento: <span id="data_nasc${id}">${data_nasc}</span></p>
                              <table class="rTable">
                                <thead>
                                 <tr>
                                    <th>Disciplinas</th>
                                    <th>Notas</th>
                                  </tr>
                                  </thead>
                                    <tbody id="dn${count}">
                                    </tbody> 
                                </table>
                               </div>  
                                    
                            `;
                  
                      seccaoAlunos.appendChild(cardAluno)
                      id++
                      
                      
                     for(var d=0; d < disciplina.length; d++){
                        var criatr = document.createElement('tr')
                        var getclasse = document.querySelector(`#dn${count}`);
                        criatr.innerHTML+= `<td>${disciplina[d]}</td>
                                            <td>${nota[d]}</td>`;
                                         getclasse.appendChild(criatr);
                                         if(d == disciplina.length-1){
                                            count++
                                            seccaoAlunos.appendChild(cardAluno)
                                          } 
                        }
            }
        }
}
function editar_aluno(num){
  
  // Get the modal
    var modal = document.getElementById("myModal");

    modal.innerHTML = `<div class="modal-content" id="modal-content">
    <span class="close">&times;</span>
    <div class="card" id="edit">
      <img src="./img/img_avatar.png" alt="Avatar">
      <div class="dados">
        <!--<i class="fa fa-times-circle-o" aria-hidden="true"></i></i> 
        <i class="fa fa-check-square-o" aria-hidden="true"></i>>-->
        
        <i class="fa fa-check-square-o" aria-hidden="true" onclick="gravarEdit(${num})"></i><br>
        <input type="text" name="nameEdit" id="nameEdit" value=""> 
        <p>Nº matrícula: <input type="number" name="matriculaEdit" id="matriculaEdit" value=""> </p>
        <p>Data de Nascimento: <input type="text" name="dateEdit" id="dateEdit" value=""> </p>
        
      </div>
      </div>
    </div>`;

  // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
    modal.style.display = "block";
  //}

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
//pegar os campos
      var edit = document.getElementById('edit')
      var nome_aluno = document.getElementById(`nome_aluno${num}`).innerText;
      var num_matricula = document.getElementById(`matricula${num}`).innerText;
      var data_nasc = document.getElementById(`data_nasc${num}`).innerText;
  //preencher os campos
      edit.removeAttribute= ("hidden");
      document.getElementById('nameEdit').value = nome_aluno;
      document.getElementById('matriculaEdit').value = num_matricula;
      document.getElementById('dateEdit').value = data_nasc;
               
              
}
function gravarEdit(num){
  
  var novoNome = document.getElementById(`nameEdit`).value;
  var novoNum = document.getElementById(`matriculaEdit`).value;
  var novaData = document.getElementById(`dateEdit`).value;
  console.log(novoNome,novoNum,novaData)
  if((novoNome != '') && (novoNum != '') && (novaData != '')){
    console.log("Estourou")
      // Get the modal
      var modal = document.getElementById("myModal");
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on the button, open the modal
        modal.style.display = "block";
      //}
    
      // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
      }
    
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    document.getElementById(`card${num}`);
    document.getElementById(`nome_aluno${num}`).innerText = novoNome;
    document.getElementById(`matricula${num}`).innerText= novoNum;
    document.getElementById(`data_nasc${num}`).innerText = novaData;
  }
    
    

}
function showAdd(){
  var mostrarAddAluno = document.querySelector('.add_aluno');
  mostrarAddAluno.style.display = 'grid';
}
function adicionar_aluno(){
  
    var nome = document.getElementById("novo_aluno").value;
    var datanasc = document.getElementById("nova_datanasc").value;
    var matricula = document.getElementById("novo_nrmatricula").value;
    var curso = document.getElementById("scurso").value;
    var disc1 = document.getElementById("nova_disciplina1").value;
    var nota1 = document.getElementById("nova_nota1").value;
    var disc2 = document.getElementById("nova_disciplina2").value;
    var nota2 = document.getElementById("nova_nota2").value;
    var disc3 = document.getElementById("nova_disciplina3").value;
    var nota3 = document.getElementById("nova_nota3").value;
    if((nome && matricula && datanasc && disc1 && nota1 && disc2 && nota2 && disc3 && nota3) != ''){
        registar_aluno(nome,matricula,datanasc,curso,disc1,nota1,disc2,nota2,disc3,nota3);
    }else{
      alert("Por favor, todos os campos tem que ser preenchidos")
      showAdd()
      
    }
}
function registar_aluno(nome,matricula,datanasc,curso,disc1,nota1,disc2,nota2,disc3,nota3){

  alert("Aluno Registado com sucesso")
  //novo card
  let newcard = document.createElement('div')
  //classe do elemento
    newcard.classList ="card";
    newcard.setAttribute('id', 'card');
    let new_aluno = document.querySelector(".cards-alunos");
    newcard.innerHTML = `<img src="./img/img_avatar.png" alt="Avatar">
      <div class="dados">
        <h4><b>${nome} </b><i class="fa fa-pencil-square-o" aria-hidden="true" onclick="editar_aluno(${matricula})"></i></h4>
        <p>Nº matrícula: ${matricula}</p>
        <p>Data de Nascimento: ${datanasc}</p>
        <table class="rTable">
          <thead>
            <tr>
              <th>Disciplinas</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${disc1}</td>
              <td>${nota1}</td>
            </tr>
          
            <tr>
              <td>${disc2}</td>
              <td>${nota2}</td>
            </tr>
        
            <tr>
              <td>${disc3}</td>
              <td>${nota3}</td>
            </tr>
          </tbody>
        </table>
      </div>`;
  //inserindo card
    new_aluno.appendChild(newcard);
    var mostrarAddAluno = document.querySelector('.add_aluno');

    var mostrarAddAluno = document.querySelector('.add_aluno');
    mostrarAddAluno.style.display = 'none';


}
  function listarProfessores(dados){

      let curso = dados.curso
    for(var x in curso){
        let todosProfessores = curso[x].professor
          for(var c in todosProfessores){
            let professor = todosProfessores[c]
            for (const [chave, valor] of Object.entries(professor)) {
              if(chave === 'Nome')
                var prof = valor;
                  else if(chave === 'Data_Nascimento')
                    var data_nasc = valor;
                    else if(chave === 'Disciplina')
                      var disciplina = valor;
                      else if(chave === 'Salario')
                        var salario = valor;
              }
              var cardProfessores = document.createElement('tr')
              var seccaoProfessores = document.querySelector("#rowProf");
              cardProfessores.innerHTML= `
                    <td> ${prof} </td>
                    <td>${data_nasc}</td>
                    <td>${salario}</td>
                    <td>${disciplina}</td>
                    <td><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td> 
                    `;
              seccaoProfessores.appendChild(cardProfessores);
          }
        }
    }
    
          
  // Filtro semestre Arcoddion
  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");
  
      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  //select curso

  const select = document.getElementById('scurso');
  const selectsemestre = document.getElementById('selecionarCurso');
  console.log(getLista())
    for (let i = 0; i < listaCursos.length; i++){
      //criar option
      let option = document.createElement('option')
      let optionsemestre = document.createElement('option')
      option.value= listaCursos[i].curso;
      optionsemestre.value= listaCursos[i].curso;
      const valor = document.createTextNode(listaCursos[i].curso);
      const valorsemestre = document.createTextNode(listaCursos[i].curso);
      option.appendChild(valor);
      optionsemestre.appendChild(valorsemestre);
      select.appendChild(option);
      selectsemestre.appendChild(optionsemestre);
    }
getLista();