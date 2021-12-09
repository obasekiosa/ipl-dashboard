package com.github.obasekiosa.ipldashboard.repository;

import java.time.LocalDate;
import java.util.List;

import com.github.obasekiosa.ipldashboard.model.Match;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface MatchRepository extends CrudRepository<Match, Long>{
    
    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
        String team1, LocalDate date1, LocalDate date2,
        String team2, LocalDate date3, LocalDate date4
        );


    default List<Match> findLatestMatchesByTeam(String teamName, int count) {
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
    }

    default List<Match> findAllMatchesByTeamWithinYear(String teamName, int year) {
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);

        return getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
            teamName, startDate, endDate,
            teamName, startDate, endDate
            );
    }
}
