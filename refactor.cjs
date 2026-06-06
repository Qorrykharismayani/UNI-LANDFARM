const fs = require('fs');
const path = require('path');

const appTsxPath = 'd:/Uni-LandFarm/src/App.tsx';
let content = fs.readFileSync(appTsxPath, 'utf8');

// Create directories
const componentsDir = 'd:/Uni-LandFarm/src/components';
const pagesDir = 'd:/Uni-LandFarm/src/pages';
const layoutsDir = 'd:/Uni-LandFarm/src/layouts';

if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });
if (!fs.existsSync(layoutsDir)) fs.mkdirSync(layoutsDir, { recursive: true });

function extractComponent(name) {
    const regex = new RegExp(`const ${name} = \\([^{]*{[\\s\\S]*?^};\\n`, 'm');
    const match = content.match(regex);
    if (match) {
        let compCode = match[0];
        content = content.replace(compCode, '');
        return compCode;
    }
    
    const regexArrow = new RegExp(`const ${name} = \\([^{]*\\) => \\([\\s\\S]*?^\\);\\n`, 'm');
    const matchArrow = content.match(regexArrow);
    if (matchArrow) {
        let compCode = matchArrow[0];
        content = content.replace(compCode, '');
        return compCode;
    }

    return null;
}

const navbarCode = extractComponent('Navbar');
const heroCode = extractComponent('Hero');
const featuresCode = extractComponent('Features');

const imports = `import React, { useState } from 'react';
import { Cpu, ChevronDown, Zap, Bot, Database, Moon, Sun, ArrowRight, Monitor, Smartphone, BarChart3, LineChart, Layout, CreditCard, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';\n\n`;

if (navbarCode) fs.writeFileSync(path.join(componentsDir, 'Navbar.tsx'), imports + "export " + navbarCode);
if (heroCode) fs.writeFileSync(path.join(componentsDir, 'Hero.tsx'), imports + "export " + heroCode);
if (featuresCode) fs.writeFileSync(path.join(componentsDir, 'Features.tsx'), imports + "export " + featuresCode);

// Add imports to App.tsx
const appImports = `import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';\n`;

content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\n" + appImports);

fs.writeFileSync(appTsxPath, content);
console.log('Refactoring successful!');
