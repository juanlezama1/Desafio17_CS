import {describe, before, beforeEach, it} from 'mocha'
import { expect } from 'chai'
import supertest from 'supertest'
import __dirname from '../SRC/path.js'

const URL_products = supertest('http://localhost:8080/products')
let create_result

describe("Pruebas en el módulo de Productos", function() {
   
    // Previo a comenzar todos los tests
    before ( () => {
        console.log("Empezando los tests...")
    })

    // Previo a comenzar cada test.
    beforeEach (() => {
        console.log("Comienza el test:")
    })

    // Test 1
    it ("Corroboro que puedo leer todos los productos", async () => {

        let productos = await URL_products.get('/pagination')
        expect (productos.statusCode).to.be.equal(200)
        expect(productos._body.docs).to.be.ok.and.to.be.an("array")
    })

    // Test 2
    it ("Corroboro que puedo crear un producto", async () => {

        const my_product = {
            title: "Yerba Mate Cósmico",
            description: "500g - Libre de gluten",
            price: 3500,
            thumbnail: `../../public/img/yerba.jpg`,
            stock: 90,
            category: 'Other',
            status: true
        }

        create_result = await URL_products.post('/').send(my_product)
        expect (create_result.statusCode).to.be.equal(200)
    })

    // Test 3
    it ("Corroboro que puedo leer el producto creado", async () => {

        const read_response = await URL_products.get(`/${create_result._body._id}`)
        expect(read_response.statusCode).to.be.equal(200)
    })

    // Test 4
    it ("Corroboro que puedo actualizar el producto creado", async () => {

        const update_response = await URL_products.put(`/${create_result._body._id}`).send({price: 4000})
        expect(update_response.statusCode).to.be.equal(200)
    })

    // Test 5
    it ("Corroboro que puedo borrar el producto creado", async () => {

        const delete_response = await URL_products.delete(`/${create_result._body._id}`)
        expect(delete_response.statusCode).to.be.equal(200)
    })    
})