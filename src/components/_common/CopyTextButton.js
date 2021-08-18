// @flow
import React, {useState} from 'react'
import { Button, UncontrolledTooltip } from "reactstrap";

const CopyTextButton = (props) => {
    const [tooltipText, setTooltipText] = useState("Copy to clipboard")

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("input");
        document.body.appendChild(textArea);

        textArea.value = text;

        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (err) {
        }

        document.body.removeChild(textArea);
    }

    function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text)

        setTooltipText('Copied!')
    }

    return (
        <div>
            <Button color="secondary" size="sm" onClick={() => copyTextToClipboard(props.text)} id={props.id}>{props.label || "Copy"}</Button>
            <UncontrolledTooltip placement="top" target={props.id}>
                {tooltipText}
            </UncontrolledTooltip>
        </div>
    )
}

export default CopyTextButton
