import data from './../database/data.json'
import FluentSQBuilder from './fluentSQL.js'

const result = FluentSQBuilder.for(data)
  .where({ registered: /^(2020|2019)/})
  //^ -> fala que é no inicio
  //$ -> fala que é no fim
  //| -> OU
  .where({ category: /^(security|developer|quality assurance)$/})
  // pareteses literais precisam de scape () => \(\)
  // o grupo (a busca) fica dentro de parenteses (numero1 | numero2)
  .where({ phone: /\((852|890|810)\)/})
  .select(['name', 'company', 'phone', 'category', 'registered'])
  .orderBy('category')
  .limit(3)
  .build()

console.table(result)