import 'package:flutter/material.dart';
import 'package:mobile/catalog/filter_catalog.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/ui/chrome.dart';
import 'package:mobile/ui/episode_list.dart';
import 'package:mobile/ui/snapshot_ready.dart';

class CatalogBodyInput {
  const CatalogBodyInput({required this.pending, required this.query, required this.onOpen});

  final Future<EpisodeCatalog> pending;
  final CatalogQuery query;
  final ValueChanged<EpisodeSummary> onOpen;
}

class CatalogBody extends StatelessWidget {
  const CatalogBody({required this.input, super.key});

  final CatalogBodyInput input;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<EpisodeCatalog>(
      future: input.pending,
      builder: (context, snapshot) => catalogSnapshot(CatalogSnapshot(snapshot: snapshot, query: input.query, onOpen: input.onOpen)),
    );
  }
}

class CatalogSnapshot {
  const CatalogSnapshot({required this.snapshot, required this.query, required this.onOpen});

  final AsyncSnapshot<EpisodeCatalog> snapshot;
  final CatalogQuery query;
  final ValueChanged<EpisodeSummary> onOpen;
}

Widget catalogSnapshot(CatalogSnapshot view) {
  if (!snapshotIsReady(view.snapshot)) return const LoadingNote();
  if (view.snapshot.hasError) return const CatalogError();
  return episodeBody(EpisodeBodyInput(catalog: view.snapshot.requireData, query: view.query, onOpen: view.onOpen));
}

class EpisodeBodyInput {
  const EpisodeBodyInput({required this.catalog, required this.query, required this.onOpen});

  final EpisodeCatalog catalog;
  final CatalogQuery query;
  final ValueChanged<EpisodeSummary> onOpen;
}

Widget episodeBody(EpisodeBodyInput input) {
  final matched = filterCatalog(input.catalog.episodes, input.query);
  if (matched.isEmpty) return const EmptyCatalog();
  return EpisodeList(list: EpisodeListData(episodes: matched, resetKey: draftKey(input.query), onOpen: input.onOpen));
}
