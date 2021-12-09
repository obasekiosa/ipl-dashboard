import { React } from 'react';
import './CreatorInfoCard.scss';


export const CreatorInfoCard = () => {


    return (
        <div className="CreatorInfoCard">
            <a className="repo" href="https://github.com/obasekiosa/ipl-dashboard">Repo</a>
            <a className="github" href="https://gihub.com/obasekiosa">GitHub</a>
            <a className="twitter" href="https://twitter.com/obasekiosa">Twitter</a>
            <a className="medium" href="https://medium.com/@obasekiosa">Medium</a>
            <a className="linkedin" href="https://linkedin.com/in/obasekiosa">LinkedIn</a>
        </div>
    )
}