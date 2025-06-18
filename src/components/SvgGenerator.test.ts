import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test, describe } from 'vitest';
import SvgGenerator from '@components/SvgGenerator.astro';

describe('SvgGenerator', () => {
  test('throws if SVG does not exist', async () => {
    const container = await AstroContainer.create();
    await expect(() =>
      container.renderToString(SvgGenerator, {
        props: { svg: 'non-existent-icon' },
      }),
    ).rejects.toThrow(/not found/);
  });

  test('renders a valid SVG', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SvgGenerator, {
      props: { svg: 'icons/external-link-blue' },
    });
    expect(result).toContain('<svg');
  });

  test('renders a valid SVG with custom classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SvgGenerator, {
      props: { svg: 'icons/external-link-blue', className: 'custom-class' },
    });
    expect(result).toContain('class="custom-class"');
  });

  test('renders a valid SVG with an id attribute', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SvgGenerator, {
      props: { svg: 'icons/external-link-blue', id: 'unique-id' },
    });
    expect(result).toContain('id="unique-id"');
  });
});
