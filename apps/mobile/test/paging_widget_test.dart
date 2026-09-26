import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/census.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/portal_app.dart';

import 'cast_widget_test.dart';
import 'catalog_widget_test.dart';
import 'support/samples.dart';
import 'support/scripted_api.dart';

void main() {
  testWidgets('o catálogo abre com quinze e o scroll carrega mais cinco', (tester) async {
    final api = portalApi();
    api.episodesHandler = (_) async => EpisodeCatalog(episodes: manyEpisodes());
    await pumpSized(tester, api, const Size(400, 700));
    expect(find.text('Arquivo 15'), findsOneWidget);
    expect(find.text('Arquivo 16'), findsNothing);
    await tester.drag(find.byType(ListView), const Offset(0, -1600));
    await tester.pumpAndSettle();
    expect(find.text('Arquivo 16'), findsOneWidget);
    expect(find.text('Pilot'), findsOneWidget);
  });

  testWidgets('a letra do elenco carrega as personagens até essa letra', (tester) async {
    final api = portalApi();
    api.episodesHandler = (_) async => EpisodeCatalog(episodes: [episodeOf(4, 'Arquivo 4', 'S02E04')]);
    api.castHandler = (_) async => longCast();
    await pumpSized(tester, api, const Size(400, 700));
    await openNamed(tester, 'Arquivo 4');
    expect(find.text('Alpha 0'), findsOneWidget);
    expect(find.text('Zeta'), findsNothing);
    await tester.tap(find.byKey(const Key('indice-Z')));
    await tester.pumpAndSettle();
    expect(find.text('Zeta'), findsOneWidget);
    expect(find.text('Alpha 0'), findsOneWidget);
    expect(find.byKey(const Key('indice-Z')), findsOneWidget);
  });

  testWidgets('o elenco carrega mais cinco no scroll', (tester) async {
    final api = portalApi();
    api.episodesHandler = (_) async => EpisodeCatalog(episodes: [episodeOf(4, 'Arquivo 4', 'S02E04')]);
    api.castHandler = (_) async => longCast();
    await pumpSized(tester, api, const Size(400, 700));
    await openNamed(tester, 'Arquivo 4');
    expect(find.text('Zeta'), findsNothing);
    await tester.drag(find.byType(ListView), const Offset(0, -2000));
    await tester.pumpAndSettle();
    expect(find.text('Zeta'), findsOneWidget);
  });

  testWidgets('filtra o elenco pelo nome a cada letra', (tester) async {
    await pumpPortal(tester, portalApi());
    await openNamed(tester, 'Lawnmower Dog');
    await tester.enterText(find.byKey(const Key('filtro-elenco')), 'Mor');
    await tester.pumpAndSettle();
    expect(find.text('Morty Smith'), findsOneWidget);
    expect(find.text('Rick Sanchez'), findsNothing);
    expect(find.text('Birdperson'), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-elenco')), 'zzz');
    await tester.pumpAndSettle();
    expect(find.text('Nenhuma personagem encontrada.'), findsOneWidget);
  });
}

Future<void> pumpSized(WidgetTester tester, ScriptedApi api, Size size) async {
  await tester.binding.setSurfaceSize(size);
  addTearDown(() async => tester.binding.setSurfaceSize(null));
  await tester.pumpWidget(PortalApp(key: UniqueKey(), api: api));
  await tester.pumpAndSettle();
}

List<EpisodeSummary> manyEpisodes() {
  return [pilotEpisode, lawnEpisode, anatomyEpisode, for (var id = 4; id <= 22; id++) episodeOf(id, 'Arquivo $id', archiveCode(id))];
}

String archiveCode(int id) => 'S02E${id.toString().padLeft(2, '0')}';

Cast longCast() {
  return makeCast(
    CastSeed(
      episode: episodeOf(4, 'Arquivo 4', 'S02E04'),
      previousEpisode: null,
      nextEpisode: null,
      index: const ['A', 'Z'],
      characters: [
        for (var index = 0; index < 15; index++) person(PersonSeed(id: 100 + index, name: 'Alpha $index', letter: 'A')),
        person(const PersonSeed(id: 200, name: 'Zeta', letter: 'Z')),
      ],
      census: counts(const [CensusCount(label: 'Vivo', count: 16)], const [CensusCount(label: 'Human', count: 16)]),
    ),
  );
}
