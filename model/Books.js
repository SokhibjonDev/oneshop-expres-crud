const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')

class Books {
    constructor(name, year, img) {
        this.name = name
        this.year = year
        this.img = img
    }

    toObj() {
        return {
            name: this.name,
            year: +this.year,
            img: this.img,
            id: uuid()
        }
    }

    async save() {
        const books = await Books.getAll()
        const book = this.toObj()

        books.push(book)
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'books.json'),
                JSON.stringify({ books }),
                (err) => {
                    if (err) reject(err)
                    else resolve()
                })
        })
    }

    static async removeById(id) {
        let books = await Books.getAll()
        return new Promise((resolve, reject) => {
            let idx = books.findIndex(book => book.id === id)
            if (idx === -1) {
                return reject('Book id is not true')
            }
            books.splice(idx, 1)
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'books.json'),
                JSON.stringify({ books }),
                (err) => {
                    if (err) reject(err)
                    else resolve()
                })
        })
    }

    static async getAll() {
        return new Promise((resolve, reject) => {

            fs.readFile(path.join(__dirname, '..', 'data', 'books.json'), 'utf-8', (err, content) => {
                if (err) reject(err)
                else resolve(JSON.parse(content).books)
            })
        })
    }

    async updateById(id) {
        const books = await Books.getAll()
        const book = this.toObj()
        let idx = books.findIndex(book => book.id === id)
        books[idx] = book

        
        return new Promise((resolve, rej) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "books.json"),
                JSON.stringify({ books }),
                (err)=>{
                    if(err) rej(err)
                    else resolve()
                }
                )
        })
    }

}

module.exports = Books