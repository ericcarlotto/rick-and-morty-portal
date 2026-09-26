import type { DetailModel } from '../load/detail-model';
import { CharacterDetail, MissingCharacter } from './character-detail';

export function DetailView({ model }: { model: DetailModel }) {
  if (model.kind === 'ready') {
    return (
      <main>
        <CharacterDetail character={model.character} episodeId={model.episodeId} />
      </main>
    );
  }
  return (
    <main>
      <DetailIssue model={model} />
    </main>
  );
}

function DetailIssue({ model }: { model: Exclude<DetailModel, { kind: 'ready' }> }) {
  if (model.kind === 'missing') return <MissingCharacter episodeId={model.episodeId} />;
  return <DetailMessage kind={model.kind} />;
}

function DetailMessage({ kind }: { kind: 'invalid-episode' | 'invalid-character' | 'error' }) {
  if (kind === 'error') return <p role="alert">Não foi possível ler o elenco.</p>;
  if (kind === 'invalid-episode') return <p>Episódio inválido.</p>;
  return <p>Personagem inválida.</p>;
}
