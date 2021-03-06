package com.github.obasekiosa.ipldashboard.controller;

import java.util.List;

import com.github.obasekiosa.ipldashboard.model.Match;
import com.github.obasekiosa.ipldashboard.model.Team;
import com.github.obasekiosa.ipldashboard.repository.MatchRepository;
import com.github.obasekiosa.ipldashboard.repository.TeamRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;
    
    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }
    
    @GetMapping("/team")
    public Iterable<Team> getAllTeams() {
        return this.teamRepository.findAll();
    }
    
    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = this.teamRepository.findByTeamName(teamName);

        team.setMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));

        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatches(@PathVariable String teamName, @RequestParam int year) {
        return this.matchRepository.findAllMatchesByTeamWithinYear(teamName, year);
    }


    

    
}
