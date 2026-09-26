import { loadDetail } from '../load/detail-model';
import { DetailView } from '../ui/detail-view';

export async function DetailScreen(props: { params: Promise<{ id: string; characterId: string }> }) {
  const model = await loadDetail({ params: props.params });
  return <DetailView model={model} />;
}
