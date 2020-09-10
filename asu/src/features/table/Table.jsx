import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    getDataAsync,
    selectLoading,
    selectData
} from './tableSlice';
import TableRow from './TableRow'
import './table.css'

export function Table() {
    const data = useSelector(selectData);
    const loading = useSelector(selectLoading)
    const [disableForm, setDisableForm] = useState(false)
    const [regectionReasonIndex, setregectionReasonIndex] = useState(-1)
    const dispatch = useDispatch();
    const fileInput = useRef()
    const [rejectionReason, setRejectionReason] = useState({})
    const [currentData, setCurrentData] = useState({})
    const [currentQn, setcurrentQn] = useState(undefined)
    const [rejectedQn, setrejectedQn] = useState(undefined)
    const [titles, settitles] = useState([
        { title: "Qж", required: true, response: undefined },
        { title: "%воды", required: true, response: undefined },
        { title: "Нд", required: false, response: undefined },
        { title: "Рлин", required: false, response: undefined },
        { title: "Рбуф", required: false, response: undefined },
        { title: "Рзатр", required: false, response: undefined }
    ])

    useEffect(() => {
        dispatch(getDataAsync() || 0)
    }, [])

    useEffect(() => {
        if (rejectionReason && rejectionReason["Qж"] && rejectionReason["%воды"]) {
            setrejectedQn(rejectionReason["Qж"] * (1 - (rejectionReason["%воды"] / 100)))
        }
        if (currentData && currentData["Qж"] && currentData["%воды"]) {
            setcurrentQn(currentData["Qж"].value * (1 - (currentData["%воды"].value / 100)))
        }
    }, [currentData, rejectionReason])


    useEffect(() => {
        data && data.rejection_reasons && setRejectionReason(data.rejection_reasons[0])
        if (loading) {
            setDisableForm(true)
        } else {
            setDisableForm(false)

        }
    }, [loading])


    const handleReasonChange = event => {
        const index = event.target.value

        setregectionReasonIndex(index)
        setRejectionReason(data.rejection_reasons[index])
    }

    const handleTextInput = (event, key) => {
        setCurrentData({ ...currentData, [key]: { value: event.target.value } })
    }
    const randomResponse = (e) => {
        e.preventDefault();
        setDisableForm(true)
        setTimeout(() => {
            let temp = [...titles]
            temp.forEach(element => {
                if (element.title === 'Qж' || element.title === '%воды') {
                    element.response = Math.round(Math.random())
                }
            });
            settitles(temp)
            setDisableForm(false)
        }, 1000);

    }
    return (
        <form onSubmit={randomResponse} className="form">

            <div className="form__header">
                <span>Согласование изменений параметров работы скважин на 12 августа</span>
                <div className="form__actions">
                    <i className="material-icons form__btn form__btn_close">close</i>
                    <i className="material-icons form__btn form__btn_expand">unfold_more</i>
                </div>
            </div>
            <div className="form__content">
                <i className="form__label">{data.title}</i>
                <fieldset align="left" className="form__search-container">
                    <legend>Причина отклонения</legend>
                    <select disabled={disableForm} value={regectionReasonIndex || 0} onChange={handleReasonChange} name="" id="">
                        {data.rejection_reasons && data.rejection_reasons.map((e, i) => {
                            return <option value={i} key={i}>{e.title}</option>
                        })}
                    </select>
                </fieldset>
                <table className="form__table">
                    <thead>
                        <tr>
                            <th>Параметр</th>
                            <th>На Согласование</th>
                            <th>{rejectionReason.date}</th>
                            <th>+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titles.map(({ title, required, response }) => {
                            return (<TableRow
                                title={title}
                                required={required}
                                response={response}
                                disableForm={disableForm}
                                currentData={currentData}
                                rejectionReason={rejectionReason}
                                handleTextInput={handleTextInput}
                            />)
                        })
                        }

                        <tr>
                            <td>Qн</td>
                            <td>{currentQn}</td>
                            <td>{rejectedQn}</td>
                            <td>{currentQn - rejectedQn || ''}</td>
                        </tr>

                    </tbody>
                </table>
                <fieldset className="form__description" align="left" >
                    <legend>Мероприятия по возврату снижений</legend>
                    <textarea name="" id="" rows="10"></textarea>
                </fieldset>
            </div>
            <div className="form__footer">
                <div className="spacer"></div>
                <button disabled={disableForm} type="submit" >На согласование</button>
            </div>
        </form>

    )
}
