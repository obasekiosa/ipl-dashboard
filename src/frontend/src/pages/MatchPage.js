import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MatchDetailCard } from '../components/MatchDetailCard';
// import { MatchSmallCard } from '../components/MatchSmallCard';
import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';


export const MatchPage = () => {

    const [matches, setMatches] = useState([]);

    const { teamName, year } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatches(data);
            }

            fetchMatches();
        }, [teamName, year]
    )


    return (
        <div className="MatchPage">
            <div>
                <div className="year-selector">
                    <h3>Select Year</h3>
                    <YearSelector teamName={teamName} />
                </div>
            </div>
            <div>
                <h1 className="page-title">{teamName} matches in {year} </h1>
                {
                    matches.length > 0 
                    ? matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
                    : <h2 className="error-msg">Opps {teamName} didn't Play this year</h2>
                }
            </div>
        </div>
    );
}


