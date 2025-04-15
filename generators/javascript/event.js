
//http://www.seeedstudio.com/wiki/GROVE_System
//http://www.seeedstudio.com/depot/index.php?main_page=advanced_search_result&search_in_description=1&keyword=grovefamily
//support starter bundle example http://www.seeedstudio.com/wiki/GROVE_-_Starter_Kit_V1.1b

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
 * @fileoverview Helper functions for generating seeeduino grove blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */

goog.provide('Blockly.JavaScript.event');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['event_whenplayclicked'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "BeeStart();\n";
  return code;
};

Blockly.JavaScript['event_whenflagclicked'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "BeeStart();\n";
  return code;
};

Blockly.JavaScript['call_fn'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "BeeFunction();\n";
  return code;
};