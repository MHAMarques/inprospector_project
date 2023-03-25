import { IUserLogin,IUserRequest } from "../../interfaces/users";
import { IProspectRequest } from "../../interfaces/prospects";


export const mockedUser : IUserRequest = {
    name: "Marcelo",
	last_name: "Marques",
    email: "mh@mh.app.br",
    isAdm: false,
    password: "123456",
	phone:"31995941235"
}

export const mockedAdmin : IUserRequest = {
    name: "System",
	last_name: "Operator",
    email: "sysop@mh.app.br",
    isAdm: true,
    password: "123456",
	phone:"31995941235"
}

export const mockedUserLogin : IUserLogin = {
    email: "mh@mh.app.br",
    password: "123456"
}

export const mockedAdminLogin : IUserLogin = {
    email: "sysop@mh.app.br",
    password: "123456"
}

export const mockedProspect : IProspectRequest = {
    name: "Gabriel",
    last_name: "Tsunoda",
    email: "tsunode@kenzie.com.br",
    phone:"5531999993770",
    linkedin: "https://www.linkedin.com/in/tsunode/",
    company: "Kenzie Academy Brasil",
    job_title: "Lead Instructor",
    information: "Desenvolvedor Full Stack JavaScript e criador de conteúdo."
  }

