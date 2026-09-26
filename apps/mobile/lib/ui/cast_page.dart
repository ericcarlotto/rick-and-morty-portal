import 'dart:async';

import 'package:flutter/material.dart';
import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/load/read_cast.dart';
import 'package:mobile/nav/portal_nav.dart';
import 'package:mobile/ui/cast_view.dart';
import 'package:mobile/ui/chrome.dart';
import 'package:mobile/ui/detail_page.dart';
import 'package:mobile/ui/snapshot_ready.dart';

class CastScope {
  const CastScope({required this.api, required this.episodeId});

  final PortalApi api;
  final int episodeId;
}

class CastPage extends StatefulWidget {
  const CastPage({required this.scope, super.key});

  final CastScope scope;

  @override
  State<CastPage> createState() => _CastPageState();
}

class _CastPageState extends State<CastPage> {
  late Future<Cast> pending;

  @override
  void initState() {
    super.initState();
    pending = readCast(widget.scope.api, widget.scope.episodeId);
  }

  void openEpisode(int episodeId) {
    unawaited(Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => nextCast(episodeId))));
  }

  CastPage nextCast(int episodeId) {
    return CastPage(scope: CastScope(api: widget.scope.api, episodeId: episodeId));
  }

  void openCharacter(CastCharacter character) {
    unawaited(Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => DetailPage(character: character))));
  }

  CastModel modelFor(Cast cast) {
    return CastModel(cast: cast, actions: actionsFor());
  }

  CastActions actionsFor() {
    return CastActions(
      moves: CastMoves(onCatalog: () => popToCatalog(context), onEpisode: openEpisode),
      onCharacter: openCharacter,
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Cast>(future: pending, builder: (context, snapshot) => built(snapshot));
  }

  Widget built(AsyncSnapshot<Cast> snapshot) {
    if (!snapshotIsReady(snapshot)) return const PageFrame(children: [LoadingNote()]);
    if (snapshot.hasError) return const PageFrame(children: [CastError()]);
    return CastView(model: modelFor(snapshot.requireData));
  }
}
