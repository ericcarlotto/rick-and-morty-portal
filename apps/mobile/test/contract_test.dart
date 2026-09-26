import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/contract/parse_cast.dart';
import 'package:mobile/contract/parse_catalog.dart';
import 'package:mobile/contract/parse_census.dart';
import 'package:mobile/contract/parse_character.dart';
import 'package:mobile/contract/parse_guards.dart';
import 'package:mobile/contract/parse_health.dart';

void main() {
  test('o fixture do elenco cabe no contrato', () {
    final cast = parseCast(jsonDecode(fixtureText()));
    expect(cast.episode.id, 1);
    expect(cast.episode.name, 'Pilot');
    expect(cast.episode.code, 'S01E01');
    expect(cast.previousEpisode, isNull);
    expect(cast.nextEpisode?.id, 2);
    expect(cast.nextEpisode?.name, 'Lawnmower Dog');
    expect(cast.nextEpisode?.code, 'S01E02');
    expect(cast.index, ['M']);
    expect(cast.characters.single.name, 'Morty Smith');
    expect(cast.characters.single.species, 'Human');
    expect(cast.characters.single.status, CharacterStatus.vivo);
    expect(cast.characters.single.origin, 'Earth');
    expect(cast.characters.single.letter, 'M');
    expect(cast.census.byStatus.single.label, 'Vivo');
    expect(cast.census.byStatus.single.count, 1);
    expect(cast.census.bySpecies.single.label, 'Human');
    expect(cast.census.bySpecies.single.count, 1);
  });

  test('rejeita elenco sem episódio', () {
    expectInvalid(() => parseCast({'episode': null}));
  });

  test('aceita os três estados e rejeita o resto do contrato', () {
    expect(parseStatus('Morto'), CharacterStatus.morto);
    expect(parseStatus('Desconhecido'), CharacterStatus.desconhecido);
    expect(parseStatus('Vivo'), CharacterStatus.vivo);
    expectInvalid(() => parseStatus('Alien'));
    expectInvalid(() => parseStatus(1));
    expectInvalid(() => parseStatus(''));
    expect(parseCatalog(<String, Object?>{'episodes': <Object?>[]}).episodes, isEmpty);
    expect(parseHealth({'status': 'ok'}), isA<Object>());
    expect(countOf(0), 0);
    expect(stringList(['A', '']), ['A', '']);
  });

  test('rejeita formas inválidas', () {
    expectInvalid(() => recordOf(null));
    expectInvalid(() => recordOf([]));
    expectInvalid(() => textOf(1));
    expectInvalid(() => textOf('  '));
    expectInvalid(() => stringItem(1));
    expectInvalid(() => intOf(1.2));
    expectInvalid(() => intOf(0));
    expectInvalid(() => countOf(-1));
    expectInvalid(() => countOf('1'));
    expectInvalid(() => stringList('M'));
    expectInvalid(() => parseCharacters({}));
    expectInvalid(() => parseCounts({}));
    expectInvalid(() => parseEpisodes({}));
    expectInvalid(() => parseCensus([]));
    expectInvalid(() => parseHealth({'status': 'down'}));
    expectInvalid(() => parseCatalog({'episodes': [1]}));
  });
}

void expectInvalid(void Function() body) {
  expect(body, throwsA(isA<FormatException>().having((error) => error.message, 'message', contractError)));
}

String fixtureText() {
  return File('../../packages/contract/fixture/cast.json').readAsStringSync();
}
