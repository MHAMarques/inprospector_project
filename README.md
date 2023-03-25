<h1 style="font-size:48px;color:mediumblue">Projeto Full Stack - inProspector</h1>
<p style="font-size:18px;padding:0px 25px 10px">Projeto Full-stack de catálogo de contatos. Desenvolvimento Front-End em typescript Next.js e Back-End em typescript com Node.js em Express e TypeORM com banco de dados PostgreSQL</p>

<h2 style="font-size:32px;color:mediumblue">Front-End - inProspector Web:</h2>

<h2 style="font-size:32px;color:mediumblue">Back-End - inProspector API:</h2>

Para iniciar a API use <code>npm start</code> para carregar na porta 3030 e nas seguintes rotas:

# /users

<h4><b>POST:</b> Rota disponível sem autenticação ou permissão, usada para cadastro de usuários.</h4>
Request:
<pre>
{
	"name": "Marcelo Henrique",
	"last_name": "Aguiar Marques",
	"email": "mh@mh.app",
	"password": "123456",
	"phone":"31995941235"
}
</pre>
Response: <b>201 Created</b>
<pre>
{
	"id": "7c5a1854-e278-4f15-a55b-03ca280122a8",
	"name": "Marcelo Henrique",
	"last_name": "Aguiar Marques",
	"phone": "31995941235",
	"email": "mh@mh.app",
	"isAdm": false,
	"isActive": true,
	"createdAt": "2023-03-22T17:47:06.980Z",
	"updatedAt": "2023-03-22T17:47:06.980Z"
}
</pre>

<h4><b>GET:</b> Rota disponível somente para usuário autenticado com <b>permissão de administrador</b>, usada para listagem de todos os usuários cadastrados.</h4>
Request:
<pre>
{}
</pre>
Response: <b>200 OK</b>
<pre>
[{
	"id": "117d40a8-2e71-43b6-82b9-28cebf8d9b6b",
	"name": "System",
	"last_name": "Operator",
	"phone": "31995941235",
	"email": "sysop@mh.app.br",
	"isAdm": true,
	"isActive": true,
	"createdAt": "2023-03-22T17:47:04.391Z",
	"updatedAt": "2023-03-22T17:47:04.391Z",
	"prospects": []
},
{
	"id": "7c5a1854-e278-4f15-a55b-03ca280122a8",
	"name": "Marcelo Henrique",
	"last_name": "Aguiar Marques",
	"phone": "31995941235",
	"email": "mh@mh.app",
	"isAdm": false,
	"isActive": true,
	"createdAt": "2023-03-22T17:47:06.980Z",
	"updatedAt": "2023-03-22T17:47:06.980Z",
	"prospects": [{
		"id": "30a3c949-71bd-4689-b473-0b0d73b6a2a1",
		"name": "Mateus",
		"last_name": "Namura",
		"email": "matnamu@gmail.com",
		"phone": "2132002203",
		"linkedin": "https://www.linkedin.com/in/namura/",
		"company": "Shostners & Shostners",
		"job_title": "Software Engineer",
		"information": "Fera da tecnologia está a procura de devs gamers.",
		"createdAt": "2023-03-24T00:43:39.706Z",
		"updatedAt": "2023-03-24T04:14:27.887Z"
	}]
}]
</pre>

# /users/profile

<h4><b>GET:</b> Rota disponível somente para usuário autenticado, usada para pegar as informações do próprio usuário.</h4>
Request:
<pre>
{}
</pre>
Response: <b>200 OK</b>
<pre>
{
	"id": "7c5a1854-e278-4f15-a55b-03ca280122a8",
	"name": "Marcelo Henrique",
	"last_name": "Aguiar Marques",
	"phone": "31995941235",
	"email": "mh@mh.app",
	"isAdm": false,
	"isActive": true,
	"createdAt": "2023-03-22T17:47:06.980Z",
	"updatedAt": "2023-03-22T17:47:06.980Z",
	"prospects": [{
		"id": "30a3c949-71bd-4689-b473-0b0d73b6a2a1",
		"name": "Mateus",
		"last_name": "Namura",
		"email": "matnamu@gmail.com",
		"phone": "2132002203",
		"linkedin": "https://www.linkedin.com/in/namura/",
		"company": "Shostners & Shostners",
		"job_title": "Software Engineer",
		"information": "Fera da tecnologia está a procura de devs gamers.",
		"createdAt": "2023-03-24T00:43:39.706Z",
		"updatedAt": "2023-03-24T04:14:27.887Z"
	}]
}
</pre>

# /users/:user_id

<h4><b>PATCH:</b> Rota disponível somente para usuário autenticado com permissão de administrador ou dono dos dados, usada para atualizar as informações de um usuário pelo id.</h4>
<pre>
Request:
{
	"name": "Marcelo H.",
	"last_name": "A. Marques"
}
</pre>
Response: <b>200 OK</b>
<pre>
{
	"id": "ebece907-ed47-46d3-8375-0733eb2cb7d2",
	"name": "Marcelo H.",
	"last_name": "A. Marques",
	"phone": "31995941235",
	"email": "mh@mh.app",
	"isAdm": false,
	"isActive": true,
	"createdAt": "2023-03-22T16:25:48.979Z",
	"updatedAt": "2023-03-22T16:26:07.413Z"
}
</pre>

