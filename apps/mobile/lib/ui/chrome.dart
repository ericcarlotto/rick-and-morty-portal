import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/brand_bar.dart';

// O salto alinha a letra ao topo. Este alcance mantém o índice e o último cartão montados.
const pageCacheExtent = 2400.0;

class PageFrame extends StatelessWidget {
  const PageFrame({required this.children, this.header, this.footer, super.key});

  final List<Widget> children;
  final Widget? header;
  final Widget? footer;

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: SafeArea(child: frameColumn(this)));
  }
}

Widget frameColumn(PageFrame frame) {
  return Column(
    children: [
      const BrandBar(),
      if (frame.header != null) frame.header!,
      Expanded(child: frameList(frame)),
      if (frame.footer != null) frame.footer!,
    ],
  );
}

Widget frameList(PageFrame frame) {
  return ListView(
    scrollCacheExtent: const ScrollCacheExtent.pixels(pageCacheExtent),
    padding: const EdgeInsets.fromLTRB(20, 24, 20, 48),
    children: frame.children,
  );
}

class Heading extends StatelessWidget {
  const Heading({required this.spec, super.key});

  final HeadingSpec spec;

  @override
  Widget build(BuildContext context) {
    return Semantics(header: true, child: Text(spec.text, style: spec.style));
  }
}

class HeadingSpec {
  const HeadingSpec({required this.text, required this.style});

  final String text;
  final TextStyle style;
}

class LoadingNote extends StatelessWidget {
  const LoadingNote({super.key});

  @override
  Widget build(BuildContext context) => Text('A carregar', style: bodyStyle());
}

class CatalogError extends StatelessWidget {
  const CatalogError({super.key});

  @override
  Widget build(BuildContext context) => Text('Não foi possível ler o catálogo.', style: bodyStyle());
}

class EmptyCatalog extends StatelessWidget {
  const EmptyCatalog({super.key});

  @override
  Widget build(BuildContext context) => Text('Nenhum episódio encontrado.', style: bodyStyle());
}

class EmptyCast extends StatelessWidget {
  const EmptyCast({super.key});

  @override
  Widget build(BuildContext context) => Text('Nenhuma personagem encontrada.', style: bodyStyle());
}

class CastError extends StatelessWidget {
  const CastError({super.key});

  @override
  Widget build(BuildContext context) => Text('Não foi possível ler o elenco.', style: bodyStyle());
}
