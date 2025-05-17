import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BugReportService} from '../../services/bug-report.service';
import {BugReport} from '../../common/bug-report';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../common/comment';

@Component({
  selector: 'app-bug-report-details',
  standalone: false,
  templateUrl: './bug-report-details.component.html',
  styleUrl: './bug-report-details.component.css'
})
export class BugReportDetailsComponent implements OnInit {
  bugReport?: BugReport;
  comments: Comment[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private bugReportService: BugReportService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.loadBugReport(id);
      this.loadComments(id);
    }
  }

  loadBugReport(id: number): void {
    this.bugReportService.getBugReportById(id).subscribe({
      next: (data) => {
        this.bugReport = data;
      },
      error: (err) => {
        console.error('Error fetching report:', err);
      }
    });
  }

  loadComments(bugReportId: number): void {
    this.commentService.getCommentsByBugReportId(bugReportId).subscribe({
      next: (data) => {
        // Sort comments by date (oldest first) so newest will be at bottom
        this.comments = data.sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      }
    });
  }

  addComment(): void {
    if (!this.newComment.trim() || !this.bugReport?.id) return;

    this.commentService.addComment(this.bugReport.id, this.newComment).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newComment = '';
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    });
  }
}
