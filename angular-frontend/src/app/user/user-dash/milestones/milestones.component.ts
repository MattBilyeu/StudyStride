import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { HttpService } from '../../../service/http.service';
import { Response } from '../../../models/response.model';
import { NgForm } from '@angular/forms';

interface Milestone {
  name: string;
  completed: Boolean
}

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.css'
})
export class MilestonesComponent implements OnInit {
  activeMilestones: Milestone[] = [];
  completedMilestones: Milestone[] = []

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    this.initializeComponent()
  }

  initializeComponent() {
    const userMilestones = this.dataService.user.milestones;
    for (let i = 0; i < userMilestones.length; i++) {
      if (userMilestones[i].completed) {
        this.completedMilestones.push(userMilestones[i])
      } else {
        this.activeMilestones.push(userMilestones[i])
      }
    }
  }

  createMilestone(form: NgForm) {
    this.activeMilestones.push({name: form.value.title, completed: false})
  }

  completeMilestone(index: number) {
    this.activeMilestones[index].completed = true;
    this.completedMilestones.push(this.activeMilestones[index]);
    this.activeMilestones.splice(index, 1)
  }

  deleteActiveMilestone(index: number) {
    this.activeMilestones.splice(index, 1)
  }

  deleteCompletedMilestone(index: number) {
    this.activeMilestones.splice(index, 1)
  }

  saveMilestones() {
    const newMilestones = this.activeMilestones.concat(this.completedMilestones);
    this.http.updateMilestones(newMilestones).subscribe((response: Response) => {
      this.dataService.message.next(response.message);
      if (response.user) {
        this.dataService.user = response.user;
        this.activeMilestones = [];
        this.completedMilestones = [];
        this.initializeComponent()
      }
    })
  }
}
