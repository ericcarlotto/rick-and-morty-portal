# AGENTS — teste-zrp

Aplicação Rick and Morty: web Next.js, mobile Flutter, BFF NestJS. Código ainda não existe. Não criar pastas que `docs/PLANO.md` não nomeia.

Antes de implementar qualquer tarefa, ler este ficheiro, `CEREBRO.md` e `docs/PLANO.md`.

## Ler primeiro

| Precisas de | Abrir |
| --- | --- |
| Estado e próxima tarefa | `CEREBRO.md` |
| Requisitos, peças, lint, testes | `docs/PLANO.md` |
| O que foi pedido, em lista | `README.md` |

Uma tarefa, um pull request. Não começar a seguinte no mesmo PR. O browser e o Flutter não chamam a Rick and Morty API. Só o BFF. No fim da tarefa, atualizar a tabela e a linha Próxima tarefa em `CEREBRO.md`.

## Lint (obrigatório)

As regras de lint deste repositório são as mesmas do Training Control (`../Training_Control`).

Fonte lá:

- `app/eslint.config.js` (regras `complexity` / tamanho, severidade **error**)
- `.cursor/rules/code-size-complexity.mdc`
- `docs/00-governanca/qualidade-e-harness.md` §12

Limiares, em **error**, para código novo:

| Regra | Limite |
| --- | --- |
| `complexity` | 5 |
| `max-lines` | 200 (não conta linha vazia nem comentário) |
| `max-lines-per-function` | 40 (idem) |
| `max-depth` | 3 |
| `max-params` | 2 |

Mais contexto do que dois parâmetros entra num objeto. Um ficheiro, uma razão para mudar. O domínio do BFF não importa Nest nem HTTP. As rotas não importam o cliente HTTP.

Config: `eslint.config.js`. Comando: `npm run lint` (na raiz). Vale para `apps/web`, `apps/bff` e `packages/contract`. Correr o lint antes de dar a tarefa por feita.

Pastas que o lint trata como fronteira, quando o BFF existir:

| Pasta | Regra |
| --- | --- |
| `apps/bff/src/domain` | Não importa Nest, HTTP nem `client` |
| `apps/bff/src/use-cases` e `*.controller.ts` | Não importam `client`. Dependem da porta do caso de uso |
| `apps/bff/src/client` | Único sítio com o host da Rick and Morty API |
| `apps/web` e `packages/contract` | Sem o host `rickandmortyapi.com` |

Não subir limiares. Não desligar regras para o lint passar. Não criar lista de exceções. A allowlist do Training Control (`COMPLEXITY_HOTSPOT_ALLOWLIST`) é só para ficheiros legados de lá. Aqui não há legado.

Flutter: os mesmos limiares ao escrever Dart. A análise do mobile (`flutter analyze` e testes) entra no CI da T3. Não usar o ESLint do Training Control como comando deste repo.