<h4><b>DELETE:</b> Rota disponível somente para usuário autenticado com permissão de administrador ou dono dos dados, usada para desativar/ativar uma conta de um usuário pelo id.</h4>
Request:
<pre>
{}
</pre>
Response: <b>204 No Content</b>
<pre>
{}
</pre>

# /login

<h4><b>POST:</b> Rota disponível sem autenticação ou permissão, usada para cadastro de usuários.Request:</h4>
<pre>
{
	"email": "mh@mh.app",
	"password": "123456"
}
</pre>
Response: <b>200 OK</b>
<pre>
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlhdCI6MTY3OTcxNjA4MSwiZXhwIjoxNjc5ODAyNDgxLCJzdWIiOiI3YzVhMTg1NC1lMjc4LTRmMTUtYTU1Yi0wM2NhMjgwMTIyYTgifQ.omTR6v2uvR6caKTPkfg4_HfCnhISNq_9bfMa-lXeCyY"
}
</pre>

# /prospects

<h4><b>POST</b>: Rota disponível somente para usuário autenticado, usada para adicionar um novo prospecto à sua rede de contatos.</h4>
Request:
<pre>
{
	"name": "Gabriel",
	"last_name": "Tsunoda",
	"email": "tsunode@mh.app.br",
	"phone":"5511999993770",
	"linkedin": "https://www.linkedin.com/in/tsunode/",
	"company": "Kenzie Academy Brasil",
	"job_title": "Lead Instructor",
	"information": "Desenvolvedor Full Stack JavaScript e criador de conteúdo."
}
</pre>
Response: <b>201 Created</b>
<pre>
{
	"id": "ce984e45-afb4-4ff7-b2f2-7d235a1a1f88",
	"name": "Gabriel",
	"last_name": "Tsunoda",
	"phone": "5531999993770",
	"email": "tsunode@mh.app.br",
	"linkedin": "https://www.linkedin.com/in/tsunode/",
	"company": "Kenzie Academy Brasil",
	"job_title": "Lead Instructor",
	"information": "Desenvolvedor Full Stack JavaScript e criador de conteúdo.",
	"createdAt": "2023-03-22T17:55:06.986Z",
	"updatedAt": "2023-03-22T17:55:06.986Z"
}
</pre>

<h4><b>GET:</b> Rota disponível somente para usuário autenticado, usada para adicionar um novo prospecto à sua rede de contatos.</h4>
Request:
<pre>
{}
</pre>
Response: <b>200 OK</b>
<pre>
[{
	"id": "ce984e45-afb4-4ff7-b2f2-7d235a1a1f88",
	"name": "Gabriel",
	"last_name": "Tsunoda",
	"phone": "5531999993770",
	"email": "tsunode@kenzie.com.br",
	"linkedin": "https://www.linkedin.com/in/tsunode/",
	"company": "Kenzie Academy Brasil",
	"job_title": "Lead Instructor",
	"information": "Desenvolvedor Full Stack JavaScript e criador de conteúdo.",
	"createdAt": "2023-03-22T17:55:06.986Z",
	"updatedAt": "2023-03-22T17:55:06.986Z"
},
{
	"id": "09bcd9de-e72c-4bb2-a50d-475952438f3f",
	"name": "Robert",
	"last_name": "Nesta",
	"email": "robbie@tuffgong.com",
	"phone": "10034206688",
	"linkedin": "https://www.linkedin.com/in/nestamarley/",
	"company": "Tuff Gong",
	"job_title": "Founder",
	"information": "Proprietário da Tuff Gong International",
	"createdAt": "2023-03-24T00:50:06.798Z",
	"updatedAt": "2023-03-24T00:50:06.798Z"
}]
</pre>

# /prospects/:prospect_id

<h4><b>PATCH:</b> Rota disponível somente para usuário autenticado dono da informção ou conta de administrado, usada para atualizar um prospecto pelo id.</h4>
Request:
<pre>
{
	"email": "tsunoda@kenzie.com.br",
	"phone":"5517999993773",
	"information": "Desenvolvedor Full Stack JavaScript e criador de conteúdo para youTube, Instagram e TikTok"
}
Response: <b>200 OK</b>
{
	"id": "ce984e45-afb4-4ff7-b2f2-7d235a1a1f88",
	"name": "Gabriel",
	"last_name": "Tsunoda",
	"email": "tsunoda@kenzie.com.br",
	"phone": "5517999993773",
	"linkedin": "https://www.linkedin.com/in/tsunode/",
	"company": "Kenzie Academy Brasil",
	"job_title": "Lead Instructor",
	"information": "Desenvolvedor Full Stack JavaScript e criador de conteúdo para youTube, Instagram e TikTok",
	"createdAt": "2023-03-22T17:55:06.986Z",
	"updatedAt": "2023-03-22T17:56:01.237Z"
}
</pre>

<h4><b>DELETE:</b> Rota disponível somente para usuário autenticado dono da informção ou conta de administrado, usada para apagar um prospecto pelo id.</h4>
Request:
<pre>
{}
</pre>
Response: <b>204 No content</b>
<pre>
{}
</pre>
