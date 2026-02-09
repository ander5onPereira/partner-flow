# Sistema de Parceiros e Vendas

## 🚀 Como Rodar

### Com Docker

```bash
docker-compose up --build
```

### Localmente

```bash
npm install
npm run prisma:generate
# configure DATABASE_URL in .env
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

## 📝 Decisões Técnicas

- **Prisma**: escolhido pela ergonomia do client, migrations e tipagem forte.
- **PostgreSQL**: estabilidade e suporte a produção; usado no docker-compose.

## 🔌 Endpoints

- POST /users
- GET /users?page=&perPage=
- POST /products
- GET /products?page=&perPage=
- POST /sales
- GET /sales?page=&perPage=
- GET /partners/:id/commissions
- GET /reports/sales?startDate=&endDate=&partnerId=

## 🎨 Exemplos

Criar Usuário Parceiro

```http
POST /users
{
  "name":"João",
  "email":"joao@example.com",
  "role":"PARTNER"
}
```

Registrar Venda

```http
POST /sales
{
  "productId": 1,
  "customerId": 3,
  "partnerId": 2
}
```

Consultar Comissões

````http
# Sistema de Parceiros e Vendas

## 🚀 Como Rodar

### Subir o Docker com o banco de dados

```bash
docker-compose up --build
````

### Localmente

```bash
npm install
npm run prisma:generate
# configure DATABASE_URL in .env
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

## 📝 Decisões Técnicas

- **Prisma**: escolhido pela ergonomia do client, migrations e tipagem forte.
- **PostgreSQL**: estabilidade e suporte a produção; usado no docker-compose.

## 🔌 Endpoints

- POST /users
- GET /users?page=&perPage=
- POST /products
- GET /products?page=&perPage=
- POST /sales
- GET /sales?page=&perPage=
- GET /partners/:id/commissions
- GET /reports/sales?startDate=&endDate=&partnerId=

## 🧾 Documentação (Swagger)

A documentação interativa está disponível em `GET /swagger` quando a aplicação estiver rodando.

## 🎨 Exemplos

Criar Usuário Parceiro

```http
POST /users
{
  "name":"João",
  "email":"joao@example.com",
  "role":"PARTNER"
}
```

Registrar Venda

```http
POST /sales
{
  "productId": 1,
  "customerId": 3,
  "partnerId": 2
}
```

Consultar Comissões

```http
GET /partners/2/commissions
```
