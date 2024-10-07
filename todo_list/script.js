const btn = document.querySelector('.btn');
const input = document.querySelector('.input-task');
const ListaCompleta = document.querySelector('.List');


let Lista = [];

async function PegarValorInput(){
    if (input.value){
        Lista.push({
            tarefa : input.value,
            concluido : false
        })
        mostrartarefas()
    }
    else {
        input.placeholder="* Você não digitou nada"
        input.className="input-task input-red"
        setTimeout(() => {
            input.placeholder="O que tenho que fazer..."
            input.className="input-task input-gray"
        }, 2000);
        
    }
    
}

function TarefaConcluida(posicao){
    Lista[posicao].concluido = !Lista[posicao].concluido
    mostrartarefas()
}

function DeletarItem(posicao){
    Lista.splice(posicao, 1)
    mostrartarefas()
}

function RecarregarTarefasLocalStorag(){
    const localstoragecarregameto = localStorage.getItem('lista')
    if (localstoragecarregameto) {
        Lista = JSON.parse(localstoragecarregameto)
    }
    mostrartarefas()
}

function mostrartarefas(){
    let NewList = ''

    Lista.forEach((tarefa, posicao) =>{
        NewList = NewList + `            
            <li class="task ${tarefa.concluido && "done"}"><img onclick="TarefaConcluida(${posicao})" src="source/checked.png" alt="">${tarefa.tarefa}<img onclick="DeletarItem(${posicao})" src="source/trash.png" alt=""></li>
        `
    })

    ListaCompleta.innerHTML = NewList

    input.value=""

    localStorage.setItem('lista', JSON.stringify(Lista))
}


RecarregarTarefasLocalStorag()
btn.addEventListener('click', PegarValorInput)