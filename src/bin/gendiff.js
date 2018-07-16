#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .option('-f, --format [type]', 'output format')
  .action((before, after) => {
    console.log(genDiff(before, after));
  })
  .parse(process.argv);
