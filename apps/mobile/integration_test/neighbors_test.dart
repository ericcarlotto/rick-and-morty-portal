import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('navega para o episódio anterior e o seguinte', (tester) async {
    await openPortal(tester);
    await openEpisode(tester, 'Lawnmower Dog');
    await tester.tap(find.text('Anterior · S01E01'));
    await tester.pumpAndSettle();
    expect(find.text('Pilot'), findsWidgets);
    expect(find.text('Sem episódio anterior'), findsOneWidget);
    await tester.tap(find.text('Voltar').last);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Voltar').last);
    await tester.pumpAndSettle();
    await openEpisode(tester, 'Lawnmower Dog');
    await tester.tap(find.text('Seguinte · S01E03'));
    await tester.pumpAndSettle();
    expect(find.text('Anatomy Park'), findsWidgets);
    expect(find.text('Sem episódio seguinte'), findsOneWidget);
  });
}
