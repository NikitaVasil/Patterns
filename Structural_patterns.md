# Структурные паттерны

1. Паттерн Adapter:

```js
  class Adapter {
    constructor(className) {
        this.className = className
    }

    setName(key,value){
        this.className.setItem(key, value)
    }

    getName(key){
        return this.className.getItem(key)
    }

    clearName(){
        this.className.clear()
    }
  }

  const lcStor = new Adapter(localStorage)
  //проверка нашего Адаптера
  lcStor.setName('name1', 'Nikita')
  lcStor.setName('name2', 'Nastya')
  lcStor.clearName()
  console.log(lcStor.getName('name1'))
  console.log(lcStor.getName('name2'))
  lcStor.setName('name2', 'Nastya')
  console.log(lcStor.getName('name2'))
```

2. Паттерн Bridge:

```js
  class Shop {
    constructor(client, mood, room) {
        this.client = client
        this.mood = mood
        this.room = room

        this.clients = new Clients(this)
        this.moods = new Mood(this)
        this.place = new Rooms(this)
    }
  }

  class Clients {
    constructor(person) {
        this.person = person
    }

    buys() {
        console.log(`${this.person.client} приехал в ТЦ за покупками!`)
    }
  }  

  class Mood {
    constructor(good){
        this.good = good
    }

    feeling() {
        console.log(`У него ${this.good.mood} настроение`)
    }
  }

  class Rooms {
    constructor(rooms){
        this.rooms = rooms
    }

    love_shop() {
        console.log(`Так как в этом ТЦ находится его любимый магазин ${this.rooms.room}`)
    }
  }

  const shop = new Shop('Никита', 'отличное', 'Технопарк')
  shop.clients.buys()
  shop.moods.feeling()
  shop.place.love_shop()
```

3. Паттерн Composite:

```js
  class Technic {
    constructor(price, weight) {
        this.price = price
        this.weight = weight
    }
  }

  class Composite {
	  constructor (label) {
		  this.label = label
		  this.items = []
	  }

	  add (item) {
		  this.items.push(item)
	  }

	  get price () {
		  return this.items.reduce((p, e) => p + e.price, 0)
	  }

    get weight() {
        return this.items.reduce((p, e) => p + e.weight, 0)
    }
  }

  const smartphone = new Composite('Смартфоны')
  smartphone.add(new Technic(12000, 800))
  smartphone.add(new Technic(8000, 540))
  smartphone.add(new Technic(10000, 700))

  console.log(`Общая цена категории "${smartphone.label}" составила ${smartphone.price}"`)
  console.log(`Общий вес "${smartphone.label}" составил ${smartphone.weight}"`)
  console.log('--------------------------------')

  const noutbook = new Composite('Ноутбуки')
  noutbook.add(new Technic(25000, 2800))
  noutbook.add(new Technic(40000, 4540))
  noutbook.add(new Technic(100000, 5700))

  console.log(`Общая цена категории "${noutbook.label}" составила ${noutbook.price}"`)
  console.log(`Общий вес "${noutbook.label}" составил ${noutbook.weight}"`)
```

4. Паттерн Decorator:

```js
  class Ball {
    constructor() {
        this.ball = "Мячь"
    }

    inventory() {
        return this.ball
    }
  }

  class Ski {
    constructor(ball){
        this.ball = ball
    }

    inventory() {
        let str = this.ball.inventory()
        if (str.includes("Шайба")){
            str = str.replace("Шайба", "Лыжи")
            return str
        }
        else if (str.includes("Мячь")){
            str = str.replace("Мячь", "Лыжи")
            return str
        }
        else if (str.includes("Сноуборд")){
            str = str.replace("Сноуборд", "Лыжи")
            return str
        }
    }
  }

  class Puck {
    constructor(ball){
        this.ball = ball
    }
    
    inventory() {
        let str = this.ball.inventory()
        if (str.includes("Лыжи")){
            str = str.replace("Лыжи", "Шайба")
            return str
        }
        else if (str.includes("Мячь")){
            str = str.replace("Мячь", "Шайба")
            return str
        }
        else if (str.includes("Сноуборд")){
            str = str.replace("Сноуборд", "Шайба")
            return str
        }
    }
  }

  class Snowboard {
    constructor(ball){
        this.ball = ball
    }

    inventory(){
        let str = this.ball.inventory()
        if (str.includes("Лыжи")){
            str = str.replace("Лыжи", "Сноуборд")
            return str
        }
        else if (str.includes("Мячь")){
            str = str.replace("Мячь", "Сноуборд")
            return str
        }
        else if (str.includes("Шайба")){
            str = str.replace("Шайба", "Сноуборд")
            return str
        }
    }
  }

  let ball = new Ball()
  console.log(ball.inventory())
  console.log('меняется на')
  ball = new Ski(ball)
  console.log(ball.inventory())
  console.log('меняется на')
  ball = new Puck(ball)
  console.log(ball.inventory())
  console.log('меняется на')
  ball = new Snowboard(ball)
  console.log(ball.inventory())
  console.log('меняется на')
  ball = new Ball()
  console.log(ball.inventory())
```

5. Паттерн Facade:
```js
  class Grade {
    constructor(name) {
        this.name = name
    }
  }

  class Pupil {
    constructor(name) {
        this.name = name
    }
  }

  class School {
    constructor(name) {
        this.name = name
        this.school = []
    }

    addGrade(grade) {
        this.school.push(grade)
    }
  }


  class CDPE {
    constructor(school) {
        this.pupils = []
        this.school = school
    }

    addPupil(pupil){
        const pupName = new Pupil(pupil)
        this.pupils.push(pupName.name)
    }

    send() {
        const academy = new School(this.school.number)
        const grade = new Grade(this.school.grades)
        academy.addGrade(this.school.grades)

        console.log(`Школа: ${academy.name}\nКласс: ${grade.name}`)
        console.log(`Ученики:`)
        this.pupils.forEach((element) => console.log(element))
    }
  }

  const cdpe = new CDPE({
    number: 1283,
    grades: '7A'
  })

  cdpe.addPupil('Никита')
  cdpe.addPupil('Юля')
  cdpe.addPupil('Маруся')
  cdpe.addPupil('Елена')
  cdpe.send()
```

6. Паттерн Flyweight:
```js
  class Transport{
    constructor(brand, type){
        this.brand = brand
        this.type = type
    }
  }

  class Flyweight{
    constructor(...args){
        this.categories = args
        this.items = []
    }

    add(...param) {
        this.items.push(param.map((v, i) => this.categories[i].indexOf(v)))
    }

    get transport() {
        const instance = this

		return (function * () {
			for (const item of instance.items) {
				yield new Transport(
					...item.map((v, i) => instance.categories[i][v])
				)
			}
		})()
    }
  }

  const car = new Flyweight(
    ['BMW', 'Lexus', 'Volvo', 'KIA'],
    ['universal', 'hatchback', 'sedan']
  )

  car.add('BMW', 'sedan')
  car.add('KIA', 'universal')
  car.add('Lexus', 'sedan')

  for (const transport of car.transport) {
	  console.log(transport)
  }
```

7. Использование паттерна поумолчанию Proxy:
```js
  const pupilProxy = new Pupil('Nikita')
  const pupil = new Proxy(pupilProxy, {
    get: (obj, prop) => {
        console.log(`The значение of ${prop} is ${obj[prop]}`);
    }
  })
pupil.name
```
