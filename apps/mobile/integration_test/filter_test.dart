import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('filtra o catálogo por nome, código ou temporada', (tester) async {
    await openPortal(tester);
    expect(find.byKey(const Key('filtrar')), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-nome')), 'Lawn');
    await tester.pumpAndSettle();
    await untilPresent(tester, find.text('Lawnmower Dog'));
    expect(find.text('Lawnmower Dog'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-nome')), '');
    await tester.enterText(find.byKey(const Key('filtro-codigo')), 'S01E03');
    await tester.pumpAndSettle();
    await untilPresent(tester, find.text('Anatomy Park'));
    expect(find.text('Anatomy Park'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-codigo')), '');
    await tester.tap(find.byKey(const Key('filtro-temporada')));
    await tester.pumpAndSettle();
    await tester.tap(find.text('2').last);
    await tester.pumpAndSettle();
    await untilPresent(tester, find.text('Arquivo 4'));
    expect(find.text('Arquivo 4'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
  });

  testWidgets('filtra o elenco pelo nome a cada letra', (tester) async {
    await openPortal(tester);
    await openEpisode(tester, 'Lawnmower Dog');
    await tester.enterText(find.byKey(const Key('filtro-elenco')), 'Mor');
    await tester.pumpAndSettle();
    expect(find.text('Morty Smith'), findsOneWidget);
    expect(find.text('Rick Sanchez'), findsNothing);
    expect(find.text('Birdperson'), findsNothing);
  });
}
