# Ficha de elenco

Aplicação para escolher um episódio de Rick and Morty e ver o elenco em ordem alfabética.

O browser e o telemóvel falam só com um BFF. O BFF é quem chama a [Rick and Morty API](https://rickandmortyapi.com/documentation#rest).

## Peças

| Peça | Papel |
| --- | --- |
| `apps/web` | Next.js. O ecrã web. |
| `apps/mobile` | Flutter. O mesmo contrato no telemóvel. |
| `apps/bff` | NestJS. Rotas e processamento no padrão BFF. |
| `packages/contract` | Tipos partilhados entre a web e o BFF. |

## O que o ecrã faz

1. Lista os episódios.
2. Ao escolher um, mostra as personagens de A a Z (nome, espécie, estado, origem).
3. Mostra um censo do episódio: quantas estão vivas, mortas ou desconhecidas, e a contagem por espécie.
4. Tem índice alfabético, detalhe da personagem, e salto para o episódio anterior e o seguinte.

A ordem alfabética é contrato do BFF: inglês, sem distinção de maiúsculas, desempate pelo id.

## Como vai correr

```powershell
npm ci
npm run dev:bff
npm run dev:web
```

Web em `http://localhost:3000`. API em `http://localhost:3001`.

```powershell
cd apps\mobile
flutter run --dart-define=BFF_BASE_URL=http://10.0.2.2:3001
```

No emulador Android, `10.0.2.2` é a máquina. No desktop, `http://localhost:3001`.

```powershell
docker compose up --build
```

As pastas de código entram nos pull requests seguintes. O plano está em `docs/PLANO.md`.
