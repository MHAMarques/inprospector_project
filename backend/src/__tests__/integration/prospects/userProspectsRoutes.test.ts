import request from "supertest"
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import {mockedAdmin, mockedAdminLogin, mockedUser, mockedUserLogin, mockedProspect} from "../../mocks"


describe("/prospects", () => {
    let connection: DataSource;

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Erro para iniciar o Data Source", err);
        })
        await request(app).post('/users').send(mockedUser);
    })

    afterAll(async() => {
        await connection.destroy();
    })

    test("POST: /prospects - Successfully create a prospect",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).post('/prospects').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedProspect);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("last_name");
        expect(response.body).toHaveProperty("phone");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("linkedin");
        expect(response.body).toHaveProperty("company");
        expect(response.body).toHaveProperty("job_title");
        expect(response.body).toHaveProperty("information");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.name).toEqual("Gabriel");
        expect(response.body.last_name).toEqual("Tsunoda");
        expect(response.body.linkedin).toEqual("https://www.linkedin.com/in/tsunode/");
        expect(response.body.company).toEqual("Kenzie Academy Brasil");
        expect(response.body.job_title).toEqual("Lead Instructor");
        expect(response.status).toBe(201);
    })

    test("POST: /prospects - Fail to create a prospect without authentication",async () => {
        const response = await request(app).post('/prospects').send(mockedProspect);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("GET: /prospects - List all prospects from user",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).get('/prospects').set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.body[0].name).toEqual("Gabriel");
        expect(response.status).toBe(200);
    })

    test("PATCH: /prospects/prospect_id - Update a prospect by user",async () => {
        const newValues = {phone:"5511999993777", information: "Desenvolvedor Full Stack JavaScript e criador de conteúdo nas plataformas YouTube, Instagram e TikTok."};
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const token = `Bearer ${userLoginResponse.body.token}`;
        const userProfile = await request(app).get("/users/profile").set("Authorization", token);
        const prospectId = userProfile.body.prospects[0].id;
        const response = await request(app).patch(`/prospects/${prospectId}`).set("Authorization",token).send(newValues);
        const updatedProspect = await request(app).get("/users/profile").set("Authorization", token);
        expect(updatedProspect.body.prospects[0].phone).toEqual("5511999993777");
        expect(response.status).toBe(200);
    })

    test("PATCH: /prospects/prospect_id - Fail to update a prospect with invalid id",async () => {
        const newValues = {phone:"5511999993777", information: "Desenvolvedor Full Stack JavaScript e criador de conteúdo nas plataformas YouTube, Instagram e TikTok."};
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const token = `Bearer ${userLoginResponse.body.token}`;
        const response = await request(app).patch(`/prospects/oitudobm-afb4-4ff7-b2f2-7d235a1a1f88`).set("Authorization",token).send(newValues);
        expect(response.status).toBe(404);
    })

    test("DELETE: /prospects/prospect_id - Delete a prospect by user",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const token = `Bearer ${userLoginResponse.body.token}`;
        const userProfile = await request(app).get("/users/profile").set("Authorization", token);
        const prospectId = userProfile.body.prospects[0].id;
        const response = await request(app).delete(`/prospects/${prospectId}`).set("Authorization",token);
        expect(response.body).not.toHaveProperty("message");
        expect(response.status).toBe(204);
    })

    test("DELETE: /prospects/prospect_id - Fail to update a prospect with invalid id",async () => {
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const token = `Bearer ${userLoginResponse.body.token}`;
        const response = await request(app).patch(`/prospects/oitudobm-afb4-4ff7-b2f2-7d235a1a1f88`).set("Authorization",token);
        expect(response.status).toBe(404);
    })
/*
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
        const userTobeUpdate = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = await request(app).patch(`/users/${userTobeUpdate.body[0].id}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update an user account with an invalid user id",async () => {
        const newValues = {name: "Marcelo H.", email: "marcelohm@mh.app.br"};
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        const token = `Bearer ${userLoginResponse.body.token}`;
        const response = await request(app).patch(`/users/7c5a1854-e278-4f15-a55b-03ca280122ae`).set("Authorization", token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    })

    test("PATCH: /users/user_id - Fail to update isAdm value",async () => {
        const newValues = {isAdm: false};
        const admingLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`;
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token);
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id;
        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update isActive value",async () => {
        const newValues = {isActive: false};
        const admingLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`;
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token);
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id;
        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update id value",async () => {
        const newValues = {id: false};
        const admingLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`;
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token);
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id;
        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Fail to update another user account without an admin account",async () => {
        const newValues = {name: "Jorge"};
        const userLoginResponse = await request(app).post("/login").send(mockedUser);
        const admingLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const userToken = `Bearer ${userLoginResponse.body.token}`;
        const adminToken = `Bearer ${admingLoginResponse.body.token}`;
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", adminToken);
        const userTobeUpdateId = userTobeUpdateRequest.body[1].id;
        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",userToken).send(newValues);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    })

    test("PATCH: /users/user_id - Update user account by admin",async () => {
        const newValues = {name: "Marcelo Henrique", email: "mhmarques@mh.app.br"};
        const admingLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`;
        const userTobeUpdateRequest = await request(app).get("/users").set("Authorization", token);
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id;
        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set("Authorization",token).send(newValues);
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
    */
})