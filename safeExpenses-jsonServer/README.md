# safeExpenses-jsonServer

Servidor `json-server` standalone usado como simulador NoSQL para a `safeExpenses-api`.

## Executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm run start
```

- URL: http://localhost:3001

## Executar com Docker

Construa a imagem:

```bash
npm run docker:build
```

Crie a rede compartilhada, caso ainda não exista:

```bash
npm run docker:network:create
```

Execute o container na rede `safeexpenses-net`:

```bash
npm run docker:run
```

Interrompa o container:

```bash
npm run docker:stop
```

Remova a rede quando ela não for mais necessária:

```bash
npm run docker:network:remove
```

- Servidor: `http://localhost:3001`
- Recurso de lançamentos: `http://localhost:3001/expenses`

## Scripts disponíveis

- `npm run start`: inicia o `json-server` localmente na porta `3001` e observa alterações no arquivo `db.json`.
- `npm run docker:build`: constrói a imagem Docker `safeexpenses-jsonserver`.
- `npm run docker:network:create`: cria a rede Docker compartilhada `safeexpenses-net`.
- `npm run docker:run`: executa o container `safeexpenses-jsonserver-local` na rede compartilhada e publica a porta `3001`.
- `npm run docker:stop`: interrompe o container local do JSON Server.
- `npm run docker:network:remove`: remove a rede Docker compartilhada.
