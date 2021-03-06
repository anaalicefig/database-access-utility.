import { expect, describe, test } from '@jest/globals'
import FluentSQLBuilder from '../src/fluentSQL';

const data = [
  {
    id: 0,
    name: 'erick',
    category: 'developer'
  },
  {
    id: 1,
    name: 'ana',
    category: 'developer'
  },
  {
    id: 2,
    name: 'joao',
    category: 'manager'
  }
]

describe('Teste Suit for FluentSQL Bluider', () => {
  test('#for should return a FluentSQBuilder instace',() => {
    const result = FluentSQLBuilder.for(data)
    const expected = new FluentSQLBuilder({ database: data })

    expect(result).toStrictEqual(expected)
  })

  test('#build should return empty object instance', () => {
    const result = FluentSQLBuilder.for(data).build()
    const expected = data

    expect(result).toStrictEqual(expected)
  })

  test('#limit given a collection it should limit results', () => {
    const result = FluentSQLBuilder.for(data).limit(1).build()
    const expected = [data[0]]

    expect(result).toStrictEqual(expected)
  })

  test('#where given a collection it should filter data', () => {
    const result = FluentSQLBuilder.for(data).where({
      category: /^dev/
    }).build()

    const expected = data.filter(({ category }) => category.slice(0, 3) === "dev")

    expect(result).toStrictEqual(expected)
  })

  test('#select given a collection it should return only specific fileds', () => {
    const result = FluentSQLBuilder.for(data)
    .select(['name', 'category'])
    .build()

    const expected = data.map(({ name, category }) => ({ name, category }))

    expect(result).toStrictEqual(expected)

  })

  test('#orderBy given a collection it should return order result by field', () => {
    const result = FluentSQLBuilder.for(data)
    .orderBy('name')
    .build()

    const expected = [
      {
        id: 1,
        name: 'ana',
        category: 'developer'
      },
      {
        id: 0,
        name: 'erick',
        category: 'developer'
      },     
      {
        id: 2,
        name: 'joao',
        category: 'manager'
      }
    ]

    expect(result).toStrictEqual(expected)
  })
  
  test('pipeline', () => {
    const result = FluentSQLBuilder.for(data)
      .select(['name', 'category'])
      .where({ category: "developer" })
      .where({ name: /e/ })
      .orderBy('name')
      .build()    

    const expected = data.filter(({ id }) => id === 0).map(({name, category}) => ({ name, category }))    

    expect(result).toStrictEqual(expected)
  })
})