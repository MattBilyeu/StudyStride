import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  //auth routes
  userLogin(email: string, password: string) {
    return this.http.post('/auth/userLogin', {email: email, password: password})
  }

  adminLogin(email: string, password: string) {
    return this.http.post('/auth/adminLogin', {email: email, password: password})
  }

  //user routes
  createUser(name: string, email: string, password: string) {
    return this.http.post('/user/create', {name: name, email: email, password: password})
  }

  updateEmail(oldEmail: string, newEmail: string, password: string) {
    return this.http.post('/user/updateEmail', {oldEmail: oldEmail, newEmail: newEmail, password: password})
  }

  sendPassUpdate(email: string) {
    return this.http.post('/user/sendPassUpdate', {email: email})
  }

  updatePassword(token: string, password: string) {
    return this.http.post('/user/updatePassword', {token: token, password: password})
  }

  updateMilestones(milestones: Array<any>) {
    return this.http.post('/user/updateMilestones', {milestones: milestones})
  }

  createTopic(title: string) {
    return this.http.post('/user/createTopic', {title: title})
  }

  deleteTopic(topic: string) {
    return this.http.post('/user/deleteTopic', {topic: topic})
  }

  startSession(topic: string) {
    return this.http.post('/user/startSession', {topic: topic})
  }

  endSession() {
    return this.http.post('/user/endSession', {})
  }

  seedTime(time: number, topic: string) {
    return this.http.post('/user/seedTime', {seedTime: time, seedTopic: topic})
  }

  toggleReceiveEmails() {
    return this.http.post('/user/toggleReceiveEmails', {})
  }

  deleteUser(userId: string) {
    return this.http.post('/user/delete', {userId: userId})
  }

  //Admin routes
  getStatsObject() {
    return this.http.post('/user/getStatsObject', {})
  }

  getActiveUserCount() {
    return this.http.post('/user/getActiveUserCount', {})
  }

  createAdmin(name: string, email: string, password: string) {
    return this.http.post('/admin/create', {name: name, email: email, password: password})
  }

  sendAdminPassUpdate(email: string) {
    return this.http.post('/admin/sendPassUpdate', {email: email})
  }

  updateAdminPassword(token: string, password: string) {
    return this.http.post('/admin/updateAdminPassword', {token: token, password: password})
  }

  emailAllUsers(subject: string, text: string) {
    return this.http.post('/admin/emailAllUsers', {subject: subject, text: text})
  }

  deleteAdmin(adminId: string) {
    return this.http.post('/admin/delete', {adminId: adminId})
  }

  toggleBanUser(userId: string) {
    return this.http.post('/admin/toggleBanUser', {userId: userId})
  }
}
