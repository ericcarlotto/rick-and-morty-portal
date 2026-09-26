import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:mobile/bff/http_portal_api.dart';
import 'package:mobile/bff/origin.dart';
import 'package:mobile/main.dart' as app;
import 'package:mobile/nav/portal_nav.dart';

void main() {
  tearDown(() {
    app.newPortalClient = http.Client.new;
  });

  test('cliente injectado e origem sem barra final', () {
    final client = MockClient((_) async => http.Response('{}', 200));
    final api = app.livePortalApi(app.LiveApiConfig(rawOrigin: 'http://10.0.0.8:9/', client: client));
    final httpApi = api as HttpPortalApi;
    expect(httpApi.link.origin, 'http://10.0.0.8:9');
    expect(httpApi.link.client, same(client));
  });

  test('cliente por omissão usa a porta 3001', () {
    final api = app.livePortalApi(const app.LiveApiConfig()) as HttpPortalApi;
    expect(api.link.origin, defaultBffOrigin);
    api.link.client.close();
  });

  test('contexto nulo não salta no índice', () {
    revealLetter(null);
  });

  testWidgets('main abre o catálogo vazio', (tester) async {
    app.newPortalClient = () {
      return MockClient((request) async {
        if (request.url.path.endsWith('/health')) return http.Response('{"status":"ok"}', 200);
        return http.Response('{"episodes":[]}', 200);
      });
    };
    app.main();
    await tester.pumpAndSettle();
    expect(find.text('Nenhum episódio encontrado.'), findsOneWidget);
  });
}
