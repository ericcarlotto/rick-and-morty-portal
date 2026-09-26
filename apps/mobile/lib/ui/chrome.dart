import 'package:flutter/material.dart';
import 'package:mobile/theme/text_styles.dart';

class PageFrame extends StatelessWidget {
  const PageFrame({required this.children, super.key});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 24, 20, 48),
          children: children,
        ),
      ),
    );
  }
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

class CastError extends StatelessWidget {
  const CastError({super.key});

  @override
  Widget build(BuildContext context) => Text('Não foi possível ler o elenco.', style: bodyStyle());
}
