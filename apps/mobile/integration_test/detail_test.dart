import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('abre o detalhe da personagem', (tester) async {
    await openPortal(tester);
    await openEpisode(tester, 'Lawnmower Dog');
    await tester.tap(find.text('Morty Smith'));
    await tester.pumpAndSettle();
    expect(find.text('Morty Smith'), findsWidgets);
    expect(find.text('Human'), findsOneWidget);
    expect(find.text('Vivo'), findsWidgets);
    expect(find.text('Earth'), findsOneWidget);
  });
}
