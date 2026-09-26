import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/health.dart';
import 'package:mobile/portal_app.dart';
import 'package:mobile/ui/chrome.dart';

import 'support/samples.dart';
import 'support/scripted_api.dart';

void main() {
  testWidgets('mostra o catálogo e abre o episódio', (tester) async {
    await pumpPortal(tester, portalApi());
    expect(find.text('Catálogo de episódios'), findsOneWidget);
    expect(find.text('Pilot'), findsOneWidget);
    expect(find.text('Lawnmower Dog'), findsOneWidget);
    expect(find.text('Anatomy Park'), findsOneWidget);
    await tester.tap(find.text('Pilot'));
    await tester.pumpAndSettle();
    expect(find.text('Jerry Smith'), findsOneWidget);
    await tester.pumpWidget(const SizedBox.shrink());
    await tester.pump();
  });

  testWidgets('mostra o estado a carregar, vazio e de erro', (tester) async {
    final loading = portalApi();
    final gate = Completer<Health>();
    loading.healthHandler = () => gate.future;
    await tester.pumpWidget(PortalApp(api: loading));
    await tester.pump();
    expect(find.text('A carregar'), findsOneWidget);
    gate.complete(const Health());
    await tester.pumpWidget(const SizedBox.shrink());
    await tester.pump();

    final empty = portalApi();
    empty.episodesHandler = (_) async => const EpisodeCatalog(episodes: []);
    await pumpPortal(tester, empty);
    expect(find.byType(EmptyCatalog), findsOneWidget);

    final failed = portalApi();
    failed.healthHandler = () async => throw Exception('falhou');
    await pumpPortal(tester, failed);
    expect(find.byType(CatalogError), findsOneWidget);
  });

  testWidgets('filtra por nome ou código', (tester) async {
    final api = portalApi();
    await pumpPortal(tester, api);
    await tester.enterText(find.byKey(const Key('filtro-nome')), 'Lawn');
    await tester.tap(find.byKey(const Key('filtrar')));
    await tester.pumpAndSettle();
    expect(api.queries.last.name, 'Lawn');
    expect(find.text('Lawnmower Dog'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-nome')), '');
    await tester.enterText(find.byKey(const Key('filtro-codigo')), 'S01E03');
    await tester.tap(find.byKey(const Key('filtrar')));
    await tester.pumpAndSettle();
    expect(api.queries.last.code, 'S01E03');
    expect(find.text('Anatomy Park'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
  });
}

ScriptedApi portalApi() {
  final api = ScriptedApi();
  api.episodesHandler = (query) async => EpisodeCatalog(episodes: filteredEpisodes(query));
  api.castHandler = (id) async => castById(id);
  return api;
}

Future<void> pumpPortal(WidgetTester tester, ScriptedApi api) async {
  await tester.binding.setSurfaceSize(const Size(900, 2400));
  addTearDown(() async => tester.binding.setSurfaceSize(null));
  await tester.pumpWidget(PortalApp(key: UniqueKey(), api: api));
  await tester.pumpAndSettle();
}
