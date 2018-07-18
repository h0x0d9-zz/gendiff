#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .option('-f, --format [type]', 'output format (deep, plain)')
  .action((before, after) => {
    console.log(gendiff(before, after, program.format));
  })
  .parse(process.argv);
