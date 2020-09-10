import React, { useRef, useEffect } from 'react'
import './index.css'
export default function Home() {
    const fileInput = useRef()
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(fileInput.current.files[0])
    }

    return (
        <div>
            <form className="form" action="">
                <div className="form__header">
                    <span>Согласование изменений параметров работы скважин на 12 августа</span>
                    <div className="form__actions">
                        <i className="material-icons form__btn form__btn_close">close</i>
                        <i className="material-icons form__btn form__btn_expand">unfold_more</i>
                    </div>
                </div>
                <div className="form__content">
                    <div className="form__search-container">
                        <select name="" id=""></select>
                    </div>
                    <table className="form__table">
                        <tr>
                            <th>Параметр</th>
                            <th>На Согласование</th>
                            <th>08.08.2020</th>
                            <th>+/-</th>
                        </tr>
                        <tr>
                            <td>Qж</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>%воды</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Нд</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Рлин</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Рбуф</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Рзатр</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div className="form__footer"></div>
            </form>
        </div>
    )
}
