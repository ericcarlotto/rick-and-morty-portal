import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/order/group_by_letter.dart';
import 'package:mobile/order/received_order.dart';
import 'support/samples.dart';

void main() {
  test('mantém a ordem recebida e não aplica a comparação alfabética', () {
    final characters = keepReceivedOrder([
      person(const PersonSeed(id: 1, name: 'Rick Sanchez', letter: 'R')),
      person(const PersonSeed(id: 7, name: 'Abradolf Lincler', letter: 'A')),
    ]);
    expect(characters.map((character) => character.id), [1, 7]);
    final sorted = [...characters]..sort(byName);
    expect(sorted.map((character) => character.id), [7, 1]);
    expect(compareIndexLetters('m', 'M'), 0);
    expect(indexAsReceived(const ['R', 'A']), ['R', 'A']);
  });

  test('agrupa pela ordem do índice e preserva a ordem dentro da letra', () {
    final morty = person(const PersonSeed(id: 2, name: 'Morty Smith', letter: 'M'));
    final mister = person(const PersonSeed(id: 8, name: 'Mister Meeseeks', letter: 'M'));
    final rick = person(const PersonSeed(id: 1, name: 'Rick Sanchez', letter: 'R'));
    final groups = groupByLetter(GroupInput(index: const ['R', 'M'], characters: [mister, morty, rick]));
    expect(groups.map((group) => group.letter), ['R', 'M']);
    expect(groups[1].characters.map((character) => character.id), [8, 2]);
    expect(groups[0].characters.map((character) => character.name), ['Rick Sanchez']);
  });

  test('índice vazio não cria grupos e ignora quem está fora do índice', () {
    expect(groupByLetter(const GroupInput(index: [], characters: [])), isEmpty);
    final groups = groupByLetter(
      GroupInput(index: const ['Z'], characters: [person(const PersonSeed(id: 1, name: 'Rick Sanchez', letter: 'R'))]),
    );
    expect(groups.single.characters, isEmpty);
  });
}

int byName(CastCharacter left, CastCharacter right) => compareIndexLetters(left.name, right.name);
