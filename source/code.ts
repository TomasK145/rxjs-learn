import { Observable } from "rxjs/Observable";
import { fromEvent } from "rxjs/Observable/fromEvent";

//vytvorenie Observable z eventov
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