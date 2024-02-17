# Порождающие паттерны

Данный материал предназначен для базового представления, что такое паттерны и как с ними работать.<br>

* В первом примере представлено два паттерна: Prototype, Factory <br>
```js
  class Zoo {
    constructor(beast, birds, insects, fish){
        this.beast = beast
        this.birds = birds
        this.insects = insects
        this.fish = fish
    }
  
    //добавляем зверя
    add_beast(name){
        this.beast = name
    }

    get animals(){
        let str = this.beast + ' ' + this.birds + ' ' + this.insects + ' ' + this.fish
        return str
    }
  
    clone(){
        const copy = new Zoo(this.beast, this.birds, this.insects, this.fish)
        return copy
    }
    
    static create (...args) {
        return new Zoo(...args)
    }
  }

  const factory = {
    create (...args) {
        return new Zoo(...args)
    }
  }

  //1
  const zoo = new Zoo('Корова', 'Воробей', 'Комар', 'Сельд')
  console.log('class zoo:')
  console.log(zoo.animals)
  //2 Prototype
  zoo.add_beast('Бык')
  const zoo1 = zoo.clone()
  console.log('class zoo1:')
  console.log(zoo1.animals)
  //3 Factory
  const zoo2 = factory.create('Буйвал','Утка','Муравей','Форель')
  console.log('class zoo2:')
  console.log(zoo2.animals)
```

* Паттерн Builder, удобен тем что мы можем передавать значения в любом порядке:<br>
```js
  class ZooBuilder{
    constructor(){
        this.beast = 'Коза'
        this.birds = 'Курица'
        this.insects = 'Пчела'
        this.fish = 'Треска'
    }

    setBeast (value){
        this.beast = value
        return this
    }

    setBirds (value){
        this.birds = value
        return this
    }

    setInsects (value){
        this.insects = value
        return this
    }

    setFish (value){
        this.fish = value
        return this
    }

    getZoo () {
        return new Zoo(this.beast, this.birds, this.insects, this.fish)
    }

    create () {
        return new ZooBuilder()
    }

    print(){
        console.log(this.beast + ' ' + this.birds + ' ' + this.insects + ' ' + this.fish)
        return this
    }
  }

  const zoobuild = new ZooBuilder
  const printzoo = zoobuild
                  .create()
                  .setBeast('Собака')
                  .setBirds('Петух')
                  .setInsects('Оса')
                  .setFish('Акула')
                  .getZoo()
  console.log(printzoo)
```

* Factory method позволяет подклассам решать, как класс инстанцировать:<br>
(данный пример можно дополнить классом Material и в классе UI сделать условие выбора Стилей, при создании таблицы)
```js
  class UI {
    library(){
        const lib = this.takeLib()
        lib.getTable()
    }

    takeLib(){
        throw Error('Был вызван абстрактный метод')
    }
}

class Bootstrap extends UI {
    takeLib(){
        return new BootTable
    }
}

class BootTable{
    getTable (){
        console.log('table')
        //создаем элемент блочного типа div
        const element = document.createElement('div')
        element.setAttribute("class", "container mt-4");
        element.setAttribute('id', 'contain')
        element.setAttribute('style', 'width: 400px')
        document.body.appendChild(element)

        //создаем таблицу с привязкой стилей Bootstrap 5.3.0
        const table = document.createElement('table')
        table.setAttribute("class", "table table-success table-striped");
        //создаем header в таблице
        const th = table.insertRow()
        const td_1 = th.insertCell()
        td_1.setAttribute('colSpan', '2')
        td_1.setAttribute('style', 'text-align: center')
        td_1.appendChild(document.createTextNode('Таблица Bootstrap'))
        //создаем содержимое таблицы
        for(let i = 0; i < 3; i++){
            // добавляем строки
            const tr = table.insertRow()
            for(let j = 0; j < 2; j++){
                //в строки добавляем столбцы
                const td = tr.insertCell()
                td.setAttribute('style', 'text-align: center')
                td.appendChild(document.createTextNode(`Ячейка ${i}-${j}`))
            }
        }
        //добавляем таблицу на страницу
        document.getElementById('contain').appendChild(table)
    }
  }
  const boot = new Bootstrap
  boot.library()
```

* Abstract factory, использует интерфейс для создания групп связанный объектов, не указывая их конкертный класс:
```js
  class Basket_ball {
    constructor() {
        this.type = 'баскетбольном матче'
    }
}

class Basket_sports {
    constructor() {
        this.type = 'баскетболисты'
    }
}

class Foot_ball {
    constructor() {
        this.type = 'футбольном матче'
    }
}

class Foot_sports {
    constructor() {
        this.type = 'футболисты'
    }
}

class FootballEvent {
    getSportsman(){
        return new Foot_sports
    }

    getEvent(){
        return new Foot_ball
    }
}

class BasketballEvent {
    getSportsman(){
        return new Basket_sports
    }

    getEvent(){
        return new Basket_ball
    }
  }

  function sportsEvent(sportsman, sportev){
    console.log(`На сегодняшнем ${sportev.type} играют крутые ${sportsman.type}!`)
  }

  {
    const factory = new BasketballEvent
    const sportsman = factory.getSportsman()
    const sportev = factory.getEvent()

    sportsEvent(sportsman, sportev)
  }

  {
    const factory = new FootballEvent
    const sportsman = factory.getSportsman()
    const sportev = factory.getEvent()

    sportsEvent(sportsman, sportev)
  }
```

<hr>
