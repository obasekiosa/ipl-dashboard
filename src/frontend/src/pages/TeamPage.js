import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom';

import './TeamPage.scss';


export const TeamPage = () => {

    const [team, setTeam] = useState(null);
    const { teamName } = useParams();

    useEffect(() => {
        
        const fetchTeams = async () => {
            const response = await fetch(`http://localhost:8080/team/${teamName}`);
            const data = await response.json();
            setTeam(data);
        };
        
        fetchTeams();
    }, [teamName]);

    if (!team ) return null;
    else if ( !team.teamName) return <h1>Team Not Found</h1>

    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className="team-name">{team.teamName}</h1>
            </div>
            <div className="win-loss-section">
               <p>Wins / Losses</p>
                <PieChart
                    data={[
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
                        { title: 'Wins', value: team.totalWins, color: '#4da375' },
                    ]}
                    label= {({dataEntry}) => {
                        return `${Math.round(dataEntry.percentage)}%`;
                    }}
                />
            </div>
            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={ team.teamName } match={team.matches[0]} />
            </div>
            {team.matches.slice(1).map((match, index) => <MatchSmallCard key={match.id} match={match} teamName={team.teamName} />) }

            <div className="more-details-link">
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR} `}>
                    More >
                </Link>
            </div>
        </div>
    );
}


