import React from "react";
import CodeMirror from 'react-codemirror2';
import './editor.less';
require('codemirror/lib/codemirror.css'); // e.g. webpack css loader
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/keymap/sublime.js');


export default class Editor extends React.Component {
    render() {
        return (
            <CodeMirror className="editor"
                value='<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>react demo</title></head><body><div id="root"></div></body></html>'
                options={{
                    lineNumbers: true,
                }}
                onSet={(editor, value) => {
                   // console.log('set', { value });
                }}
                onChange={(editor, metadata, value) => {
                    //console.log('change', { value });
                }}
            />
        )
    }

}