//AsyncSubject
import { AsyncSubject } from "rxjs/AsyncSubject";

var subject = new AsyncSubject()

subject.subscribe(
    data => addItem('Observer 1: ' + data),
    err => addItem(err),
    () => addItem('Observer 1 completed')
);

var i = 1;
var int = setInterval(() => subject.next(i++), 100);

setTimeout(() => {
    var observer2 = subject.subscribe(
        data => addItem('Observer 2: ' + data)
    )
    subject.complete() //eventy su poskytnute observerom len ak je zavolana complete()
}, 500);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
} 

/*
//Reply subject
import { ReplaySubject } from "rxjs/ReplaySubject";

var subject = new ReplaySubject(30, 500) //poskytne 30 poslenych eventov ktore sa uskutocnili pred 500ms od prihlasenia noveho subscibera

subject.subscribe(
    data => addItem('Observer 1: ' + data),
    err => addItem(err),
    () => addItem('Observer 1 completed')
);

var i = 1;
var int = setInterval(() => subject.next(i++), 100);

setTimeout(() => {
    var observer2 = subject.subscribe(
        data => addItem('Observer 2: ' + data)
    )
}, 500);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
} 
*/

/*
//Reply subject
import { ReplaySubject } from "rxjs/ReplaySubject";

//var subject = new ReplaySubject(2) //poskytne 2 posledne eventy novemu subsciberovi
var subject = new ReplaySubject(30, 200) //poskytne 30 poslenych eventov ktore

subject.subscribe(
    data => addItem('Observer 1: ' + data),
    err => addItem(err),
    () => addItem('Observer 1 completed')
);

subject.next('The first thing has been sent')
subject.next('Another thing has been sent')
subject.next('Observer2 is about to subscribe')

var observer2 = subject.subscribe(
    data => addItem('Observer 2: ' + data)
)

subject.next('The second thing has been sent');
subject.next('A third thing has been sent');

observer2.unsubscribe();

subject.next('Final thing has been sent');

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
} 
*/

/*
//Behavior subject
import { BehaviorSubject } from "rxjs/BehaviorSubject";

var subject = new BehaviorSubject('First') //potrebna definicia prveho argumentu

subject.subscribe(
    data => addItem('Observer 1: ' + data),
    err => addItem(err),
    () => addItem('Observer 1 completed')
);

subject.next('The first thing has been sent')
subject.next('Observer2 is about to subscribe')

var observer2 = subject.subscribe(
    data => addItem('Observer 2: ' + data)
)

subject.next('The second thing has been sent');
subject.next('A third thing has been sent');

observer2.unsubscribe();

subject.next('Final thing has been sent');

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
} */

//Subject 
/*
import { Subject } from "rxjs/Subject";

var subject = new Subject()

subject.subscribe(
    data => addItem('Observer 1: ' + data),
    err => addItem(err),
    () => addItem('Observer 1 completed')
);

subject.next('The first thing has been sent')

var observer2 = subject.subscribe( //neziska 1 next pretoze je vytvoreny neskor ako 1. next
    data => addItem('Observer 2: ' + data)
)

subject.next('The second thing has been sent');
subject.next('A third thing has been sent');

observer2.unsubscribe();

subject.next('Final thing has been sent');

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
} 
*/

//vytvorenie Observable z eventov
/*
import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/Observable/fromEvent";


var observable = fromEvent(document, 'mousemove'); //vytvori 'next' pri pohybe mysi 

setTimeout(() => {
    var subscription = observable.subscribe(
        (x: any) => addItem(x)
    )
}, 2000);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
} 
*/

// Observable zaklady
/* 
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/share';

var observable = Observable.create((observer: any) => {
    //producer
    try {
        observer.next('Hey guys!');
        observer.next('How are you?');
        setInterval(() => { //fnc je volana za kazdy definovany interval
            observer.next('I am good')
        }, 2000)
        //observer.complete();
        //observer.next('This will not send'); //neposle sa lebo observer bol oznaceny ako complete
    } catch(err) {
        observer.error(err) //v pripade erroru
    }
})
.share(); //zabezpeci ze subscriber2 odeberie len udaje ktore boli dostupne (next) od casu jeho pridania (pr. I am good)

//subscribe dostane vsetko co bolo poslane z next
var observer = observable.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem('Completed')
);

/*
//definicia dalsieho subscribera pre rovnaky zdroj
var observer2 = observable.subscribe(
    (x:any) => addItem(x)
);
observer.add(observer2); //definicia child observera, pr. ak je parent observer unsubsribed tak je aj child

setTimeout(() => { //fnc sa vykona po vyprsani timeoutu
    //observer.unsubscribe(); //zrusenie odberu
    var observer2 = observable.subscribe(
        (x:any) => addItem('Subscriber 2: ' + x)
    );
}, 1001);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
} 
*/