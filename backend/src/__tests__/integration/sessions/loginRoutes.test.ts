import request from "supertest"
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import { mockedAdmin, mockedAdminLogin} from "../../mocks"


describe("/login", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Erro para iniciar o Data Source", err);
        })
        await request(app).post('/users').send(mockedAdmin);
    })

    afterAll(async() => {
        await connection.destroy();
    })

    test("POST: /login - Login with correct user data",async () => {
        const response = await request(app).post("/login").send(mockedAdminLogin);
        expect(response.body).toHaveProperty("token");
        expect(response.status).toBe(200);
    })

    test("POST: /login - Login with wrong user data",async () => {
        const response = await request(app).post("/login").send({
            email: "lewis@mail.com",
            password: "1234567"
        });
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    })
})