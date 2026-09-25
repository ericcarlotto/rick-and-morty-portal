# Plano

Guia único para agentes. Não criar uma spec por história. Se um detalhe não estiver aqui, escolher a opção mais pequena que cumpra a frase e seguir.

## Produto

Dado um episódio, mostrar as personagens em ordem alfabética.

Fonte: `https://rickandmortyapi.com/api`. Documentação: `https://rickandmortyapi.com/documentation#rest`.

O episódio traz as personagens como URLs. O BFF reduz esses URLs a ids numéricos e pede `/character/1,2,3` no host configurado. A resposta de um único id vem como objeto, não como lista. Os dois formatos contam.

Ordem: `localeCompare` em `en`, `sensitivity: 'base'`. Empate pelo `id` crescente.

Resposta de elenco:

- episódio: `id`, `name`, `code` (`S01E01`), `airDate`
- `characters`: `id`, `name`, `status`, `species`, `origin`, `imageUrl`
- `census.status` e `census.species`: `{ label, count }`, maior contagem primeiro

Estado na interface em português (Vivo, Morto, Desconhecido), sempre com texto. Espécie fica como a API manda.

## Extras, já fechados

Não acrescentar mais ideias no meio da implementação.

- Censo por estado e por espécie, calculado no BFF.
- Índice alfabético.
- Detalhe da personagem com os campos já pedidos.
- Anterior e seguinte a partir da ordem do catálogo.
- Filtro local do catálogo por nome ou código. O catálogo cabe em memória. Não há busca na API externa a cada tecla.

## Arquitetura

```text
apps/web       Next.js. Servidor lê o BFF.
apps/mobile    Flutter. Mesmo HTTP.
apps/bff       NestJS. Única saída para a API externa.
packages/contract   Tipos da web e do BFF.
```

Camadas do BFF:

| Camada | Faz | Não importa |
| --- | --- | --- |
| `domain` | ordenar, censo, montar a resposta | Nest, HTTP, upstream |
| `episodes` | caso de uso e rotas. Define a porta `EpisodeSource` | o adaptador upstream |
| `upstream` | HTTP da Rick and Morty API. Implementa a porta | a web |

Rotas, só GET:

- `GET /api/health`
- `GET /api/episodes`
- `GET /api/episodes/:id/cast`

## Design

Uma direção, não um documento de design system à parte.

Papel `#f6f4ec`, tinta `#1b1e27`, índigo `#2a3560`. O índigo marca a letra grande do índice e o episódio selecionado. Verde e vermelho só no estado, junto com o texto.

Bricolage Grotesque nos títulos, Atkinson Hyperlegible no texto, IBM Plex Mono nos códigos `S01E01`.

O Flutter repete estas cores. Não há biblioteca partilhada de componentes entre web e Dart.

## Qualidade

Limiares no código novo, em erro, sem allowlist. O mesmo teto do Fight Flow:

- complexidade ciclomática ≤ 5
- ficheiro ≤ 200 linhas, ignorando vazias e comentários
- função ≤ 40 linhas
- profundidade ≤ 3
- parâmetros ≤ 2. Se faltar contexto, um objeto de opções

Coesão: um ficheiro, uma razão para mudar. Acoplamento: a tabela de camadas acima, garantida no ESLint por caminhos proibidos.

Testes em cada tarefa que introduz comportamento:

- BFF: unidade da ordem, do censo, do id, do host permitido. Um teste de rota do elenco.
- Web: unidade do agrupamento por letra e um teste de componente do cartão.
- Flutter: unidade da ordem e um teste de widget do elenco.

## Segurança

Superfície só de leitura.

- Id do episódio: inteiro positivo. `0`, `1e2` e `../` dão 400.
- URLs de personagens viram ids. O pedido seguinte sai do `UPSTREAM_BASE_URL`.
- A página `next` do catálogo só é seguida se continuar nesse host. Teto de 8 páginas.
- Corpo externo até 2 MB. Timeout de 4 s.
- Helmet, CORS com lista (sem `*`), só GET, 60 pedidos por minuto.
- Erro ao cliente: código estável. Sem stack e sem corpo da API externa.
- `BFF_BASE_URL` fica no servidor Next. Sem segredo no browser.

## Desempenho

- Catálogo e elenco em memória no BFF por 60 s.
- Personagens em lotes de 20 ids.
- Web revalida a resposta do BFF aos 60 s.
- Imagens com tamanho fixo e lazy.

## Entrega

Docker Compose sobe BFF e web. O Flutter continua cliente.

CI em cada pull request: lint, testes, build. No fim, `flutter analyze` e `flutter test`. `npm audit` sem vulnerabilidade alta.

Um assunto por pull request. A tarefa termina quando o CI dessa PR está verde. Atualizar `CEREBRO.md` no mesmo PR.

## Tarefas

### T1. BFF

Contrato, domínio, upstream, rotas, lint, testes da secção Qualidade, regras de segurança e cache. Sem web.

### T2. Web

Next.js com a direção de design, o fluxo do episódio e os testes de componente. Consome o BFF. Sem Flutter e sem Docker.

### T3. Flutter

App com o mesmo contrato, as mesmas cores e os testes de widget.

### T4. Docker e CI

Compose, Dockerfiles, workflow. Confirma que lint, testes e build correm no GitHub.

Fora disto não se faz: autenticação, base de dados, escrita, mais ecrãs, mais documentos.
