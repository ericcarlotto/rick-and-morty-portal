import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/ui/character_card.dart';

import 'support.dart';

void main() {
  bindIntegration();

  testWidgets('mostra o elenco na ordem recebida', (tester) async {
    await openPortal(tester);
    await openEpisode(tester, 'Lawnmower Dog');
    final names = tester.widgetList<CharacterCard>(find.byType(CharacterCard)).map((card) => card.view.character.name);
    expect(names.toList(), ['Abradolf Lincler', 'Birdperson', 'Morty Smith', 'Rick Sanchez']);
  });
}
