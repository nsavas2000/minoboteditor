/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
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
 * @fileoverview Wedo blocks for Scratch (Horizontal)
 * @author ascii@media.mit.edu <Andrew Sliwinski>
 */
'use strict';

goog.provide('Blockly.Blocks.bee');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

Blockly.Blocks['stepFNumber'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/fnum1.png',
                value: '0', width: 72, height: 72, alt: '1'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/fnum2.png',
                value: '1', width: 72, height: 72, alt: '2'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/fnum3.png',
                value: '2', width: 72, height: 72, alt: '3'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/fnum4.png',
                value: '3', width: 72, height: 72, alt: '4'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/fnum5.png',
                value: '4', width: 72, height: 72, alt: '5'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/fnum6.png',
                value: '5', width: 72, height: 72, alt: '6'}
            ]), 'STEP');
    this.setOutput(true);
    this.setColour("#0090f5",
        "#0051f5",
        "#0051f5"
    );
  }
};

Blockly.Blocks['stepBNumber'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/bnum1.png',
                value: '0', width: 72, height: 72, alt: '1'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/bnum2.png',
                value: '1', width: 72, height: 72, alt: '2'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/bnum3.png',
                value: '2', width: 72, height: 72, alt: '3'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/bnum4.png',
                value: '3', width: 72, height: 72, alt: '4'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/bnum5.png',
                value: '4', width: 72, height: 72, alt: '5'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/bnum6.png',
                value: '5', width: 72, height: 72, alt: '6'}
            ]), 'STEP');
    this.setOutput(true);
    this.setColour("#0090f5",
        "#0051f5",
        "#0051f5"
    );
  }
};

Blockly.Blocks['stepRNumber'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/rnum1.png',
                value: '0', width: 72, height: 72, alt: '1'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/rnum2.png',
                value: '1', width: 72, height: 72, alt: '2'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/rnum3.png',
                value: '2', width: 72, height: 72, alt: '3'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/rnum4.png',
                value: '3', width: 72, height: 72, alt: '4'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/rnum5.png',
                value: '4', width: 72, height: 72, alt: '5'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/rnum6.png',
                value: '5', width: 72, height: 72, alt: '6'}
            ]), 'STEP');
    this.setOutput(true);
    this.setColour("#0090f5",
        "#0051f5",
        "#0051f5"
    );
  }
};

Blockly.Blocks['stepLNumber'] = {
  /**
   * Block for motor speed drop-down (used for shadow).
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldIconMenu(
            [
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/lnum1.png',
                value: '0', width: 72, height: 72, alt: '1'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/lnum2.png',
                value: '1', width: 72, height: 72, alt: '2'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/lnum3.png',
                value: '2', width: 72, height: 72, alt: '3'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/lnum4.png',
                value: '3', width: 72, height: 72, alt: '4'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/lnum5.png',
                value: '4', width: 72, height: 72, alt: '5'},
                {src: Blockly.mainWorkspace.options.pathToMedia + 'icons/numbers/lnum6.png',
                value: '5', width: 72, height: 72, alt: '6'}
            ]), 'STEP');
    this.setOutput(true);
    this.setColour("#0090f5",
        "#0051f5",
        "#0051f5"
    );
  }
};

Blockly.Blocks['forward'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "forward",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/numbers/fnum1.png",
          "width": 40,
          "height": 40,
          "alt": "value"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": "#0090f5",
      "colourSecondary":  "#0051f5",
      "colourTertiary":  "#0051f5"
    });
  }
};

Blockly.Blocks['backward'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "backward",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/numbers/bnum1.png",
          "width": 40,
          "height": 40,
          "alt": "value"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": "#0090f5",
      "colourSecondary":  "#0051f5",
      "colourTertiary":  "#0051f5"
    });
  }
};

Blockly.Blocks['turnRight'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "turnRight",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/numbers/rnum1.png",
          "width": 40,
          "height": 40,
          "alt": "value"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": "#0090f5",
      "colourSecondary":  "#0051f5",
      "colourTertiary":  "#0051f5"
    });
  }
};

Blockly.Blocks['turnLeft'] = {
  /**
   * Block to set motor speed.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "turnLeft",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/numbers/lnum1.png",
          "width": 40,
          "height": 40,
          "alt": "value"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "category": Blockly.Categories.looks,
      "colour": "#0090f5",
      "colourSecondary":  "#0051f5",
      "colourTertiary":  "#0051f5"
    });
  }
};
