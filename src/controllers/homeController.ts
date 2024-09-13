import { FastifyReply, FastifyRequest } from 'fastify';

export const getHomePage = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const imgUrl = 'https://i.imgur.com/fT1jEyc.jpeg';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro e Login</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f0f2f5;
                color: #333;
                margin: 0;
                padding: 0;
                display: flex;
                background-position: center;
                background-image: url('${imgUrl}');
                background-repeat: no-repeat;
                background-size: cover;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            
            .container {
                background: white;
                border-radius: 15px;
                padding: 40px;
                max-width: 350px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .container h2 {
                font-size: 24px;
                margin-bottom: 20px;
                color: ##00cc73;
            }

            input {
                width: calc(100% - 20px);
                padding: 10px;
                margin: 8px 0;
                border-radius: 5px;
                border: 1px solid #ddd;
                outline: none;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
            }

            button {
                width: 100%;
                padding: 12px;
                background-color: #00cc73; 
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                margin-top: 10px;
                font-size: 16px;
            }

            button:hover {
                background-color: #008f7a;
            }

            .divider {
                margin: 20px 0;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Cadastro</h2>
            <form id="registerForm">
                <input type="text" id="username" placeholder="Nome de Usuário" required>
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Senha" required>
                <button type="submit">Cadastrar</button>
            </form>

            <h2>Login</h2>
            <form id="loginForm">
                <input type="email" id="loginEmail" placeholder="Email" required>
                <input type="password" id="loginPassword" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
        </div>

        <script>
            // Manipula o envio do formulário de cadastro
            document.getElementById('registerForm').addEventListener('submit', async function(event) {
                event.preventDefault(); 

                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                const data = { username, email, password };

                try {
                    const response = await fetch('/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        alert('Cadastro realizado com sucesso!');
                    } else {
                        alert('Erro ao realizar cadastro.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao enviar a requisição.');
                }
            });

            // Manipula o envio do formulário de login
            document.getElementById('loginForm').addEventListener('submit', async function(event) {
                event.preventDefault(); 

                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;

                const data = { email, password };

                try {
                    const response = await fetch('/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        alert('Login realizado com sucesso!');
                    } else {
                        alert('Erro ao realizar login.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    alert('Erro ao enviar a requisição.');
                }
            });
        </script>
    </body>
    </html>
  `;

  reply.type('text/html').send(htmlContent);
};
