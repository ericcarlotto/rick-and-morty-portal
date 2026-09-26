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
  late Future<EpisodeCatalog> pending;

  @override
  void initState() {
    super.initState();
    pending = readCatalog(widget.scope.api, const CatalogQuery());
  }

  @override
  void dispose() {
    name.dispose();
    code.dispose();
    super.dispose();
  }

  void applyFilter() {
    setState(() {
      pending = readCatalog(widget.scope.api, cleanQuery(CatalogQuery(name: name.text, code: code.text)));
    });
  }

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
        Heading(spec: HeadingSpec(text: 'Catálogo de episódios', style: titleStyle())),
        CatalogForm(view: CatalogFormView(fields: CatalogFields(name: name, code: code), onFilter: applyFilter)),
        CatalogBody(input: CatalogBodyInput(pending: pending, onOpen: openEpisode)),
      ],
    );
  }
}
