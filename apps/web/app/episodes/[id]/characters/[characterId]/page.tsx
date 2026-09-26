import { DetailScreen } from '../../../../../src/screens/detail-screen';

export const revalidate = 60;

export default function Page(props: { params: Promise<{ id: string; characterId: string }> }) {
  return <DetailScreen params={props.params} />;
}
