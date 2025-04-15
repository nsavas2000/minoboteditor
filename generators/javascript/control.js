/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for control blocks.
 * @author gasolin@gmail.com  (Fred Lin)
 */
'use strict';

goog.provide('Blockly.JavaScript.loops');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.controls_for = function() {
  // For loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var code;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    // Both arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0 + (up ? '++' : '--') + ') {\n' +
        branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
      var startVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
      var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '    (' + startVar + ' <= ' + endVar + ') ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '    ' + variable0 + ' += (' + startVar + ' <= ' + endVar +
            ') ? 1 : -1) {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.JavaScript.controls_whileUntil = function() {
  // Do while/until loop.
  var until = this.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'BOOL',
      until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
}

Blockly.JavaScript['control_wait'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  
  var code = "";
  
  code = "DelaySecond(" + duration + ");\n";

  return code;
};

Blockly.JavaScript['control_forever'] = function(block) {
    var branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
    branch = Blockly.JavaScript.addLoopTrap(branch, block);

    var code = 'while(isProgramRunning() == true) {' +
      'loopstep();' +
        branch + 
      '}'+ 
      'loopend();';  

    return code;
}

Blockly.JavaScript['control_repeat'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  }

  var branch = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);

  var code = '';
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);

  if(repeats.indexOf(",") > 0)
  {
      repeats = repeats.replace("(",  "");
      repeats = repeats.replace(")", "");
      var params = repeats.split(",")

      if(params.length == 2)
      {
        code = 
            '   ' + ' for (' + loopVar + ' = ' + params[0] + '; ' +
            '   ' + loopVar + ' < ' + params[1] + '; ' +
            '   ' + loopVar + '++) {\n' +
            '   ' + 'loopstep();\n' +
            '   ' + branch + 
            '  }\n' +
            '   ' + 'loopend();\n';
      }
      else if(params.length == 3)
      {
        if(params[2] < 0)
        {
          code = 
            '   ' + ' for (' + loopVar + ' = ' + params[0] + '; ' +
            '   ' + loopVar + ' < ' + params[1] + '; ' +
            '   ' + loopVar + ' = ' + loopVar + params[2] +') {\n' +
            '   ' + 'loopstep();\n' +
            '   ' + branch + 
            '  }\n' +
            '   ' + 'loopend();\n';
        }
        else
        {
          code = 
            '   ' + ' for (' + loopVar + ' = ' + params[0] + '; ' +
            '   ' + loopVar + ' < ' + params[1] + '; ' +
            '   ' + loopVar + ' = ' + loopVar + ' + ' +  params[2] +') {\n' +
            '   ' + 'loopstep();\n' +
            '   ' + branch + 
            '  }\n' +
            '   ' + 'loopend();\n';
        }
      }
  }
  else
  {
      var endVar = repeats;
     
        code = 
            '   ' + ' for (' + loopVar + ' = 0; ' +
            '   ' + loopVar + ' < ' + endVar + '; ' +
            '   ' + loopVar + '++) {\n' +
            '   ' + 'loopstep();\n' +
            '   ' + branch + 
            '  }\n' +
            '   ' + 'loopend();\n';
  }
  return code;
};

Blockly.JavaScript['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = Blockly.JavaScript.ORDER_ATOMIC;
              
  return [code, order];
};

Blockly.JavaScript['math_whole_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.JavaScript['math_positive_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.JavaScript.ORDER_ATOMIC :
              Blockly.JavaScript.ORDER_UNARY_NEGATION;
  return [code, order];
};

Blockly.JavaScript['text'] = function(block) {
  // Numeric value.
  var code = block.getFieldValue('TEXT');
  var order = Blockly.JavaScript.ORDER_ATOMIC;
              
  return [code, order];
};