import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-topic-stats-detail',
  templateUrl: './topic-stats-detail.component.html',
  styleUrl: './topic-stats-detail.component.css'
})
export class TopicStatsDetailComponent {
  // @Output() deleted: EventEmitter<User> = new EventEmitter<User>();
  @Input() index: number = 1;
  targetObj: string = 'Sample Topic' //Will replace with target object in the future using @Input to bind, for now just populate with a string

  deleteTopic(form: NgForm) {
    console.log(form.value);
    let conf;
    if (form.value.mergeTopic === 'None') {
      conf = confirm(`Are you sure you want to delete ${this.targetObj} and all its timestamps without merging them?  You will lose the recorded time.`)
    } else {
      conf = confirm(`Are you sure you want to delete ${this.targetObj} and merge its timestamps with ${form.value.mergeTopic} and then delete ${this.targetObj}?  This action is irreversable.`)
    }
  }
}
