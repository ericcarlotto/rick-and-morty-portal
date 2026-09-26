import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:mobile/bff/bff_link.dart';
import 'package:mobile/bff/http_portal_api.dart';
import 'package:mobile/bff/origin.dart';
import 'package:mobile/bff/paths.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/episode.dart';

void main() {
  test('origem por omissão, vazia ou com barra', () {
    expect(resolveOrigin(null), defaultBffOrigin);
    expect(resolveOrigin('  '), defaultBffOrigin);
    expect(resolveOrigin('http://127.0.0.1:4011'), 'http://127.0.0.1:4011');
    expect(resolveOrigin('http://127.0.0.1:4011///'), 'http://127.0.0.1:4011');
  });

  test('monta os caminhos do BFF', () {
    expect(healthPath, '/api/health');
    expect(catalogPath(const CatalogQuery()), '/api/episodes');
    expect(catalogPath(const CatalogQuery(name: '  ', code: '')), '/api/episodes');
    expect(catalogPath(const CatalogQuery(name: 'Lawn')), '/api/episodes?name=Lawn');
    expect(catalogPath(const CatalogQuery(code: 'S01E03')), '/api/episodes?code=S01E03');
    expect(catalogPath(const CatalogQuery(name: 'Lawn Dog', code: 'S01')), '/api/episodes?name=Lawn+Dog&code=S01');
    expect(castPath(2), '/api/episodes/2/cast');
    expect(bffUri(defaultBffOrigin, healthPath).toString(), '$defaultBffOrigin$healthPath');
    expect(catalogPath(const CatalogQuery(name: 'Pilot')).contains('rickandmortyapi.com'), isFalse);
  });

  test('lê saúde, catálogo e elenco e rejeita erro ou JSON inválido', () async {
    final api = apiWith((request) async {
      if (request.url.path == healthPath) return http.Response('{"status":"ok"}', 200);
      if (request.url.path == '/api/episodes') {
        return http.Response('{"episodes":[{"id":1,"name":"Pilot","code":"S01E01"}]}', 200);
      }
      expect(request.url.path, '/api/episodes/2/cast');
      expect(request.url.host, '127.0.0.1');
      return http.Response(fixtureText(), 200);
    });
    expect((await api.health()).runtimeType.toString(), 'Health');
    final catalog = await api.episodes(const CatalogQuery(name: 'Pilot'));
    expect(catalog.episodes.single.code, 'S01E01');
    expect((await api.castOf(2)).episode.name, 'Pilot');
    await expectLater(failing(500, '{"status":"ok"}').health(), throwsA(isA<PortalException>()));
    await expectLater(failing(200, 'nao-json').health(), throwsA(isA<PortalException>()));
    expect(cleanQuery(const CatalogQuery(name: '  Lawn ', code: '')).name, 'Lawn');
    expect(cleanQuery(const CatalogQuery()).code, isNull);
  });
}

HttpPortalApi apiWith(MockClientHandler handler) {
  return HttpPortalApi(link: BffLink(origin: 'http://127.0.0.1:4011', client: MockClient(handler)));
}

HttpPortalApi failing(int status, String body) {
  return apiWith((_) async => http.Response(body, status));
}

String fixtureText() => File('../../packages/contract/fixture/cast.json').readAsStringSync();
