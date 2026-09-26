import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/cast/page_for_letter.dart';
import 'package:mobile/ui/page_window.dart';

import 'support/samples.dart';

void main() {
  test('a letra entra na janela de quinze mais cinco', () {
    final characters = [
      for (var index = 0; index < 15; index++) person(PersonSeed(id: index, name: 'Alpha $index', letter: 'A')),
      person(const PersonSeed(id: 20, name: 'Zeta', letter: 'Z')),
    ];
    expect(countForLetter(characters, 'A'), 15);
    expect(countForLetter(characters, 'Z'), 20);
    expect(countForLetter(characters, 'Q'), 15);
    expect(lettersWithin(characters, 15), ['A']);
    expect(lettersWithin(characters, 16), ['A', 'Z']);
    expect(lettersKept(const ['Z', 'A'], characters), ['Z', 'A']);
    expect(lettersKept(const ['Z', 'A'], takeCount(characters, 15)), ['A']);
  });
}
