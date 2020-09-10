import React from 'react'
import ReactTooltip from 'react-tooltip';


export default function TableRow(props) {
    const { title, currentData, rejectionReason, disableForm, handleTextInput, required, response } = props
    const currentValue = currentData && currentData[title] ? currentData[title].value : undefined
    const color = response !== undefined ? response ? 'green' : 'red' : ''
    const tooltip = response !== undefined ? response ? 'Принятно' : 'Отклонено' : ''
    return (
        <tr data-tip={tooltip}>

            <td style={{ color: color }}>{title}</td>
            <td>
                <input required={required} className='form__input' value={currentValue} onChange={event => handleTextInput(event, title)} disabled={disableForm} type="text" />
            </td>
            <td>{rejectionReason[title]}</td>
            <td>
                {currentValue - rejectionReason[title] || ''}
            </td>
            <ReactTooltip backgroundColor={color} />
        </tr>
    )
}
