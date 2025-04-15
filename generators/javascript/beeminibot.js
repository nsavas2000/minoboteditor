/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Helper functions for generating JavaScript blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.JavaScript.bee');

goog.require('Blockly.JavaScript');

var isLiveMode = false;


Blockly.JavaScript['stepFNumber'] = function(block) {

    var step = block.getFieldValue('STEP');

    return [step, Blockly.JavaScript.ORDER_NONE]; 
};

Blockly.JavaScript['stepBNumber'] = function(block) {

    var step = block.getFieldValue('STEP');

    return [step, Blockly.JavaScript.ORDER_NONE]; 
};

Blockly.JavaScript['stepLNumber'] = function(block) {

    var step = block.getFieldValue('STEP');

    return [step, Blockly.JavaScript.ORDER_NONE]; 
};

Blockly.JavaScript['stepRNumber'] = function(block) {

    var step = block.getFieldValue('STEP');

    return [step, Blockly.JavaScript.ORDER_NONE]; 
};

Blockly.JavaScript['forward'] = function(block) {

    var value =  Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    
    return "GoForward(" + value + ");\n";
};

Blockly.JavaScript['backward'] = function(block) {

    var value =  Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    
    return "GoBackward(" + value + ");\n";
};

Blockly.JavaScript['turnRight'] = function(block) {

    var value =  Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    
    return "GoTurnRight(" + value + ");\n";
};

Blockly.JavaScript['turnLeft'] = function(block) {

    var value =  Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    
    return "GoTurnLeft(" + value + ");\n";
};