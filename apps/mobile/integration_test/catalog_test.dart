import 'package:flutter_test/flutter_test.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('mostra o catálogo de episódios', (tester) async {
    await openPortal(tester);
    expect(find.text('Catálogo de episódios'), findsOneWidget);
    expect(find.text('Pilot'), findsOneWidget);
    expect(find.text('Lawnmower Dog'), findsOneWidget);
    expect(find.text('Anatomy Park'), findsOneWidget);
  });
}
