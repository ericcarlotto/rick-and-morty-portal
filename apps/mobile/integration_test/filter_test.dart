import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('filtra o catálogo por nome ou código', (tester) async {
    await openPortal(tester);
    await tester.enterText(find.byKey(const Key('filtro-nome')), 'Lawn');
    await tester.tap(find.byKey(const Key('filtrar')));
    await tester.pumpAndSettle();
    expect(find.text('Lawnmower Dog'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
    await tester.enterText(find.byKey(const Key('filtro-nome')), '');
    await tester.enterText(find.byKey(const Key('filtro-codigo')), 'S01E03');
    await tester.tap(find.byKey(const Key('filtrar')));
    await tester.pumpAndSettle();
    expect(find.text('Anatomy Park'), findsOneWidget);
    expect(find.text('Pilot'), findsNothing);
  });
}
