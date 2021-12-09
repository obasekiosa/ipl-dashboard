import { React, useEffect, useState } from 'react';
import { TeamTile } from '../components/TeamTile';


import './HomePage.scss';


export const HomePage = () => {

    const [teams, setTeams] = useState(null);

    useEffect(() => {

        const fetchTeams = async () => {
            const response = await fetch(`http://localhost:8080/team`);
            const data = await response.json();
            setTeams(data);
        };

        fetchTeams();
    }, []);

    if (!teams) return null;
    else if (!teams.length) return <h1>No Team Found</h1>

    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name">IPL DashBoard</h1>
            </div>
            <div className="team-grid">
                {
                    teams.map(team => <TeamTile key={team.id} teamName={team.teamName} team={team}/>)
                }
            </div>
        </div>
    );
}


