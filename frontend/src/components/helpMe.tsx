import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';



export function HelpMe (){
    const navigate = useRouter();
    const help = navigate.query.help;
    if(help == "1"){
        return (
            <div>
                <h2><b>Página de registro</b> (<a href="/signup">/signup</a>):</h2>
                <hr /><br />
                <p>Nesta página você encontra o formulário para criar um novo usuário no sistema com suas informações e dados de acesso.</p>
                <br />
                <p>É importante usar um email de acesso que seja real para confirmações do sistema e uma senha que possa memorizar.</p>
                <br />
                <p>Além dele, existe um link para a página de acesso ao sistema, um link para esta página e um link para a página de ajuda.</p>
            </div>
        )
    }
    if(help == "2"){
        return (
            <div>
                <h2><b>Página de acesso</b> (<a href="/signin">/signin</a>):</h2>
                <hr /><br />
                <p>Nesta página você encontra o formulário de acesso ao sistema.</p>
                <br />
                <p>É preciso enviar a combinação correta de email e password cadastrado na página de registro para obter acesso ao sistema.</p>
                <br />
                <p>Além dele, existe um link para a página de registro para criar uma nova conta no sistema, um link para esta página e um link para a página de ajuda.</p>
            </div>
        )
    }
    if(help == "3"){
        return (
            <div>
                <h2><b>Página do usuário</b> (<a href="/hub">/hub</a>):</h2>
                <hr /><br />
                <p>É a página principal ao acessar o sistema, nela você encontra uma mensagem de boas vindas com a quantidade de prospects cadastrados e 5 links diferentes.</p>
                <br />
                <p>Os 2 principais são para listar os prospects cadastrados e o próximo para adicionar um novo prospect à lista de prospects.</p>
                <br />
                <p>Dos 3 links que ficam na parte de baixo, o primeiro traz a esta página, o segundo permite atualizar as informações do usuário e o terceiro permite finalizar a sessão de acesso do usuário autenticado.</p>
            </div>
        )
    }
    if(help == "4"){
        return (
            <div>
                <h2><b>Adição de prospecto</b> (<a href="/add">/add</a>):</h2>
                <hr /><br />
                <p>Nesta página você encontra o formulário de adição de novos prospectos à lista de contatos do usuário.</p>
                <br />
                <p>É importante preencher todas as informações, no caso do linkedin, é importante informar corretamente o URL para que o link não fique quebrado.</p>
                <br />
                <p>Dos 3 links que ficam na parte de baixo, o primeiro traz a esta página, o segundo permite listar os prospects do usuário e o terceiro permite finalizar a sessão de acesso do usuário autenticado.</p>
            </div>
        )
    }if(help == "5"){
        return (
            <div>
                <h2><b>Listagem de prospectos</b> (<a href="/list">/list</a>):</h2>
                <hr /><br />
                <p>Nesta página você encontra o formulário de adição de novos prospectos à lista de contatos do usuário.</p>
                <br />
                <p>É importante preencher todas as informações, no caso do linkedin, é importante informar corretamente o URL para que o link não fique quebrado.</p>
                <br />
                <p>Dos 3 links que ficam na parte de baixo, o primeiro traz a esta página, o segundo permite listar os prospects do usuário e o terceiro permite finalizar a sessão de acesso do usuário autenticado.</p>
            </div>
        )
    }
    if(help == "6"){
        return (
            <div>
                <h2><b>Mostrar um prospecto</b> (<a href="/list">/list?one=id</a>):</h2>
                <hr /><br />
                <p>Esta página você encontra as informações de um prospect cadastrados pelo usuário.</p>
                <br />
                <p>O nome completo, a empresa que trabalha, o cargo de atuação, o email e telefone para contato, o link de acesso ao perfil de linkedin do prospecto, um link para atualizar esses dados e um campo de texto para salvar informações importantes sobre esse prospecto.</p>
                <br />
                <p>Dos 3 links que ficam na parte de baixo, o primeiro traz a esta página, o segundo permite adicionar um novo prospecto à lista de contatos do usuário e o terceiro permite finalizar a sessão de acesso do usuário autenticado.</p>
            </div>
        )
    }
    if(help == "7"){
        return (
            <div>
                <h2><b>Atualização de dados do usuário</b> (<a href="/update">/update</a>):</h2>
                <hr /><br />
                <p>Nesta página você encontra um formulário com os principais dados do usuário para atualizar e salvar as modificações.</p>
                <br />
                <p>Dos 3 links que ficam na parte de baixo, o primeiro traz a esta página, o segundo permite adicionar um novo prospecto à lista de contatos do usuário e o terceiro permite finalizar a sessão de acesso do usuário autenticado.</p>
            </div>
        )
    }
    if(help == "8"){
        return (
            <div>
                <h2><b>Atualização de dados do prospecto</b> (<a href="/update">/update?one=id</a>):</h2>
                <hr /><br />
                <p>Nesta página você encontra um formulário com os principais dados de um prospecto cadastrado pelo usuário para atualizar e salvar as modificações.</p>
                <br />
                <p>Dos 3 links que ficam na parte de baixo, o primeiro traz a esta página, o segundo permite adicionar um novo prospecto à lista de contatos do usuário e o terceiro permite finalizar a sessão de acesso do usuário autenticado.</p>
            </div>
        )
    }
    if(help == "9"){
        return (
            <div>
                <h2><b>Página de ajuda</b> (<a href="/howto">/howto</a>):</h2>
                <hr /><br />
                <p>Nesta página você encontra informações para te ajudar a passar por cada parte do aplicativo in Prospector.</p>
                <br />
                <p>Dos 3 links que ficam na parte de baixo, o primeiro oferece novas informações de ajuda, o segundo retorna à página de ajuda anterior e o terceiro permite acessar o sistema.</p>
            </div>
        )
    }
    return (
        <div>
            <h2><b>Página principal</b> (<a href="/">/</a>):</h2>
            <hr /><br />
            <p>É a página de entrada do aplicativo, nela você encontra 3 links com acesso à página de registro de nova conta de usuário, 1 link para página de acesso ao sistema e o link que te trouxe aqui, para procurar ajuda sobre como usar.</p>
        </div>
    )
}

