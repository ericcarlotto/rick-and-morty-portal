import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('o catálogo abre com quinze episódios e o scroll carrega mais cinco', (tester) async {
    await openPortal(tester);
    await untilPresent(tester, find.text('Pilot'));
    await tester.drag(find.byType(ListView), const Offset(0, -1600));
    await tester.pumpAndSettle();
    expect(find.text('Arquivo 16'), findsOneWidget);
    expect(find.text('Pilot'), findsOneWidget);
  });

  testWidgets('a letra do elenco carrega as personagens até essa letra', (tester) async {
    await openPortal(tester);
    await openEpisode(tester, 'Arquivo 4');
    await tester.tap(find.byKey(const Key('indice-Z')));
    await tester.pumpAndSettle();
    expect(find.text('Zeta'), findsOneWidget);
    expect(find.text('Alpha 0'), findsOneWidget);
    expect(find.byKey(const Key('indice-Z')), findsOneWidget);
  });
}
