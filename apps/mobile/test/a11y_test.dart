import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/theme/portal_theme.dart';
import 'package:mobile/ui/cast_page.dart';

import 'catalog_widget_test.dart';

void main() {
  testWidgets('o elenco cumpre contraste, alvo de toque e rótulo', (tester) async {
    final handle = tester.ensureSemantics();
    await tester.binding.setSurfaceSize(const Size(900, 2400));
    addTearDown(() async => tester.binding.setSurfaceSize(null));
    await tester.pumpWidget(
      MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: portalTheme(),
        home: CastPage(scope: CastScope(api: portalApi(), episodeId: 2)),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('Morty Smith'), findsOneWidget);
    expect(find.text('Espécie: Human'), findsWidgets);
    expect(find.text('Estado: Vivo'), findsWidgets);
    expect(find.text('Origem: Earth'), findsWidgets);
    await expectLater(tester, meetsGuideline(textContrastGuideline));
    await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
    await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));
    await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
    handle.dispose();
  });
}
