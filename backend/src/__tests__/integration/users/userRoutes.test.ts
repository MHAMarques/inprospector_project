import request from "supertest"
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import {mockedAdmin, mockedAdminLogin, mockedUser, mockedUserLogin} from "../../mocks"


describe("/users", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Erro para iniciar o Data Source", err);
        })
    })

    afterAll(async() => {
        await connection.destroy();
    })

    test("POST: /users - Successfully create a new user",async () => {
        const response = await request(app).post('/users').send(mockedUser);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("last_name");
        expect(response.body).toHaveProperty("phone");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("isAdm");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.name).toEqual("Marcelo");
        expect(response.body.last_name).toEqual("Marques");
        expect(response.body.email).toEqual("mh@mh.app.br");
        expect(response.body.isAdm).toEqual(false);
        expect(response.body.isActive).toEqual(true);
        expect(response.status).toBe(201);
    })

    test("POST: /users - Fail to create a duplicate user",async () => {
        const response = await request(app).post('/users').send(mockedUser);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    })

    test("GET: /users - List users with an admin account",async () => {
        await request(app).post('/users').send(mockedAdmin);
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveLength(2);
    })

    test("GET: /users - Fail to list users without authentication",async () => {
        const response = await request(app).get('/users');
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("GET: /users - Fail to list users without an admin account",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    })

    test("PATCH: /users/user_id - Fail to update an user account without authentication ",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const updateUserRequest = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = await request(app).patch(`/users/${updateUserRequest.body[0].id}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update an user account with an invalid user id",async () => {
        const newValues = {name: "Marcelo H.", email: "marcelohm@mh.app.br"};
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const token = `Bearer ${userLoginResponse.body.token}`;
        const response = await request(app).patch(`/users/oitubobm-e278-4f15-a55b-03ca280122ae`).set("Authorization", token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    })

    test("PATCH: /users/user_id - Fail to update isAdm value",async () => {
        const newValues = {isAdm: false};
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const updateUserRequest = await request(app).get("/users").set("Authorization", token);
        const updateUserId = updateUserRequest.body[0].id;
        const response = await request(app).patch(`/users/${updateUserId}`).set("Authorization",token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update isActive value",async () => {
        const newValues = {isActive: false};
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const updateUserRequest = await request(app).get("/users").set("Authorization", token);
        const updateUserId = updateUserRequest.body[0].id;
        const response = await request(app).patch(`/users/${updateUserId}`).set("Authorization",token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update id value",async () => {
        const newValues = {id: false};
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const updateUserRequest = await request(app).get("/users").set("Authorization", token);
        const updateUserId = updateUserRequest.body[0].id;
        const response = await request(app).patch(`/users/${updateUserId}`).set("Authorization",token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update another user account without an admin account",async () => {
        const newValues = {name: "Jorge"};
        const userLoginResponse = await request(app).post("/login").send(mockedUser);
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const userToken = `Bearer ${userLoginResponse.body.token}`;
        const adminToken = `Bearer ${adminLoginResponse.body.token}`;
        const updateUserRequest = await request(app).get("/users").set("Authorization", adminToken);
        const updateUserId = updateUserRequest.body[1].id;
        const response = await request(app).patch(`/users/${updateUserId}`).set("Authorization",userToken).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Update user account by admin",async () => {
        const newValues = {name: "Marcelo Henrique", email: "mhmarques@mh.app.br"};
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${adminLoginResponse.body.token}`;
        const updateUserRequest = await request(app).get("/users").set("Authorization", token);
        const updateUserId = updateUserRequest.body[0].id;
        const response = await request(app).patch(`/users/${updateUserId}`).set("Authorization",token).send(newValues);
        const userUpdated = await request(app).get("/users").set("Authorization", token);
        expect(response.status).toBe(200);
        expect(userUpdated.body[0].name).toEqual("Marcelo Henrique");
        expect(userUpdated.body[0]).not.toHaveProperty("password");
    })

    test("DELETE: /users/user_id - Fail to delete an user account without authentication",async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("DELETE: /users/user_id - Successfully deactivate an user account",async () => {
        await request(app).post('/users').send(mockedAdmin);
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const findUser = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(204);
        expect(findUser.body[0].isActive).toBe(false);
    })

    test("DELETE: /users/user_id - Successfully reactivate an user account",async () => {
        await request(app).post('/users').send(mockedAdmin);
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const findUser = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(204);
        expect(findUser.body[0].isActive).toBe(true);
    })

    test("DELETE: /users/user_id - Fail to deactivate an invalid user id",async () => {
        await request(app).post('/users').send(mockedAdmin);
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    })
})