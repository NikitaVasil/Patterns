//1. Созданеи класса
class Animal {
    constructor(name, voice, type) {
        this.name = name
        this.voice = voice
        this.type = type
    }

    letVoice(){
        console.log(`${this.name} говорит ${this.voice}! ${this.type} очень милая.`);
    }
}
const animal = new Animal('Корова', 'МУ-Му', 'Мурка');
console.log(animal.letVoice());



//2.Наследование
class Cat extends Animal{
    constructor(type){
        super("Кот", "Мяу", type);
    }
}

class Dog extends Animal{
    constructor(type){
        super("Собака", "Гав", type);
    }
}

const cat = new Cat('Матрос');
const dog = new Dog('Пушистик');
console.log(cat.letVoice());
console.log(dog.letVoice());

//3.Цепная стиль
class Manager {
    constructor(){
        this.number = 0
    }
    static create(){
        return new Manager()
    }
    init(n){
        this.number = n
        return this
    }
    log(){
        console.log(this.number)
        return this
    }
    add(n){
        this.number += n
        return this
    }
    multi(n){
        this.number *= n
        return this
    }
    reverse(){
        var digit, result = 0
        var n = this.number
        while( n ){
            digit = n % 10  //  Get right-most digit. Ex. 123/10 → 12.3 → 3
            result = (result * 10) + digit  //  Ex. 123 → 1230 + 4 → 1234
            n = n/10|0  //  Remove right-most digit. Ex. 123 → 12.3 → 12
        }
        this.number = result
        return this
    }
}

Manager.create()
    .init(5)
    .log() // 5
    .add(100)
    .log() // 105
    .multi(1.5)
    .log() // 157,5
    .init(10)
    .log() // 10
    .add(113)
    .reverse()
    .log() // 321

// 4. Доработайте класс Basket
class Basket {
    constructor () {
        this.goods = [{label:'Шоколад', price:30, count:2}]
    }
    
    addGood (label, price, count) {
        this.goods.push(label, price, count)
        return this
    }

    inspect () {
        console.log("| Продукт| Количество |  Общая цена |")
        var bool = false
        var temp = new Array(10)
        let count = 0
        //заполняем массив данными
        for(let i=0; i<this.goods.length; i++){
            if(this.goods[i] != undefined){
                temp[count] = { label: this.goods[i].label, count: this.goods[i].count, price: this.goods[i].price}
                count++
            }
        }

        //обрабатываем массив и проверяем на идентичность данных
        for(let i=0; i<count;i++){
            for(let j=1; j<count; j++){
                if(temp[j] != undefined && temp[i] != undefined){
                    if(temp[i].label == temp[j].label && i != j){
                        temp[i].count = temp[i].count + temp[j].count
                        delete temp[j]
                        if(temp[j+1] != undefined){
                            temp[j] = temp[j+1]
                            delete temp[j+1]
                        }
                        bool = true
                    }
                }
            }
        }

        //выводим данные в консоль
        for(let i=0; i<temp.length; i++){
        
            if(temp[i] != undefined){
                console.log(temp[i].label + " " + temp[i].count + " " + temp[i].price * temp[i].count)
            }
        }
    }

    get totalPrice (){
        let total = 0
        for (let i=0; i<this.goods.length; i++){
            if(this.goods[i] != undefined){
                total += this.goods[i].count * this.goods[i].price
            }
        }
        return total
    }

}

const basket = new Basket

basket.addGood({
    label: 'Молоко',
    price: 120,
    count: 1
})

basket.addGood({
    label: 'Печенье',
    price: 43,
    count: 10
})

basket.addGood({
    label: 'Молоко',
    price: 120,
    count: 2
})

basket.addGood({
    label: 'Печенье',
    price: 43,
    count: 4
})

basket.inspect()
console.log("\nИтого: " + basket.totalPrice)



// 5. Задание
let instance
class UserStatistic {
    constructor() {
        if (instance) {
            // throw new Error("You can only create one instance!");
            console.log('Error, it is possible to initialize the class only once')
        }
        // для работы в браузере
        // document.querySelector('.block').onmousemove = function(event){
        //     event = event || window.event; // кроссбраузерность
        //     console.log(event.offsetX , event.offsetY); // вывод в консоль
        // }
        this.counter = 0
        instance = this
    }
}
const singletonStat = new UserStatistic()
const sing = new UserStatistic()
