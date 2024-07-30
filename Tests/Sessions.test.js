import {describe, before, beforeEach, it} from 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import __dirname from '../SRC/path.js'

const baseURL = 'http://localhost:8080'

const certain_user = {
    email: "juanpablolezama92@gmail.com",
    password: "bruno123456"
}

describe("Pruebas en el módulo de Sesiones", function() {

    let agente
   
    // Previo a comenzar todos los tests
    before ( () => {
        console.log("Empezando los tests...")
        agente = request.agent(baseURL) // Agente que se mantiene activo entre solicitudes (sino no trae el REQ)
    })

    // Previo a comenzar cada test.
    beforeEach (() => {
        console.log("Comienza el test:")
    })

    // Test 1
    it ("Corroboro que puedo loguearme correctamente", async () => {

        const login_response = await agente.post('/sessions/login').send(certain_user)
        expect(login_response.statusCode).to.be.ok.and.equal(200)
    })

    // Test 2
    it ("Verifico mi sesión activa", async () => {

        const current_session = await agente.get('/sessions/current')
        expect(current_session.statusCode).to.be.ok.and.equal(200)
        expect(current_session.body.email).to.be.equal(certain_user.email)
    })

    // Test 3
    it ("Corroboro que puedo cerrar la sesión", async () => {
    
        const logout_result = await agente.get('/sessions/logout')
        expect(logout_result.statusCode).to.be.ok.and.equal(200)
    })
})