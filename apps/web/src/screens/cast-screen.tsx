import { loadCast } from '../load/cast-model';
import { CastScreenView } from '../ui/cast-screen-view';

export async function CastScreen(props: { params: Promise<{ id: string }> }) {
  const model = await loadCast({ params: props.params });
  return <CastScreenView model={model} />;
}
