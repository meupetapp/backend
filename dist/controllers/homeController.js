export const getHomePage = async (request, reply) => {
    const imgUrl = 'https://i.imgur.com/fT1jEyc.jpeg';
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MeuPet</title>
      </head>
      <body>
        <h1>Bem-vindo ao MeuPet</h1>
        <img src="${imgUrl}" alt="Imagem de MeuPet" style="max-width: 50%; height: auto;">
      </body>
    </html>
  `;
    reply.type('text/html').send(htmlContent);
};
