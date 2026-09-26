import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('salta para a letra do índice', (tester) async {
    await openPortal(tester);
    await openEpisode(tester, 'Lawnmower Dog');
    await tester.tap(find.byKey(const Key('indice-M')));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('indice-M')), findsOneWidget);
    expect(find.text('Morty Smith'), findsOneWidget);
    expect(find.text('Índice'), findsOneWidget);
  });
}
