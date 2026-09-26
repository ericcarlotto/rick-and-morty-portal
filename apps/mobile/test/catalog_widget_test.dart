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
    expect(find.text('Episódios'), findsOneWidget);
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

  testWidgets('filtra por nome, código ou temporada sem botão', (tester) async {
    final api = portalApi();
    api.episodesHandler = (_) async => EpisodeCatalog(episodes: [pilotEpisode, lawnEpisode, anatomyEpisode, episodeOf(12, 'A Rickle in Time', 'S02E01')]);
    await pumpPortal(tester, api);
    expect(find.byKey(const Key('filtrar')), findsNothing);
    expect(api.queries.single.name, isNull);
    await tester.enterText(find.byKey(const Key('filtro-nome')), 'Lawn');
    await tester.pumpAndSettle();
    expect(find.text('Lawnmower Dog'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-nome')), '');
    await tester.enterText(find.byKey(const Key('filtro-codigo')), 'S01E03');
    await tester.pumpAndSettle();
    expect(find.text('Anatomy Park'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-codigo')), '');
    await tester.tap(find.byKey(const Key('filtro-temporada')));
    await tester.pumpAndSettle();
    await tester.tap(find.text('2').last);
    await tester.pumpAndSettle();
    expect(find.text('A Rickle in Time'), findsOneWidget);
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
