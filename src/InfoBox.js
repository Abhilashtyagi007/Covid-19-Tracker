import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import "./infoBox.css";

function InfoBox({ title, cases, active, isRed, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} `}>
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title" color='textSecondary'>{title}</Typography>

                {/* +110k number of cases */}
                <h2 className={`infoBox__cases ${!isRed && "infoBox--cases--green"}`}>{cases}</h2>
                {/* 1M total */}
                <Typography className="infoBox__total" color='textSecondary'>{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
