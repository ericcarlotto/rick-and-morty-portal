import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/theme/portal_colors.dart';
import 'package:mobile/ui/character_card.dart';
import 'package:mobile/ui/chrome.dart';

import 'catalog_widget_test.dart';
import 'support/samples.dart';

void main() {
  testWidgets('mostra o elenco em ordem, o detalhe, os vizinhos e o índice', (tester) async {
    await pumpPortal(tester, portalApi());
    await openNamed(tester, 'Lawnmower Dog');
    expect(cardNames(tester), ['Abradolf Lincler', 'Birdperson', 'Morty Smith', 'Rick Sanchez']);
    expect(find.text('Espécie: Human'), findsWidgets);
    expect(find.text('Estado: Vivo'), findsWidgets);
    expect(find.text('Origem: Earth'), findsWidgets);
    expect(find.text('Espécie: Alien'), findsOneWidget);
    expect(find.text('Estado: Morto'), findsOneWidget);
    expect(find.text('Estado: Desconhecido'), findsOneWidget);
    expect(find.text('Origem: Bird World'), findsOneWidget);
    expect(find.text('Morto: 1'), findsOneWidget);
    expect(find.text('Alien: 1'), findsOneWidget);
    expect(styleOf(tester, 'Lawnmower Dog').color, PortalColors.indigo);
    expect(styleOf(tester, 'S01E02').fontFamily, 'IBM Plex Mono');
    expect(styleOf(tester, 'Morty Smith').color, PortalColors.tinta);
    expect(styleOf(tester, 'Estado: Morto').color, PortalColors.morto);
    expect(styleOf(tester, 'Estado: Vivo').color, PortalColors.vivo);
    expect(styleOf(tester, 'Estado: Desconhecido').color, PortalColors.desconhecido);
    for (final letter in tester.widgetList<Text>(find.text('M'))) {
      expect(letter.style?.color, PortalColors.indigo);
    }

    await tester.tap(find.byKey(const Key('indice-M')));
    await tester.pumpAndSettle();
    expect(find.text('Morty Smith'), findsOneWidget);

    await tester.tap(find.text('Morty Smith'));
    await tester.pumpAndSettle();
    expect(find.text('Espécie: Human'), findsOneWidget);
    expect(find.text('Estado: Vivo'), findsOneWidget);
    expect(find.text('Origem: Earth'), findsOneWidget);
    await tester.tap(find.text('Voltar ao elenco'));
    await tester.pumpAndSettle();
    expect(find.text('Lawnmower Dog'), findsOneWidget);

    await tester.tap(find.text('Anterior: Pilot'));
    await tester.pumpAndSettle();
    expect(find.text('Pilot'), findsWidgets);
    expect(find.text('Sem episódio anterior'), findsOneWidget);
    await tester.tap(find.text('Catálogo'));
    await tester.pumpAndSettle();
    expect(find.text('Catálogo de episódios'), findsOneWidget);

    await openNamed(tester, 'Lawnmower Dog');
    await tester.tap(find.text('Seguinte: Anatomy Park'));
    await tester.pumpAndSettle();
    expect(find.text('Anatomy Park'), findsWidgets);
    expect(find.text('Sem episódio seguinte'), findsOneWidget);
  });

  testWidgets('o elenco mostra carregamento e erro', (tester) async {
    final api = portalApi();
    final gate = Completer<void>();
    api.castHandler = (id) async {
      await gate.future;
      return castById(id);
    };
    await pumpPortal(tester, api);
    await tester.tap(find.text('Pilot'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 400));
    expect(find.byType(LoadingNote), findsOneWidget);
    gate.complete();
    await tester.pumpAndSettle();
    expect(find.text('Jerry Smith'), findsOneWidget);

    final failed = portalApi();
    failed.castHandler = (_) async => throw Exception('falhou');
    await pumpPortal(tester, failed);
    await tester.tap(find.text('Pilot'));
    await tester.pumpAndSettle();
    expect(find.byType(CastError), findsOneWidget);
  });
}

Future<void> openNamed(WidgetTester tester, String name) async {
  await tester.tap(find.text(name));
  await tester.pumpAndSettle();
}

List<String> cardNames(WidgetTester tester) {
  return tester.widgetList<CharacterCard>(find.byType(CharacterCard)).map((card) => card.view.character.name).toList();
}

TextStyle styleOf(WidgetTester tester, String text) {
  return tester.widget<Text>(find.text(text).first).style!;
}
