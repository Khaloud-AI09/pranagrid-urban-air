import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Competition Rules & Compliance Audit', () => {
  const FORBIDDEN_STATE_AND_CITY_NAMES = [
    'delhi',
    'punjab',
    'haryana',
    'uttar pradesh',
    'bihar',
    'maharashtra',
    'rajasthan',
    'gujarat',
    'karnataka',
    'tamil nadu',
    'west bengal',
    'kerala',
    'andhra pradesh',
    'madhya pradesh',
    'mumbai',
    'bengaluru',
    'bangalore',
    'kolkata',
    'chennai',
    'hyderabad',
    'pune',
    'ahmedabad',
    'lucknow',
    'kanpur',
    'patna',
    'jaipur',
    'ncr',
    'chandigarh',
    'gurugram',
    'noida',
  ];

  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
          arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        }
      } else {
        if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html') || file.endsWith('.json')) {
          // exclude test file itself to avoid false positives on list
          if (!file.includes('compliance.test')) {
            arrayOfFiles.push(fullPath);
          }
        }
      }
    });

    return arrayOfFiles;
  }

  it('strictly contains ZERO Indian state or city names across all source files and index.html', () => {
    const srcDir = path.resolve(__dirname, '../');
    const indexHtml = path.resolve(__dirname, '../../index.html');
    const filesToCheck = [...getAllFiles(srcDir), indexHtml];

    const violations: Array<{ file: string; match: string }> = [];

    filesToCheck.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf-8').toLowerCase();
        FORBIDDEN_STATE_AND_CITY_NAMES.forEach(forbidden => {
          // Check for whole word match
          const regex = new RegExp(`\\b${forbidden}\\b`, 'i');
          if (regex.test(content)) {
            violations.push({ file: path.basename(file), match: forbidden });
          }
        });
      }
    });

    expect(violations).toEqual([]);
  });

  it('strictly implements all 5 required atmospheric archetypes without geographic state references', () => {
    const urbanProfilesPath = path.resolve(__dirname, '../data/urbanProfiles.ts');
    const content = fs.readFileSync(urbanProfilesPath, 'utf-8');

    expect(content).toContain('Indo-Gangetic Dense Metro');
    expect(content).toContain('Industrial & Transit Corridor');
    expect(content).toContain('Tier-2 Valley Inversion Zone');
    expect(content).toContain('Coastal Urban Hub');
    expect(content).toContain('Suburban Residential Hub');
  });
});
