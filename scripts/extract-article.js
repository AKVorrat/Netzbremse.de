#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

/**
 * Simple HTML parser to extract meta tags and title
 */
class SimpleHTMLParser {
  constructor(html) {
    this.html = html;
  }

  extractTitle() {
    // Try Open Graph title first
    const ogTitleMatch = this.html.match(/<meta[^>]*property=['"]og:title['"][^>]*content=['"]([^'"]*)['"]/i);
    if (ogTitleMatch) {
      return this.decodeHTML(ogTitleMatch[1]);
    }

    // Fallback to title tag
    const titleMatch = this.html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch) {
      return this.decodeHTML(titleMatch[1]).trim();
    }

    return null;
  }

  extractDescription() {
    // Try Open Graph description
    const ogDescMatch = this.html.match(/<meta[^>]*property=['"]og:description['"][^>]*content=['"]([^'"]*)['"]/i);
    if (ogDescMatch) {
      return this.decodeHTML(ogDescMatch[1]);
    }

    // Try meta description
    const metaDescMatch = this.html.match(/<meta[^>]*name=['"]description['"][^>]*content=['"]([^'"]*)['"]/i);
    if (metaDescMatch) {
      return this.decodeHTML(metaDescMatch[1]);
    }

    return null;
  }

  extractPublishDate() {
    // Try various date meta tags
    const datePatterns = [
      /<meta[^>]*property=['"]article:published_time['"][^>]*content=['"]([^'"]*)['"]/i,
      /<meta[^>]*name=['"]date['"][^>]*content=['"]([^'"]*)['"]/i,
      /<meta[^>]*name=['"]publish_date['"][^>]*content=['"]([^'"]*)['"]/i,
      /<meta[^>]*name=['"]article:published_time['"][^>]*content=['"]([^'"]*)['"]/i,
      /<meta[^>]*property=['"]og:updated_time['"][^>]*content=['"]([^'"]*)['"]/i,
      /<meta[^>]*name=['"]DC\.date\.issued['"][^>]*content=['"]([^'"]*)['"]/i
    ];

    for (const pattern of datePatterns) {
      const match = this.html.match(pattern);
      if (match) {
        const dateStr = match[1];
        try {
          const date = new Date(dateStr);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
          }
        } catch (e) {
          // Invalid date, continue to next pattern
        }
      }
    }

    return null;
  }

  decodeHTML(text) {
    const entities = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
      '&nbsp;': ' '
    };

    return text.replace(/&[#\w]+;/g, (entity) => {
      return entities[entity] || entity;
    });
  }
}

/**
 * Article metadata extractor
 */
class ArticleExtractor {
  constructor() {
    // No longer handling images
  }

  getDomainFromUrl(url) {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch (error) {
      return null;
    }
  }

  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https:') ? https : http;

      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      };

      client.get(url, options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${response.statusCode}`));
          }
        });
      }).on('error', reject);
    });
  }

  async extractMetadata(url) {
    try {
      console.log(`Extracting metadata from: ${url}`);

      const html = await this.fetchPage(url);
      const parser = new SimpleHTMLParser(html);
      const domain = this.getDomainFromUrl(url);

      if (!domain) {
        throw new Error('Invalid URL');
      }

      const title = parser.extractTitle();
      const description = parser.extractDescription();
      const publishDate = parser.extractPublishDate();

      // Clean up text
      const cleanTitle = title ? title.replace(/\s+/g, ' ').trim() : null;
      const cleanDescription = description ? description.replace(/\s+/g, ' ').trim() : null;

      return {
        title: cleanTitle,
        description: cleanDescription,
        domain,
        url,
        publishDate
      };

    } catch (error) {
      console.error(`✗ Error extracting metadata from ${url}: ${error.message}`);
      return null;
    }
  }

  createMarkdownFile(metadata, outputDir = 'content/coverage') {
    if (!metadata || !metadata.title) {
      console.error('✗ Cannot create file without title');
      return null;
    }

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Find next available number
    const existingFiles = fs.readdirSync(outputDir)
      .filter(f => f.endsWith('.md'))
      .filter(f => /^\d/.test(f));

    const existingNumbers = existingFiles
      .map(f => parseInt(f.split('-')[0]))
      .filter(n => !isNaN(n));

    const nextNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

    // Create filename - remove www. prefix and clean domain
    let domainForFilename = metadata.domain.replace(/^www\./, ''); // Remove www. prefix
    domainForFilename = domainForFilename.split('.')[0]; // Take only the main part (e.g., "heise" from "heise.de")
    const filename = `${nextNum.toString().padStart(3, '0')}-${domainForFilename}.md`;
    const filepath = path.join(outputDir, filename);

    // Prepare frontmatter
    const frontmatter = {
      title: metadata.title,
      params: {
        publication: metadata.domain,
        url: metadata.url
      },
      date: metadata.publishDate || new Date().toISOString().split('T')[0]
    };

    // Convert frontmatter to YAML
    const yamlLines = ['---'];
    yamlLines.push(`title: '${frontmatter.title.replace(/'/g, "''")}'`);
    yamlLines.push('params:');
    yamlLines.push(`  publication: "${frontmatter.params.publication}"`);
    yamlLines.push(`  url: "${frontmatter.params.url}"`);
    yamlLines.push(`date: ${frontmatter.date}`);
    yamlLines.push('---');

    let content = yamlLines.join('\n') + '\n';
    if (metadata.description) {
      content += metadata.description;
    }

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✓ Created: ${filepath}`);
    return filepath;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node extract-article.js <url> [options]

Options:
  --no-file            Only extract and display metadata, do not create file
  --output-dir <dir>   Output directory for markdown files (default: content/coverage)
  --help, -h           Show this help message

Examples:
  node extract-article.js "https://example.com/article"
  node extract-article.js "https://example.com/article" --no-file
`);
    return 0;
  }

  const url = args[0];
  const noFile = args.includes('--no-file');

  const outputDirIndex = args.indexOf('--output-dir');
  const outputDir = outputDirIndex !== -1 && args[outputDirIndex + 1] ? args[outputDirIndex + 1] : 'content/coverage';

  const extractor = new ArticleExtractor();
  const metadata = await extractor.extractMetadata(url);

  if (!metadata) {
    console.error('✗ Failed to extract metadata');
    return 1;
  }

  console.log(`\n📰 Title: ${metadata.title}`);
  console.log(`🌐 Domain: ${metadata.domain}`);
  const desc = metadata.description;
  console.log(`📝 Description: ${desc && desc.length > 100 ? desc.substring(0, 100) + '...' : desc || 'None'}`);
  console.log(`📅 Publish Date: ${metadata.publishDate || 'Not found'}`);

  if (!noFile) {
    const filepath = extractor.createMarkdownFile(metadata, outputDir);
    if (filepath) {
      console.log(`\n✅ Successfully created ${filepath}`);
    } else {
      return 1;
    }
  }

  return 0;
}

if (require.main === module) {
  main().then(code => process.exit(code)).catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = { ArticleExtractor };