import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('navega para o episódio anterior e o seguinte', (tester) async {
    await openPortal(tester);
    await openEpisode(tester, 'Lawnmower Dog');
    await tester.tap(find.text('Anterior: Pilot'));
    await tester.pumpAndSettle();
    expect(find.text('Pilot'), findsWidgets);
    expect(find.text('Sem episódio anterior'), findsOneWidget);
    await tester.tap(find.text('Catálogo'));
    await tester.pumpAndSettle();
    await openEpisode(tester, 'Lawnmower Dog');
    await tester.tap(find.text('Seguinte: Anatomy Park'));
    await tester.pumpAndSettle();
    expect(find.text('Anatomy Park'), findsWidgets);
    expect(find.text('Sem episódio seguinte'), findsOneWidget);
  });
}
