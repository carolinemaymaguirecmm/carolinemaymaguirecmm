// @ts-check
// Generates llms.txt (an index of the site for AI assistants, see https://llmstxt.org)
// and llms-full.txt (every page's Markdown in one file) after each build.
// Page order and sections follow sidebars.js, so the files stay in step with the site nav.

const fs = require('fs');
const path = require('path');

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;

/** Reads a doc and returns its title, a one-line description and the body without front matter. */
function readDoc(docsDir, id) {
  const file = ['.md', '.mdx'].map((ext) => path.join(docsDir, id + ext)).find(fs.existsSync);
  if (!file) throw new Error(`[llms-txt] No Markdown file for doc id "${id}"`);

  const raw = fs.readFileSync(file, 'utf8');
  const fm = raw.match(FRONT_MATTER);
  const body = (fm ? raw.slice(fm[0].length) : raw).replace(/\r\n/g, '\n').trim();

  const fmTitle = fm && fm[1].match(/^title:\s*["']?(.*?)["']?\s*$/m);
  const h1 = body.match(/^#\s+(.+)$/m);
  const title = (fmTitle ? fmTitle[1] : h1 ? h1[1] : id).trim();

  // First plain paragraph after the H1: skip headings, lists, images and blank lines.
  const description = body
    .split('\n\n')
    .map((block) => block.trim())
    .find((block) => block && !/^(#|-|\*|\d+\.|!\[|```|<)/.test(block));

  return {title, description: description ? description.replace(/\s+/g, ' ') : '', body};
}

/** Mirrors Docusaurus routing: "x/index" and "x/x" both resolve to "x/". */
function routeFor(id) {
  const parts = id.split('/');
  const last = parts[parts.length - 1];
  if (last === 'index' || (parts.length > 1 && last === parts[parts.length - 2])) parts.pop();
  return parts.length ? parts.join('/') + '/' : '';
}

/** Flattens a sidebar into sections: [{label, ids}]. Top-level docs go in an untitled section. */
function sectionsFrom(items) {
  const sections = [{label: null, ids: []}];
  for (const item of items) {
    if (item.type === 'doc') sections[0].ids.push(item.id);
    if (item.type === 'category') {
      const ids = [];
      if (item.link && item.link.type === 'doc') ids.push(item.link.id);
      ids.push(...item.items.filter((i) => i.type === 'doc').map((i) => i.id));
      sections.push({label: item.label, ids});
    }
  }
  return sections;
}

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function llmsTxtPlugin(context, options) {
  const {siteDir, siteConfig} = context;
  const {sidebarsPath = 'sidebars.js', sidebarId, summary = siteConfig.tagline, extraLinks = []} = options;

  return {
    name: 'llms-txt',

    async postBuild({outDir, routesPaths}) {
      const docsDir = path.join(siteDir, 'docs');
      const sidebars = require(path.resolve(siteDir, sidebarsPath));
      const siteUrl = siteConfig.url + siteConfig.baseUrl;

      const index = [`# ${siteConfig.title}`, '', `> ${summary}`, ''];
      const full = [`# ${siteConfig.title}`, '', `> ${summary}`, ''];

      for (const {label, ids} of sectionsFrom(sidebars[sidebarId])) {
        if (!ids.length) continue;
        index.push(`## ${label || 'Overview'}`, '');

        for (const id of ids) {
          const route = siteConfig.baseUrl + routeFor(id);
          // Fail the build rather than publish a link to a page that doesn't exist.
          if (!routesPaths.includes(route)) {
            throw new Error(`[llms-txt] Doc "${id}" maps to ${route}, which isn't a built route`);
          }
          const url = siteUrl + routeFor(id);
          const {title, description, body} = readDoc(docsDir, id);

          index.push(`- [${title}](${url})${description ? `: ${description}` : ''}`);
          full.push('---', '', `Source: ${url}`, '', body, '');
        }

        if (label && extraLinks.some((l) => l.section === label)) {
          for (const l of extraLinks.filter((x) => x.section === label)) {
            index.push(`- [${l.title}](${siteUrl}${l.path})${l.description ? `: ${l.description}` : ''}`);
          }
        }
        index.push('');
      }

      fs.writeFileSync(path.join(outDir, 'llms.txt'), index.join('\n'));
      fs.writeFileSync(path.join(outDir, 'llms-full.txt'), full.join('\n'));
      console.log('[llms-txt] Wrote llms.txt and llms-full.txt');
    },
  };
};
