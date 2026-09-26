# Portal Rick and Morty

Aplicação de consulta: dado um episódio, o elenco aparece em ordem alfabética, com censo por estado e por espécie, detalhe da personagem, episódio anterior e seguinte, filtro do catálogo e índice por letra.

O browser e o Flutter não chamam a [Rick and Morty API](https://rickandmortyapi.com/documentation#rest). Só o BFF fala com essa fonte.

Repositório: https://github.com/ericcarlotto/rick-and-morty-portal

## Tecnologias e ferramentas

| Peça | Tecnologia | Para quê |
| --- | --- | --- |
| API | NestJS 11 em Express | Rotas só de leitura, módulos e injeção da porta do caso de uso |
| Web | Next.js 15 e React 19 | Ecrãs do catálogo, do elenco e do detalhe. O servidor Next lê o BFF |
| Mobile | Flutter 3.47 (Dart 3.9) | O mesmo produto no telemóvel, com as mesmas cores e os mesmos nomes de tipo |
| Contrato | `packages/contract` (TypeScript) | A web e o BFF partilham o formato da resposta. O Flutter valida o mesmo JSON |
| Monorepo | npm workspaces, Node 22 | Um `npm ci`, um lint e um comando de testes para BFF, web e contrato |
| Tipos | TypeScript 5.9 | O contrato e o BFF falham a compilar se o formato mudar |
| Nest no teste | SWC (`unplugin-swc`) | Os decoradores do Nest correm no Vitest sem o compilador do Nest |
| Arranque local | `tsx` | Sobe o BFF em TypeScript, sem passo de build |
| Lint | ESLint 9 e typescript-eslint | Complexidade, tamanho e fronteiras entre pastas, em erro |
| Testes JS | Vitest 3, Testing Library, jsdom, MSW, supertest | Unidade, componente, integração, HTTP, contrato e acessibilidade na web |
| Cobertura JS | `@vitest/coverage-v8` | Porta de linhas, funções e ramos. O CI falha abaixo de 96% |
| E2E web | Playwright | O fluxo que a pessoa vê no browser, com o Next a correr |
| Testes mobile | `flutter test`, `integration_test` | Unidade, widget, acessibilidade, contrato e fluxo no aparelho |
| Segurança HTTP | Helmet, CORS, `@nestjs/throttler` | Cabeçalhos, origem permitida e limite de pedidos |
| Contentores | Docker (Node 22) e Compose | Sobe BFF e web juntos. O Flutter continua cliente |
| CI | GitHub Actions | Lint, testes, cobertura, build, `docker compose build` e auditoria de dependências |

Fontes de letra, as mesmas na web e no Flutter: Bricolage Grotesque nos títulos, Atkinson Hyperlegible no texto, IBM Plex Mono nos códigos de episódio. Papel `#f6f4ec`, tinta `#1b1e27`, índigo `#2a3560`. A cor de estado só aparece junto com o texto Vivo, Morto ou Desconhecido.

## Como correr

Precisas de Node.js 22 e npm. Para o telemóvel, Flutter 3.47.5. Para os dois serviços juntos, Docker.

Os comandos abaixo valem para a árvore completa: BFF, web, mobile e Compose. Num checkout só com o BFF, chegam `npm ci` e `npm run start:bff`.

Na raiz:

```bash
npm ci
```

### BFF

```bash
npm run start:bff
```

Fica em `http://127.0.0.1:3001`. Saúde: `GET /api/health`. Catálogo: `GET /api/episodes`. Elenco: `GET /api/episodes/:id/cast`.

`PORT` muda a porta. `CORS_ORIGIN` é a origem do browser. No Compose é `http://localhost:3000`.

### Web

Com o BFF já a correr, noutro terminal:

```bash
npm run dev --workspace @rick/web
```

O Next usa a porta 3000. Sem `BFF_ORIGIN`, a web fala com `http://127.0.0.1:3001`.

Produção local, depois de `npm run build --workspace @rick/web`:

```bash
npm run start --workspace @rick/web
```

### Flutter

Com o BFF a correr:

```bash
cd apps/mobile
flutter pub get
flutter run --dart-define=BFF_ORIGIN=http://127.0.0.1:3001
```

No emulador Android o host da máquina é `10.0.2.2`, não `127.0.0.1`.

### Docker

Na raiz, BFF na porta 3001 e web na porta 3000. A web, dentro da rede do Compose, usa `http://bff:3001`.

```bash
docker compose up --build
```

Abre `http://localhost:3000`.

## Padrões

### BFF no meio

O browser e o Flutter só conhecem este servidor. A ordenação, o censo, a cache, o limite de páginas e o host permitido ficam num sítio. Os dois clientes não repetem essa regra e não recebem o endereço da API externa.

### Domínio, caso de uso e cliente

| Pasta | O que faz | O que não importa |
| --- | --- | --- |
| `apps/bff/src/domain` | Ordem, censo, id, letras, URL permitida | Nest, HTTP, cliente |
| `apps/bff/src/use-cases` | Junta as peças atrás da porta `EpisodeSource` | O cliente HTTP |
| `apps/bff/src/client` | Único sítio com o host da Rick and Morty API | As rotas |
| `apps/bff/src/http` | Controllers. Dependem do caso de uso | O cliente |

A porta `EpisodeSource` é a interface que o caso de uso pede. O cliente Nest implementa essa porta. Nos testes, uma porta falsa ocupa o mesmo lugar.

Isto existe para a regra de negócio correr sem rede e sem framework, e para a rota não saber como a API externa pagina ou devolve um id.

### Contrato partilhado

`packages/contract` descreve saúde, catálogo e elenco. A web importa esses tipos. O Flutter lê o mesmo fixture JSON e confere o modelo Dart. Se o BFF mudar o corpo, os dois clientes falham no teste de contrato, antes de falharem no ecrã.

### Só leitura

As rotas são GET. Não há login, base de dados nem gravação. O id do episódio tem de ser inteiro positivo. O pedido externo só sai para o host configurado, no máximo 8 páginas, corpo até 2 MB, timeout de 4 segundos. O erro para o cliente não leva stack. Não há segredo: o endereço do BFF é configuração, não credencial.

### Cache em memória

Catálogo e elenco ficam 60 segundos no BFF. A web revalida no mesmo intervalo. Personagens saem em lotes de 20 ids. A API externa não é chamada em cada clique, e o lote cabe no limite dela.

### Um ficheiro, uma razão para mudar

O lint recusa, em erro, complexidade ciclomática acima de 5, ficheiro acima de 200 linhas, função acima de 40, profundidade acima de 3 e mais de 2 parâmetros. Contexto extra entra num objeto. Não há lista de excepções. O objectivo é revisão curta e uma alteração que não arraste regras alheias.

O ESLint também barra o import cruzado: domínio sem Nest, rotas sem cliente, web e contrato sem `rickandmortyapi.com`.

## Testes

Cada tipo entra no mesmo pull request assim que essa camada existe. Um tipo não substitui outro. Cobertura do código de produção: mínimo 96% em linhas, funções e ramos, por app. O alvo ao escrever é 100%. Testes e código gerado não entram na conta. E2E de produto não conta para a porta: linha que só o E2E exercita continua sem cobertura.

Na raiz:

```bash
npm run lint
npm run test
npm run test:coverage
npm run test:e2e
```

No mobile, dentro de `apps/mobile`:

```bash
flutter analyze
flutter test --coverage --branch-coverage
```

O `integration_test` corre no emulador, contra um BFF de teste, nunca contra `rickandmortyapi.com`. No CI isso está em `.github/workflows/ci.yml`.

| Tipo | Ferramenta | O que prova | Porquê este tipo |
| --- | --- | --- | --- |
| Unidade | Vitest no domínio e em funções puras. `flutter test` em Dart puro | Ordem sem distinguir maiúsculas, empate pelo id, censo, host recusado, cache com relógio falso, um id como objeto e vários como lista, agrupamento por letra | A regra está isolada. Subir a app ou abrir o browser não diz se o empate pelo id está certo |
| Componente | Testing Library na web. Widget test no Flutter | Cartão e ecrã com nome, espécie, estado e origem, sem a API Nest | A UI de um bloco muda sem o fluxo inteiro. O guia do Next diz que o Vitest não corre Server Component `async`: esses ficam no E2E |
| Integração | Caso de uso com `EpisodeSource` falsa. Na web, MSW no lugar do BFF | As peças juntas: catálogo, elenco, cache, leitura HTTP do nosso servidor | Ainda não há utilizador. Também não há chamada a `rickandmortyapi.com`, para o teste não depender da rede nem de dados que mudam |
| HTTP | supertest, app Nest em processo, cliente externo em `overrideProvider` | `GET /api/health`, `GET /api/episodes`, `GET /api/episodes/:id/cast`, id inválido, erro sem stack, CORS, só GET, limite de corpo e de pedidos | A rota pública é o contrato HTTP. Ordem e censo já estão na unidade. A documentação do Nest chama a isto e2e. Aqui o nome é HTTP, para não confundir com o ecrã |
| E2E de produto | Playwright na web. `integration_test` no Flutter | Um fluxo por comportamento: catálogo, elenco em ordem, detalhe, anterior e seguinte, filtro, índice. Os dois falam com o BFF (ou com o stub do BFF) | É o que a pessoa vê. É lento, por isso não cobre cada função. O Server Component `async` da web só se prova aqui |
| Contrato | Vitest com `parseCast` e o fixture `packages/contract/fixture/cast.json`. No Flutter, o mesmo JSON no modelo Dart | O corpo que sai do BFF é o corpo que a web e o telemóvel aceitam | Apanha um campo renomeado ou um tipo trocado entre as três peças. Não serve para pixel nem para ordem |
| Acessibilidade | Testing Library por role e nome acessível. No Flutter, `tester.ensureSemantics()` e `meetsGuideline` (contraste, alvo de 48 no Android e 44 no iOS, rótulo) | O estado Vivo, Morto ou Desconhecido está no nome, não só na cor | Quem não distingue a cor ainda lê o estado. O BFF não entra: não há UI |

O CI corre o lint, `npm run test:coverage`, o build da web, `docker compose build` e `npm audit --audit-level=high`. No mobile corre `flutter analyze`, `flutter test --coverage --branch-coverage`, a porta de cobertura e o `integration_test` no emulador. Abaixo de 96% em linhas, funções ou ramos, o pull request não passa.
