import type { CastModel } from '../load/cast-model';
import { CastView } from './cast-view';

export function CastScreenView({ model }: { model: CastModel }) {
  if (model.kind === 'ready') return <CastView cast={model.cast} />;
  return <CastFallback model={model} />;
}

function CastFallback({ model }: { model: Exclude<CastModel, { kind: 'ready' }> }) {
  if (model.kind === 'error') return <p role="alert">Não foi possível ler o elenco.</p>;
  return (
    <p>
      Episódio inválido. <a href="/">Catálogo</a>
    </p>
  );
}
