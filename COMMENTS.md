# Relatório de Arquitetura e Bibliotecas


## 🚀 Link de Acesso à Aplicação

**Acesse a aplicação em:**  
🔗 [https://challenge-full-stack-web-one.vercel.app/](https://challenge-full-stack-web-one.vercel.app/)

> ⚠️ **Atenção:** No primeiro acesso, a aplicação pode demorar cerca de 50 segundos para responder devido à hospedagem gratuita.

---


## Frontend

**Decisão da arquitetura utilizada:**
- O frontend foi desenvolvido utilizando Vue 3 com o framework Vuetify para UI, adotando o padrão SPA (Single Page Application).
- Utiliza Pinia para gerenciamento de estado global e Vue Router para navegação entre páginas.
- O projeto está estruturado em componentes reutilizáveis, layouts e páginas, seguindo boas práticas de modularização.

**Lista de bibliotecas de terceiros utilizadas:**
- [Vue 3](https://vuejs.org/) — Framework principal.
- [Vuetify 3](https://vuetifyjs.com/) — Componentes de UI.
- [Pinia](https://pinia.vuejs.org/) — Gerenciamento de estado.
- [Vue Router](https://router.vuejs.org/) — Roteamento SPA.
- [Axios](https://axios-http.com/) — Requisições HTTP.
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) — Importação automática de componentes.
- [Vite](https://vitejs.dev/) — Bundler e servidor de desenvolvimento.

**Hospedagem:**  
Frontend hospedado na **Vercel**.

---

## Backend

**Decisão da arquitetura utilizada:**
- O backend segue arquitetura modular com Node.js e TypeScript, utilizando Express para criação de APIs REST.
- Utiliza o padrão MVC (Model-View-Controller) e separação clara entre camadas (controllers, services, repositories).
- O acesso a banco de dados é feito via Prisma ORM, facilitando a integração com bancos relacionais.

**Lista de bibliotecas de terceiros utilizadas:**
- [Express](https://expressjs.com/) — Framework web para Node.js.
- [Prisma](https://www.prisma.io/) — ORM para banco de dados.
- [Zod](https://zod.dev/) — Validação de dados.
- [Swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) e [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) — Documentação automática da API.
- [Cors](https://github.com/expressjs/cors) — Middleware para CORS.
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) — Hash de senhas.
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — Autenticação JWT.
- [Jest](https://jestjs.io/) — Testes automatizados.

**Hospedagem:**  
Backend hospedado na **Render**.  
Banco de dados Postgres hospedado na **Railway**.

**Documentação da API:**  
A documentação do backend está disponível em: [https://challenge-full-stack-web.onrender.com/api-docs](https://challenge-full-stack-web.onrender.com/api-docs)


---

## Usuários de Teste

**Usuário admin**  
Usuário: `adm`  
Senha: `senha123`

**Usuário não admin**  
Usuário: `joao.silva`  
Senha: `senha123`