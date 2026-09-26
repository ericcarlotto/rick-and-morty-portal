import { CastScreen } from '../../../src/screens/cast-screen';

export const revalidate = 60;

export default function Page(props: { params: Promise<{ id: string }> }) {
  return <CastScreen params={props.params} />;
}
