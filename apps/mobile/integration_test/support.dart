import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:integration_test/integration_test.dart';
import 'package:mobile/bff/bff_link.dart';
import 'package:mobile/bff/http_portal_api.dart';
import 'package:mobile/bff/origin.dart';
import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/portal_app.dart';

PortalApi bffApi() {
  const raw = String.fromEnvironment('BFF_ORIGIN');
  final origin = raw.isEmpty ? 'http://127.0.0.1:4011' : resolveOrigin(raw);
  return HttpPortalApi(link: BffLink(origin: origin, client: http.Client()));
}

const step = Duration(milliseconds: 100);
const limit = Duration(seconds: 20);

Future<void> openPortal(WidgetTester tester) async {
  await tester.pumpWidget(PortalApp(api: bffApi()));
  await tester.pumpAndSettle();
}

Future<void> openEpisode(WidgetTester tester, String name) async {
  final episode = find.text(name);
  await untilPresent(tester, episode);
  await tester.ensureVisible(episode);
  await tester.tap(episode);
  await tester.pumpAndSettle();
  await untilPresent(tester, find.text('Índice'));
}

Future<void> untilPresent(WidgetTester tester, Finder finder) async {
  final deadline = DateTime.now().add(limit);
  while (finder.evaluate().isEmpty) {
    if (DateTime.now().isAfter(deadline)) reportAbsent(finder);
    await tester.pump(step);
  }
}

Never reportAbsent(Finder finder) {
  fail('O ecrã não mostrou o alvo a tempo: ${finder.describeMatch(Plurality.one)}');
}

void bindIntegration() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
}
