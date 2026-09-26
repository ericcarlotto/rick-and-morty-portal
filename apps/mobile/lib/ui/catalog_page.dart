import 'dart:async';

import 'package:flutter/material.dart';
import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/load/read_catalog.dart';
import 'package:mobile/ui/cast_page.dart';
import 'package:mobile/ui/catalog_body.dart';
import 'package:mobile/ui/catalog_form.dart';
import 'package:mobile/ui/chrome.dart';
import 'package:mobile/theme/text_styles.dart';

class CatalogScope {
  const CatalogScope({required this.api});

  final PortalApi api;
}

class CatalogPage extends StatefulWidget {
  const CatalogPage({required this.scope, super.key});

  final CatalogScope scope;

  @override
  State<CatalogPage> createState() => _CatalogPageState();
}

class _CatalogPageState extends State<CatalogPage> {
  final name = TextEditingController();
  final code = TextEditingController();
  String season = '';
  late Future<EpisodeCatalog> pending;

  @override
  void initState() {
    super.initState();
    pending = readCatalog(widget.scope.api, const CatalogQuery());
    name.addListener(refresh);
    code.addListener(refresh);
  }

  @override
  void dispose() {
    name.removeListener(refresh);
    code.removeListener(refresh);
    name.dispose();
    code.dispose();
    super.dispose();
  }

  void refresh() => setState(() {});

  void onSeason(String? value) => setState(() => season = value ?? '');

  CatalogQuery draftQuery() => CatalogQuery(name: name.text, code: code.text, season: season);

  void openEpisode(EpisodeSummary episode) {
    unawaited(
      Navigator.of(context).push(
        MaterialPageRoute<void>(builder: (_) => CastPage(scope: CastScope(api: widget.scope.api, episodeId: episode.id))),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return PageFrame(
      children: [
        Text('CATÁLOGO', style: eyebrowStyle()),
        const SizedBox(height: 8),
        Heading(spec: HeadingSpec(text: 'Episódios', style: titleStyle())),
        const SizedBox(height: 8),
        Text('Escolhe um episódio. O elenco vem por ordem alfabética, com censo e índice.', style: bodyStyle()),
        const SizedBox(height: 28),
        CatalogForm(fields: CatalogFields(name: name, code: code, season: season, onSeason: onSeason)),
        CatalogBody(input: CatalogBodyInput(pending: pending, query: draftQuery(), onOpen: openEpisode)),
      ],
    );
  }
}
