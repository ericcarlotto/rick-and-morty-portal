import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/cast/filter_by_name.dart';
import 'package:mobile/contract/character.dart';

import 'support/samples.dart';

void main() {
  test('filtra pelo nome sem distinguir maiúsculas', () {
    final characters = [
      person(const PersonSeed(id: 1, name: 'Rick Sanchez', letter: 'R')),
      person(const PersonSeed(id: 2, name: 'Morty Smith', letter: 'M')),
    ];
    expect(filterByName(characters, '  mor ').map((item) => item.id), [2]);
    expect(filterByName(characters, '   '), characters);
    expect(filterByName(characters, 'zzz'), isEmpty);
  });
}
