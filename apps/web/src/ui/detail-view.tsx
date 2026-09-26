import type { DetailModel } from '../load/detail-model';
import { CharacterDetail, MissingCharacter } from './character-detail';

export function DetailView({ model }: { model: DetailModel }) {
  if (model.kind === 'ready') {
    return (
      <main className="screen">
        <CharacterDetail character={model.character} episodeId={model.episodeId} />
      </main>
    );
  }
  return (
    <main className="screen">
      <DetailIssue model={model} />
    </main>
  );
}

function DetailIssue({ model }: { model: Exclude<DetailModel, { kind: 'ready' }> }) {
  if (model.kind === 'missing') return <MissingCharacter episodeId={model.episodeId} />;
  return <DetailMessage kind={model.kind} />;
}

function DetailMessage({ kind }: { kind: 'invalid-episode' | 'invalid-character' | 'error' }) {
  if (kind === 'error') return <p className="notice" role="alert">Não foi possível ler o elenco.</p>;
  if (kind === 'invalid-episode') return <p className="notice">Episódio inválido.</p>;
  return <p className="notice">Personagem inválida.</p>;
}
