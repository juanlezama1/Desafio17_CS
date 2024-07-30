import {describe, before, beforeEach, it} from 'mocha'
import { expect } from 'chai'
import supertest from 'supertest'
import __dirname from '../SRC/path.js'

const URL_carts = supertest('http://localhost:8080/carts')
let my_carts
let randomCart

describe("Pruebas en el módulo de Carritos", function() {
   
    // Previo a comenzar todos los tests
    before ( () => {
        console.log("Empezando los tests...")
    })

    // Previo a comenzar cada test.
    beforeEach (() => {
        console.log("Comienza el test:")
    })

    // Test 1
    it ("Corroboro que puedo leer todos los carritos", async () => {

        let result = await URL_carts.get('/')
        expect(result.statusCode).to.be.equal(200)
        expect(result._body).to.be.ok.and.to.be.an("array")
        my_carts = result._body
    })

    // Test 2
    it ("Corroboro que puedo leer un carrito específico mediante su ID", async () => {
 
        const randomCartId = my_carts[0]._id // Id de un carrito específico
        let result = await URL_carts.get(`/${randomCartId}`)
        expect(result.statusCode).to.be.equal(200)
        randomCart = result._body // Contenido de ese carrito
    })

    // Test 3
    it ("Corroboro que puedo vaciar el contenido de un carrito", async () => {
        let result = await URL_carts.delete(`/${randomCart._id}`)
        expect (result.statusCode).to.be.equal(200)
    })

    // Test 4
    it ("Corroboro que puedo actualizar el contenido de un carrito", async () => {

        let result = await URL_carts.put(`/${randomCart._id}`).send({products: randomCart.products})
        expect(result).to.be.equal(200)
    })
})