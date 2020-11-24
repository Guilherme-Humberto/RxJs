const { Observable, from, of } = require('rxjs')
const { ajax } = require("rxjs/ajax")
const { map, catchError } = require("rxjs/operators")
const axios = require('axios')

// Criando um observador
// Ele vai receber os eventos
const observable = new Observable.create(subcriber => {
    subcriber.next(1),
    subcriber.next(2),
    subcriber.next(3),
    subcriber.complete()
})
// O subject irá monitorar esses eventos vindos dos observables
observable.subscribe(res => console.log(res))

// O subject pode receber três métodos
// O primerio retorna o resultado se sucesso
// O segundo trata o err
// O terceiro é aviso de que a operação terminou
observable.subscribe({
    next(x) { console.log(x) },
    error(err) { console.log(err) },
    complete() { console.log("Fim na operação") }
})

// Operadores são funções
// Existem operadores para diferentes propósitos, e eles podem ser categorizados como: 
// criação, transformação, filtragem, junção, multicasting, manipulação de erros, utilidade, etc.


// Criando Obervadores de funções
function fetchData(url) {
    return Observable.create(subcriber => {
        axios.get(url)
            .then(res => subcriber.next(res.data))
            .then(() => subcriber.complete())
    })
}

fetchData("http://localhost:3333/films")
    .subscribe(data => console.log(data))

// Operadores de criação
// - [X] From
const arrayList = from (["Java", "JS", "C#", "NodeJS", "React"])
arrayList.forEach(res => console.log(res))

// - [X] Ajax
const observableAjax = ajax({
    url: "http://localhost:3333/films",
    method: "GET"
}).pipe(
    map(response => console.log(response)),
    catchError(error => {
        console.log(error)
        return of(error)
    })
)

observableAjax.subscribe(res => res)
