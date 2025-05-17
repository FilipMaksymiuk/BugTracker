package com.lepszasrednia.bugtracker.controller;

import com.lepszasrednia.bugtracker.entity.BugAssignment;
import com.lepszasrednia.bugtracker.entity.BugReportComment;
import com.lepszasrednia.bugtracker.repository.BugAssignmentRepository;
import com.lepszasrednia.bugtracker.repository.BugReportCommentRepository;
import com.lepszasrednia.bugtracker.repository.BugReportRepository;
import com.lepszasrednia.bugtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class BugReportCommentController {
    private final BugReportCommentRepository bugReportCommentRepository;
    private final BugReportRepository bugReportRepository;
    private final UserRepository userRepository;

    @Autowired
    public BugReportCommentController(
            BugReportCommentRepository bugReportCommentRepository,
            BugReportRepository bugReportRepository,
            UserRepository userRepository
    ){
        this.bugReportCommentRepository = bugReportCommentRepository;
        this.bugReportRepository = bugReportRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{bug_report_id}")
    public ResponseEntity<List<BugReportComment>> getBugReportComment(@PathVariable Integer bug_report_id) {
        List<BugReportComment> comments = bugReportCommentRepository.findBugReportCommentsByBugReport_Id(bug_report_id);
        return ResponseEntity.ok(comments);
    }

}
