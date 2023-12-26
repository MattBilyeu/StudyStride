import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-topic-stats',
  templateUrl: './topic-stats.component.html',
  styleUrls: ['./topic-stats.component.css']
})
export class TopicStatsComponent {
  sampleTopic: string = 'Sample topic';

  createTopic(form: NgForm) {
    console.log(form.value.newTopic)
  }
}